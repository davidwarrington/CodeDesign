window.onload = function () {

  function drawStaticCanvas() {
    var canvas = document.getElementById('staticCanvas');
    var ctx = canvas.getContext('2d');

    canvas.height = canvas.width * 0.75; // This keeps the ratio of width to height at the appropriate ratio for drawing the image

    var x = canvas.width;
    var y = canvas.height;

    ctx.fillRect(0, 0, x, y); // This gives the canvas a background colour of black because no fill colour has previously been given

    // Hexagon Colours -------------------------------------------------------------------
    var transparent = 'rgba(0, 0, 0, 0)'; // These are for use later on by some functions
    var black = 'rgba(0, 0, 0, 1)';
    var frameYellow = 'rgba(238, 209, 43, 1)';
    var frameOrange = 'rgba(244, 144, 84, 1)';

    // Light Bridge Gradient -------------------------------------------------------------
    var lightBridgeDeepOrange = '#ff7200';
    var lightBridgeMidOrange = '#ff8f0b';
    var lightBridgeShallowOrange = '#fcac21';
    var lightBridgeYellow = '#e8c337';

    // I used a gradient to draw the 'light bridge' because it meant that I wouldn't have to draw multiple shapes, instead I could use a gradient fill on one triangle.
    var lightBridgeGradient = ctx.createLinearGradient(x * (8 / 16), y * (2 / 8), x * (8 / 16), y);
    // Having 2 colour stops in the same place prevents the colours from fading into each other.
    // I used this technique multiple times in the gradient to create the required effect.
    // lightBridgeGradient.addColorStop(0, lightBridgeDeepOrange);
    lightBridgeGradient.addColorStop(0.6, lightBridgeDeepOrange);
    lightBridgeGradient.addColorStop(0.6, lightBridgeMidOrange);
    lightBridgeGradient.addColorStop(0.72, lightBridgeMidOrange);
    lightBridgeGradient.addColorStop(0.72, lightBridgeShallowOrange);
    lightBridgeGradient.addColorStop(0.84, lightBridgeShallowOrange);
    lightBridgeGradient.addColorStop(0.84, lightBridgeYellow);
    // lightBridgeGradient.addColorStop(1, lightBridgeYellow);

    // Planet Gradient -------------------------------------------------------------------
    var planetDeepBlue = 'rgba(9, 14, 17, 1)';
    var planetLightBlue = 'rgba(86, 167, 170, 1)';
    var white = 'rgba(255, 255, 255, 1)';

    var smallPlanetGradient = ctx.createRadialGradient(x * 0.5, y * (1.8 / 8), x * (3 / 16), x * 0.52, y * (2.5 / 8), x * (0.8 / 16));
    smallPlanetGradient.addColorStop(0.65, planetDeepBlue);
    smallPlanetGradient.addColorStop(0.6, planetLightBlue);
    smallPlanetGradient.addColorStop(0.57, white);

    var largePlanetGradient = ctx.createRadialGradient(x * 0.5, y * 0.48, x * (3 / 16), x * 0.55, y * 0.65, x * (4 / 16));
    largePlanetGradient.addColorStop(0.7, planetDeepBlue);
    largePlanetGradient.addColorStop(0.3, planetLightBlue);
    largePlanetGradient.addColorStop(0, white);

    // drawGrid --------------------------------------------------------------------------

    function drawGrid(rows, cols, units = 0) {
      // Default parameter value found here: http://es6-features.org/#DefaultParameterValues
      // This allows the user to write the function with a default value for the last argument if they don't want to seperate the rows/columns by pixels


      var rowY; // This variable tells the for loop where to draw the current row
      var colX; // This variable tells the for loop where to draw the current column

      ctx.strokeStyle = 'red';


      if (units == 'px') {
        var totalRows = (y / rows); // These two variables declare the number of lines that must be drawn to create the necessary number of rows and columns
        var totalCols = (x / cols);

        for (i = 1; i <= totalRows; i++) {
          rowY = rows * i;

          ctx.beginPath();
          ctx.moveTo(0, rowY);
          ctx.lineTo(x, rowY);
          ctx.closePath();
          ctx.stroke();
        }

        for (i = 1; i <= totalCols; i++) {
          colX = cols * i;

          ctx.beginPath();
          ctx.moveTo(colX, 0);
          ctx.lineTo(colX, y);
          ctx.closePath();
          ctx.stroke();
        }

      } else {

        var totalRows = rows - 1; // This works out the number of lines needed to be drawn to divide the canvas into the correct number of rows
        var totalCols = cols - 1; // This works out the number of lines needed to be drawn to divide the canvas into the correct number of columns

        var rowSpace = y / rows; // This calculates the height of each row by dividing the height of the canvas by the number of rows specified
        var colSpace = x / cols; // This calculates the width of each column by dividing the width of the canvas by the number of columns specified

        for (i = 1; i <= totalRows; i++) { // This for loop draws the number of dividers necessary for each row

          rowY = rowSpace * i;

          ctx.beginPath();
          ctx.moveTo(0, rowY);
          ctx.lineTo(x, rowY);
          ctx.closePath();
          ctx.stroke();
        }

        for (n = 1; n <= totalCols; n++) { // This for loop draws the number of dividers necessary for each column

          colX = colSpace * n;

          ctx.beginPath();
          ctx.moveTo(colX, 0);
          ctx.lineTo(colX, y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    };

    function drawHexagon (minX, minY, centreX, centreY, stroke, fill) {
      var height = (y - minY) - minY;
      var upperMidY = centreY - (height * 0.25);
      var lowerMidY = centreY + (height * 0.25);

      ctx.beginPath();
      ctx.moveTo(centreX, minY);
      ctx.lineTo(minX, upperMidY);
      ctx.lineTo(minX, lowerMidY);
      ctx.lineTo(centreX, y - minY);
      ctx.lineTo(x - minX, lowerMidY);
      ctx.lineTo(x - minX, upperMidY);
      ctx.closePath();

      ctx.lineWidth = x * (0.25 / 16);
      ctx.strokeStyle = stroke;
      ctx.stroke();

      ctx.fillStyle = fill;
      ctx.fill();
    }

    function drawCircle (initX, initY, centreX, centreY, radius, fill) {
      ctx.beginPath();
      ctx.moveTo(initX, initY);
      ctx.arc(centreX, centreY, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    }

    function drawTriangleOutline (topX, topY, leftX, leftY, rightX, rightY, strokeColour) {
      ctx.beginPath();
      ctx.moveTo(leftX, leftY);
      ctx.lineTo(topX, topY);
      ctx.lineTo(rightX, rightY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = strokeColour;
      ctx.stroke();
    }

    function drawTriangleFilled (initX, initY, a, b, c, d, fillColour) {
      ctx.beginPath();
      ctx.moveTo(initX, initY);
      ctx.lineTo(a, b);
      ctx.lineTo(c, d);
      ctx.closePath();
      ctx.fillStyle = fillColour;
      ctx.fill();
    }

    function drawShip () {
      ctx.beginPath();
      ctx.moveTo(x * 0.5, y * (5.1 / 8));
        ctx.lineTo(x * (5.75 / 16), y * (5.575 / 8));
        ctx.lineTo(x * (6.8 / 16), y * (5.65 / 8));
        ctx.lineTo(x * (6.8 / 16), y * (5.75 / 8));
        ctx.lineTo(x * (7.4 / 16), y * (5.80 / 8));
        ctx.lineTo(x * (7.4 / 16), y * (5.85 / 8));
        ctx.lineTo(x * (7.75 / 16), y * (5.9 / 8));
        ctx.lineTo(x * (7.9 / 16), y * (5.98 / 8));

        ctx.lineTo(x * (8 / 16), y * (6 / 8));

        ctx.lineTo(x * (8.1 / 16), y * (5.98 / 8));
        ctx.lineTo(x * (8.25 / 16), y * (5.9 / 8));
        ctx.lineTo(x * (8.6 / 16), y * (5.85 / 8));
        ctx.lineTo(x * (8.6 / 16), y * (5.80 / 8));
        ctx.lineTo(x * (9.2 / 16), y * (5.75 / 8));
        ctx.lineTo(x * (9.2 / 16), y * (5.65 / 8));
        ctx.lineTo(x * (10.25 / 16), y * (5.575 / 8));
      ctx.closePath();

      ctx.fillStyle = 'rgba(12, 14, 13, 1)';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x * 0.5, y * (5.1 / 8));
        ctx.lineTo(x * (5.75 / 16), y * (5.575 / 8));
        ctx.lineTo(x * (7.3 / 16), y * (5.4 / 8));
        ctx.quadraticCurveTo(x * (7.7 / 16), y * (5.2 / 8), x * (7.9 / 16), y * (5.35 / 8));
        // .quadraticCurveTo() found here: https://www.w3schools.com/tags/canvas_quadraticcurveto.asp
        // This method was used because only one anchor point seemed necessary for the curve
        ctx.lineTo(x * (8.1 / 16), y * (5.35 / 8));
        ctx.quadraticCurveTo(x * (8.3 / 16), y * (5.2 / 8), x * (8.7 / 16), y * (5.4 / 8));
        ctx.lineTo(x * (10.25 / 16), y * (5.575 / 8));
      ctx.closePath();
      ctx.fillStyle = 'rgba(244, 234, 233, 1)';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x * (7.45 / 16), y * (5.825 / 8));
      ctx.lineTo(x * (7.75 / 16), y * (5.865 / 8));
      ctx.bezierCurveTo(x * (7.75 / 16), y * (5.9 / 8), x * (7.9 / 16), y * (5.95 / 8), x * 0.5, y * (5.95 / 8));
      // .bezierCurveTo() found here: https://www.w3schools.com/tags/canvas_beziercurveto.asp
      // This method was used because two anchor points seemed necessary to draw the curve
      ctx.bezierCurveTo(x * (8.1 / 16), y * (5.95 / 8), x * (8.25 / 16), y * (5.9 / 8), x * (8.25 / 16), y * (5.865 / 8));
      ctx.lineTo(x * (8.55 / 16), y * (5.825 / 8));
      // ctx.closePath(); // This path is not closed to prevent an extra line being drawn by the stroke() method used below
      ctx.strokeStyle = 'rgba(244, 255, 248, 1)';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x * (7.5 / 16), y * (4.95 / 8));
      ctx.lineTo(x * (7.6 / 16), y * (5.2 / 8));
      ctx.strokeStyle = 'rgba(244, 255, 248, 1)';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x * (8.5 / 16), y * (4.95 / 8));
      ctx.lineTo(x * (8.4 / 16), y * (5.2 / 8));
      ctx.strokeStyle = 'rgba(244, 255, 248, 1)';
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(x * (7.75 / 16), y * (5.65 / 8));
      ctx.lineTo(x * (7.7 / 16), y * (5.8 / 8));
      ctx.lineTo(x * (7.45 / 16), y * (5.78 / 8));
      ctx.lineTo(x * (7.5 / 16), y * (5.65 / 8));
      ctx.closePath();
      ctx.fillStyle = 'rgba(244, 255, 248, 1)';
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(x * (8.25 / 16), y * (5.65 / 8));
      ctx.lineTo(x * (8.3 / 16), y * (5.8 / 8));
      ctx.lineTo(x * (8.55 / 16), y * (5.78 / 8));
      ctx.lineTo(x * (8.5 / 16), y * (5.65 / 8));
      ctx.closePath();
      ctx.fillStyle = 'rgba(244, 255, 248, 1)';
      ctx.fill();
    }

    function drawCanvas () {

      ctx.strokeStyle = white;

      // Draw Hexagon frame --------------------------------------------------------------
      drawHexagon(x * (3 / 16), y * 0.01, x * 0.5, y * 0.5, frameYellow, transparent);
      drawHexagon(x * (3.2 / 16), y * 0.03, x * 0.5, y * 0.5, frameOrange, transparent);
      drawHexagon(x * (3.3 / 16), y * 0.04, x * 0.5, y * 0.5, transparent, black);
      ctx.clip(); // The clip method makes the previously draw path act as a clipping mask, preventing any new paths from appear outside of this clipping mask
      // .clip() method found here: https://www.w3schools.com/tags/canvas_clip.asp

      // Draw Triangles ------------------------------------------------------------------
      drawTriangleOutline(x * (4.5 / 16), y * (2.4 / 8), x * (3 / 16), y * (4 / 8), x * (6 / 16), y * (4 / 8), white);
      drawTriangleOutline(x * (11.5 / 16), y * (2.4 / 8), x * (13 / 16), y * (4 / 8), x * (10 / 16), y * (4 / 8), white);

      // Draw Light Bridge ---------------------------------------------------------------
      drawTriangleFilled(x * (8 / 16), y * (1.6 / 8), x * (2.8 / 16), y, x * (13.2 / 16), y, lightBridgeGradient);

      // Draw Planets --------------------------------------------------------------------
      drawCircle(x * (10 / 16), y * 0.5, x * 0.5, y * (1.8 / 8), y * (0.8 / 8), smallPlanetGradient);
      drawCircle(x * (10 / 16), y * 0.5, x * 0.5, y * 0.48, y * (4 / 16), largePlanetGradient);

      // Draw Ship -----------------------------------------------------------------------
      drawShip();
    };

    // drawGrid(8, 16); // The drawGrid function was used for as a reference for getting value estimates for co-ordinates

    drawCanvas();
  }

  drawStaticCanvas();

  function drawAnimatedCanvas () {
    var canvas = document.getElementById('animatedCanvas');
    var ctx = canvas.getContext('2d');

    canvas.height = canvas.width * 0.75; // This keeps the ratio of width to height at the appropriate ratio for drawing the image

    var scene = {
      "width": canvas.width,
      "height": canvas.height,
      "animate": true
    }

    var scanner = {
      "rings": 4,
      "scanLine": {
        "xOrigin": scene.width / 2,
        "yOrigin": scene.height / 2,
        "xFinish": scene.width / 2,
        "yFinish": scene.height,
        "xVelocity": 0,
        "yVelocity": 0,
        "angle": 0,
        "speed": 1
      },
      "plane": {
        "xCentre": scene.width * (1 / 6),
        "yCentre": scene.height * (1 / 3),
        "fill": '#990000',
      }
    }

    var outerCircle = {
      "xOrigin": scene.width / 2,
      "yOrigin": scene.height / 2,
      "radius": (scene.height / 2) - 20
    }

    function drawScanLine () {
      ctx.beginPath();
      ctx.moveTo(scanner.scanLine.xOrigin, scanner.scanLine.yOrigin);
      ctx.lineTo(scanner.scanLine.xFinish, scanner.scanLine.yFinish);
      ctx.closePath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#999900';
      ctx.stroke();

      // ctx.beginPath();
      // ctx.moveTo(scanner.scanLine.xOrigin, scanner.scanLine.yOrigin);
      // ctx.lineTo(scanner.scanLine.xFinish, scanner.scanLine.yFinish);
      // ctx.closePath();
      // ctx.lineWidth = 3;
      // ctx.strokeStyle = 'white';
      // ctx.stroke();
    }

    function drawCircle (centreX, centreY, radius, fill) {
      ctx.beginPath();
      ctx.arc(centreX, centreY, radius, 0, 2 * Math.PI);
      ctx.closePath();
      if (fill) { // This if statement will fill the circle if a fill colour is defined, otherwise it will give the circle a stroke
        ctx.fillStyle = fill;
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }

    function drawScannerRings (numberOfRings) { // This
      for (var i = 0; i <= numberOfRings; i++) {
        drawCircle(outerCircle.xOrigin, outerCircle.yOrigin, outerCircle.radius * (i / numberOfRings));
      }
    }

    function animate() {
      if (scene.animate) {
          // ctx.clearRect(0, 0, scene.width, scene.height);
          ctx.fillStyle = 'rgba(0, 85, 0, 0.3)';
          // This colour is set to have an alpha value of 0.3 in order to make the rotating line appear to trail behind as it moves
          // This technique was found here: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Advanced_animations#Trailing_effect
          ctx.fillRect(0, 0, scene.width, scene.height);
          ctx.strokeStyle = '#999900';
          ctx.save();

          drawScannerRings(4);

          scanner.scanLine.xFinish = outerCircle.xOrigin + (outerCircle.radius * Math.cos(scanner.scanLine.angle));
          scanner.scanLine.yFinish = outerCircle.yOrigin + (outerCircle.radius * Math.sin(scanner.scanLine.angle));
          // The two lines above find the co-ordinates for a point on the circumference of a circle using these equations:
          // x = a + rcos(t) <= where a is the x co-ordinate of the centre of the circle, r is the radius and t is the angle
          // y = b + rsin(t) <= where b is the y co-ordinate of the centre of the circle, r is the radius and t is the angle

          scanner.scanLine.angle += (scanner.scanLine.speed * Math.PI / 180); // This increases the angle of the line by 1 degree each time

          drawScanLine();

          drawCircle(scene.width * (1 / 6), scene.height * (1 / 3), (scene.height / 48), '#999900');
      }

      requestAnimationFrame(animate);
      // requestAnimationFrame found here: https://css-tricks.com/using-requestanimationframe/

      // TODO ================================================================== //
      // Add moving scanlines                                                    //
      // Add moving object detected                                              //
      // Use gradients to fuzzy edges of circles and other components            //
      // Add some text for object detected                                       //
      // ======================================================================= //
    }
    animate();

  };

  drawAnimatedCanvas();
}
