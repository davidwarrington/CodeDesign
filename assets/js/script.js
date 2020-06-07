window.onload = function () {
  // ===========================================================================
  // Functions for general use by all canvasses
  // ===========================================================================
  function drawHexagon (ctx, xCentre, yCentre, radius, colour, strokeWidth) {
    ctx.beginPath();
    ctx.moveTo(xCentre + radius * Math.sin(0), yCentre + radius * Math.cos(0));
    // The line starts at the centre of the canvas, offset by the radius on the y axis because cos0 = 1

      for (var i = 1; i < 6; i++) { // The 6 in the "i < 6" represents the number of sides of the hexagon
        ctx.lineTo(xCentre + radius * Math.sin(i * 2 * Math.PI / 6), yCentre + radius * Math.cos(i * 2 * Math.PI / 6));
        // The (i * 2 * Math.PI / 6) used for determining the corners uses 2 * Math.PI / 6 because the Math object uses radians to declare angles for sin and cos,
        // and 2 * Math.PI in radians is 360 degrees. 6 is used to divide 360 degree by the total number of sides to get the inner angles of each side, then this
        // is multiplied by i to get the x and y values for every corner of the hexagon

        // This solution has been adapted from the one found here: http://scienceprimer.com/drawing-regular-polygons-javascript-canvas
        // I removed the "numberOfSides" variable because this is only being used to draw a hexagon, therefore the value is always 6
      }

    ctx.closePath();
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = colour;
    ctx.stroke();
  }

  function drawCircle (ctx, xCentre, yCentre, radius, colour, stroke) {
    ctx.beginPath();
    ctx.arc(xCentre, yCentre, radius, 0, 2 * Math.PI);
    ctx.closePath();
    if (!stroke) {
      ctx.fillStyle = colour;
      ctx.fill();
    } else {
      ctx.strokeStyle = colour;
      ctx.stroke();
    }
  }

  function drawTriangle (ctx, xCentre, yCentre, xRadius, yRadius, drawStyle, colour, strokeWidth) {
    ctx.beginPath();
    ctx.moveTo(xCentre - xRadius, yCentre + yRadius);
    ctx.lineTo(xCentre, yCentre - yRadius);
    ctx.lineTo(xCentre + xRadius, yCentre + yRadius);
    if (drawStyle == 'fill') {
      ctx.fillStyle = colour;
      ctx.fill();
    } else if (drawStyle == 'stroke') {
      ctx.lineWidth = strokeWidth;
      ctx.strokeStyle = colour;
      ctx.stroke();
    }
  }

  // ===========================================================================
  // Draw ship
  // ===========================================================================
  function drawTopHalf (ctx, xCentre, yCentre, xRadius, yRadius, colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.moveTo(xCentre, yCentre - yRadius * 0.8); // Top centre
    ctx.lineTo(xCentre - xRadius * 0.18, yCentre - yRadius * 0.7);
      // Fin
      ctx.lineTo(xCentre - xRadius * 0.21, yCentre - yRadius * 1.25);
      ctx.lineTo(xCentre - xRadius * 0.25, yCentre - yRadius * 1.23);
      ctx.lineTo(xCentre - xRadius * 0.23, yCentre - yRadius * 0.65);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.27, yCentre - yRadius * 0.66, xCentre - xRadius * 0.34, yCentre * 0.97);
    // .quadraticCurveTo() method found here: https://www.w3schools.com/tags/canvas_quadraticcurveto.asp
    // .quadraticCurveTo() was used to to it's ease of use compared to .bezierCurveTo() and the lack of need for an extra control point for the curve
    // Wing
    ctx.lineTo(xCentre - xRadius, yCentre + yRadius * 0.3);
    ctx.lineTo(xCentre - xRadius * 0.275, yCentre - yRadius * 0.1);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.16, yCentre - yRadius * 0.6, xCentre - xRadius * 0.08, yCentre - yRadius * 0.25);
    ctx.lineTo(xCentre, yCentre - yRadius * 0.25);
    ctx.closePath();
    ctx.fill();
  }

  function drawBottomHalf (ctx, xCentre, yCentre, xRadius, yRadius, colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.moveTo(xCentre, yCentre - yRadius * 0.6);
    ctx.lineTo(xCentre - xRadius, yCentre + yRadius * 0.3);
    ctx.lineTo(xCentre - xRadius * 0.51, yCentre + yRadius * 0.5);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.56, yCentre + yRadius * 0.7, xCentre - xRadius * 0.5, yCentre + yRadius * 0.75);
    ctx.lineTo(xCentre - xRadius * 0.23, yCentre + yRadius * 0.85);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.275, yCentre + yRadius * 1, xCentre - xRadius * 0.23, yCentre + yRadius * 1.05);
    ctx.lineTo(xCentre - xRadius * 0.1, yCentre + yRadius * 1.2);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.1, yCentre + yRadius * 1.35, xCentre, yCentre + yRadius * 1.35);
    ctx.closePath();
    ctx.fill();
  }

  function drawThrusters (ctx, xCentre, yCentre, xRadius, yRadius, colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.moveTo(xCentre - xRadius * 0.08, yCentre + yRadius * 0.5);
    ctx.lineTo(xCentre - xRadius * 0.2, yCentre + yRadius * 0.46);
    ctx.lineTo(xCentre - xRadius * 0.21, yCentre + yRadius * 0.83);
    ctx.lineTo(xCentre - xRadius * 0.09, yCentre + yRadius * 0.89);
    ctx.closePath();
    ctx.fill();
  }

  function drawHighlights (ctx, xCentre, yCentre, xRadius, yRadius, colour) {
    ctx.beginPath();
    ctx.moveTo(xCentre, yCentre + yRadius * 1.2);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.08, yCentre + yRadius * 1.2, xCentre - xRadius * 0.09, yCentre + yRadius);
    ctx.lineTo(xCentre - xRadius * 0.23, yCentre + yRadius * 0.85);
    ctx.lineWidth = 2;
    ctx.strokeStyle = colour.bottomWhite;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xCentre - xRadius * 0.53, yCentre + yRadius * 0.6);
    ctx.lineTo(xCentre - xRadius * 0.28, yCentre - yRadius * 0.15);
    ctx.lineTo(xCentre - xRadius * 0.35, yCentre - yRadius * 0.15);
    ctx.fillStyle = colour.topWhite;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(xCentre - xRadius * 0.23, yCentre - yRadius * 0.45);
    ctx.lineTo(xCentre - xRadius * 0.25, yCentre - yRadius * 1.23);
    ctx.lineTo(xCentre - xRadius * 0.2, yCentre - yRadius * 0.6);
    ctx.fillStyle = colour.nearBlack;
    ctx.fill();
  }

  // =======================================================================
  // Draw ship outline
  // =======================================================================
  function drawOutline(ctx, xCentre, yCentre, xRadius, yRadius, colour) {
            ctx.beginPath();
    ctx.moveTo(xCentre, yCentre - yRadius * 0.8); // Top centre
    ctx.lineTo(xCentre - xRadius * 0.18, yCentre - yRadius * 0.7);
      // Fin
      ctx.lineTo(xCentre - xRadius * 0.21, yCentre - yRadius * 1.25);
      ctx.lineTo(xCentre - xRadius * 0.25, yCentre - yRadius * 1.23);
      ctx.lineTo(xCentre - xRadius * 0.23, yCentre - yRadius * 0.65);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.27, yCentre - yRadius * 0.66, xCentre - xRadius * 0.34, yCentre * 0.97);
    // Wing
    ctx.lineTo(xCentre - xRadius, yCentre + yRadius * 0.3);
    ctx.lineTo(xCentre - xRadius * 0.51, yCentre + yRadius * 0.5);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.56, yCentre + yRadius * 0.7, xCentre - xRadius * 0.5, yCentre + yRadius * 0.75);
    ctx.lineTo(xCentre - xRadius * 0.23, yCentre + yRadius * 0.85);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.275, yCentre + yRadius * 1, xCentre - xRadius * 0.23, yCentre + yRadius * 1.05);
    ctx.lineTo(xCentre - xRadius * 0.1, yCentre + yRadius * 1.2);
    ctx.quadraticCurveTo(xCentre - xRadius * 0.1, yCentre + yRadius * 1.35, xCentre, yCentre + yRadius * 1.35);

    ctx.lineWidth = 3;
    ctx.strokeStyle = colour;
    ctx.stroke();
    ctx.closePath();
  }

  function drawShip (ctx, xCentre, yCentre, xRadius, yRadius, colour, stroke) {
    var i;
    if (!stroke) { // This if statement fills the ship if the 'stroke' argument has a 'falsy' value, otherwise it draws an outline of the ship
      for (i = 0; i <= 1; i++) {
        if (i === 1) {
          xRadius *= -1;
          // This changes makes xRadius have an equal but opposite value to that which it previously had
          // Flipping the xRadius value flips the portion of the ship being draw
        }
        drawBottomHalf(ctx, xCentre, yCentre, xRadius, yRadius, colour.nearBlack);
        drawTopHalf(ctx, xCentre, yCentre, xRadius, yRadius, colour.topWhite);
        drawThrusters(ctx, xCentre, yCentre, xRadius, yRadius, colour.bottomWhite);
        drawHighlights(ctx, xCentre, yCentre, xRadius, yRadius, colour);
      }
    } else {
      for (i = 0; i <= 1; i++) {
        if (i === 1) {
          xRadius *= -1;
        }
        drawOutline(ctx, xCentre, yCentre, xRadius, yRadius, colour);
      }
    }
  }

  function drawGrid (ctx, xStart, yStart, width, height, columns, rows, colour) {
    var columnWidth = width / columns;
    var rowHeight = height / rows;

    var colStart;

    ctx.lineWidth = 3;
    ctx.strokeStyle = colour;
    // Draw vertical lines -----------------------------------------------------
    for (var i = 1; i <= columns + 1; i++) {
      colStart = xStart + ((i - 1) * columnWidth);
      ctx.beginPath();
      ctx.moveTo(colStart, yStart);
      ctx.lineTo(colStart, yStart + height);
      ctx.stroke();
    }

    var rowStart;

    // Draw horizontal lines ---------------------------------------------------
    for (i = 1; i <= rows + 1; i++) {
      rowStart = yStart + ((i - 1) * rowHeight);
      ctx.beginPath();
      ctx.moveTo(xStart, rowStart);
      ctx.lineTo(xStart + width, rowStart);
      ctx.stroke();
    }
  }

  // Get distance between two points -------------------------------------------
  function getDistance (xA, yA, xB, yB) {
    return Math.pow(Math.pow(xA - xB, 2) + Math.pow(yA - yB, 2), 0.5);
    // This function uses Pythagorean theorem (c^2 = a^2 + b^2) to get the distance between two points
  }

  // ===========================================================================
  // Function for drawing everything on the static canvas
  // ===========================================================================
  function drawStaticCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    // Change canvas size ------------------------------------------------------
    // This if statement makes the canvas take the lower of the canvas width and height values
    if (window.innerHeight < window.innerWidth) {
      canvas.height = window.innerHeight * 0.87;
      canvas.width = canvas.height;
    } else {
      canvas.width = window.innerWidth;
      canvas.height = canvas.width;
    }

    // Initialise object for the canvas to draw --------------------------------
    // Properties for these objects should be changed here
    // .draw() functions are added as methods to draw the object with the given properties to allow users to easily understand what arguments are being passed to the functions declared at the beginning of the file
    var scene = {
      "width": canvas.width,
      "height": canvas.height,
      "xCentre": canvas.width / 2,
      "yCentre": canvas.height / 2,
      "colour": { // The colours in this object are generic colours that can be used by other objects
        // General
        "black": 'black',
        "white": 'white',
        "transparent": 'rgba(0, 0, 0, 0)'
      }
    };

    var frame = {
      "xCentre": scene.width * 0.5,
      "yCentre": scene.width * 0.5,
      "radius": scene.width * 0.48,
      "strokeWidth": scene.width * 0.015,
      "colour": {
        "yellow": 'rgba(238, 209, 43, 1)',
        "orange": 'rgba(244, 144, 84, 1)',
        "transparent": scene.colour.transparent
      },
      "draw": function () {
        drawHexagon(ctx, this.xCentre, this.yCentre, this.radius, this.colour.yellow, this.strokeWidth);
        drawHexagon(ctx, this.xCentre, this.yCentre, this.radius - this.strokeWidth, this.colour.orange, this.strokeWidth);
        drawHexagon(ctx, this.xCentre, this.yCentre, this.radius - (this.strokeWidth * 1.5), this.colour.transparent, this.strokeWidth);
      }
    };

    var backgroundTriangles = {
      // Offsets are relative to the centre of the canvas
      "xOffset": scene.width * 0.292, // These are called offsets as opposed to centres because one offset is being used to draw two triangles at equal and opposite distances from the canvas
      "yOffset": scene.width * 0.1,
      "xRadius": scene.width * 0.125,
      "yRadius": scene.width * 0.11,
      "colour": scene.colour.white,
      "lineWidth": 1,
      "draw": function () {
        drawTriangle(ctx, scene.xCentre - this.xOffset, scene.xCentre - this.yOffset, this.xRadius, this.yRadius, 'stroke', this.colour, this.lineWidth);
        drawTriangle(ctx, scene.xCentre + this.xOffset, scene.xCentre - this.yOffset, this.xRadius, this.yRadius, 'stroke', this.colour, this.lineWidth);
      }
    };

    var lightBridge = {
      "xCentre": 0,
      "yCentre": scene.width * 0.125,
      "xRadius": scene.width * 0.45,
      "yRadius": scene.width * 0.375,
      "colour": {
        "deepOrange": 'rgba(255, 114, 0, 1)',
        "midOrange": 'rgba(255, 143, 11, 1)',
        "shallowOrange": 'rgba(252, 172, 33, 1)',
        "yellow": 'rgba(232, 195, 55, 1)'
      },
      "gradient": ctx.createLinearGradient(0, 0, 0, scene.height),
      // I used a gradient to draw the 'light bridge' because it meant that I wouldn't have to draw multiple shapes, instead I could use a gradient fill on one triangle.
      "addGradientStops": function () {
        // Having 2 colour stops in the same place prevents the colours from fading into each other.
        // I used this technique multiple times in the gradient to create the required effect.
        // this.gradient.addColorStop(0, this.colour.deepOrange);
        this.gradient.addColorStop(0.69, this.colour.deepOrange);
        this.gradient.addColorStop(0.69, this.colour.midOrange);
        this.gradient.addColorStop(0.79, this.colour.midOrange);
        this.gradient.addColorStop(0.79, this.colour.shallowOrange);
        this.gradient.addColorStop(0.88, this.colour.shallowOrange);
        this.gradient.addColorStop(0.88, this.colour.yellow);
        // this.gradient.addColorStop(1, this.colour.yellow);
      },
      "draw": function () {
        this.addGradientStops(); // This has to be declared when the .draw() method is called because properties in an object cannot reference other properties that do not exist at the time that the object is created
        drawTriangle(ctx, scene.xCentre - this.xCentre, scene.xCentre + this.yCentre, this.xRadius, this.yRadius, 'fill', this.gradient);
      }
    };

    var planets = {
      "small": {
        "xCentre": scene.width * 0.5,
        "yCentre": scene.width * 0.225,
        "radius": scene.width * 0.1
      },
      "large": {
        "xCentre": scene.width * 0.5,
        "yCentre": scene.width * 0.48,
        "radius": scene.width * 0.25
      },
      "colour": {
        "deepBlue": 'rgba(9, 14, 17, 1)',
        "lightBlue": 'rgba(86, 167, 170, 1)',
        "white": scene.colour.white
      },
      "createGradients": function () {
        this.small.gradient = ctx.createRadialGradient(
          this.small.xCentre * 1.1,
          this.small.yCentre * 1.25,
          this.small.radius * 0.45,
          this.small.xCentre * 0.95,
          this.small.yCentre * 0.95,
          this.small.radius * 1.5
        );
        this.small.gradient.addColorStop(0.55, this.colour.deepBlue);
        this.small.gradient.addColorStop(0.60, this.colour.lightBlue);
        this.small.gradient.addColorStop(0.68, this.colour.white);

        this.large.gradient = ctx.createRadialGradient(
          this.large.xCentre * 1.2,
          this.large.yCentre * 1.35,
          this.large.radius * 0.55,
          this.large.xCentre * 0.95,
          this.large.yCentre * 0.95,
          this.large.radius * 1.5
        );
        this.large.gradient.addColorStop(0.55, this.colour.deepBlue);
        this.large.gradient.addColorStop(0.60, this.colour.lightBlue);
        this.large.gradient.addColorStop(0.68, this.colour.white);
      },
      "draw": function () {
        this.createGradients();
        drawCircle(ctx, this.small.xCentre, this.small.yCentre, this.small.radius, this.small.gradient);
        drawCircle(ctx, this.large.xCentre, this.large.yCentre, this.large.radius, this.large.gradient);
      }
    };

    var ship = {
      "xCentre": scene.width * 0.5,
      "yCentre": scene.width * 0.68,
      "xRadius": scene.width * 0.19,
      "yRadius": scene.width * 0.05,
      "colour": {
        "nearBlack": 'rgba(12, 14, 13, 1)',
        "topWhite": 'rgba(244, 234, 233, 1)',
        "bottomWhite": 'rgba(244, 255, 248, 1)'
      },
      "draw": function () {
        drawShip(ctx, Math.round(this.xCentre), this.yCentre, this.xRadius, this.yRadius, this.colour);
      }
    };

    // Fill Background ---------------------------------------------------------
    ctx.fillStyle = scene.colour.black;
    ctx.fillRect(0, 0, scene.width, scene.height);
    // Draw Frame --------------------------------------------------------------
    frame.draw();
    ctx.clip(); // The clip method makes the previously drawn path act as a clipping mask, preventing any new paths from appear outside of this clipping mask
    // .clip() method found here: https://www.w3schools.com/tags/canvas_clip.asp
    // Draw Triangles ----------------------------------------------------------
    backgroundTriangles.draw();
    // Light Bridge ------------------------------------------------------------
    lightBridge.draw();
    // Draw Planets ------------------------------------------------------------
    planets.draw();
    // Draw Ship ---------------------------------------------------------------
    ship.draw();
  }

  // ===========================================================================
  // Draw Static Canvas
  // ===========================================================================
  drawStaticCanvas('staticCanvas');

  // ===========================================================================
  // Function for drawing everything on the animated canvas
  // ===========================================================================
    function drawAnimatedCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext('2d');

    // Change canvas size ------------------------------------------------------
    // This if statement makes the canvas take the lower of the canvas width and height values
    if (window.innerHeight < window.innerWidth) {
      canvas.height = window.innerHeight * 0.75;
      canvas.width = canvas.height * 1.5;
    } else {
      canvas.width = window.innerWidth;
      canvas.height = canvas.width;
    }

    var scene = {
      "width": canvas.width,
      "height": canvas.height,
      "colour": {
        "background": 'rgba(105, 105, 105, 1)',
        "screen": 'rgba(0, 85, 0, 1)',
        "overlay": 'rgba(200, 200, 0, 0.1)',
        "transparent": 'rgba(0, 0, 0, 0)',
        "hud": 'rgba(190, 190, 0, 1)',
        "shadow": 'rgba(0, 0, 0, 0.5)'
      }
    };

    var targetScreen = {
      "xCentre": scene.width * 0.3,
      "yCentre": scene.height * 0.5,
      "radius": scene.width * 0.25,
      "shadow": function () {
        for (var i = 1; i <= 2; i++) {
          var shadow;
          if (i === 1) {
            shadow = ctx.createLinearGradient(this.xCentre, this.yCentre - this.radius, this.xCentre, this.yCentre + this.radius);
            shadow.addColorStop(0.4, scene.colour.transparent);
            shadow.addColorStop(0.95, scene.colour.transparent);
          } else if (i === 2) {
            shadow = ctx.createLinearGradient(this.xCentre - this.radius, this.yCentre, this.xCentre + this.radius, this.yCentre);
            shadow.addColorStop(0.1, scene.colour.transparent);
            shadow.addColorStop(0.9, scene.colour.transparent);
          }
          shadow.addColorStop(0, scene.colour.shadow);
          shadow.addColorStop(1, scene.colour.shadow);
          ctx.fillStyle = shadow;
          ctx.fillRect(this.xCentre - this.radius, this.yCentre - this.radius, this.xCentre + this.radius, this.yCentre + this.radius);
        }
      },
      "overlayOffset": 0,
      "generateOverlays": function (top, height, width, rows, colour) {
        var rowHeight = height / rows;
        ctx.fillStyle = colour;
        for (var i = 1; i <= rows + 2; i+= 2) {
          var rowTop = ((i - 1) * rowHeight) + top + this.overlayOffset;
          if (i != rows) {
            ctx.fillRect(this.xCentre - this.radius, rowTop, width, rowHeight);
          }
        }
        if (this.overlayOffset <= rowHeight) {
          this.overlayOffset ++;
        } else {
          this.overlayOffset = -rowHeight;
        }
      },
      "draw": function () {
        // Draw screen ---------------------------------------------------------
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.xCentre - this.radius, this.yCentre - this.radius, this.radius * 2, this.radius * 2);
        ctx.fillStyle = scene.colour.screen;
        ctx.fill();
        // ctx.fillRect(this.xCentre - this.radius, this.yCentre - this.radius, this.radius * 2, this.radius * 2);
        ctx.clip(); // This clips all of the following paths inside over the previously drawn path

        // Draw grid -----------------------------------------------------------
        grid.draw();

        // Draw ship -----------------------------------------------------------
        ctx.save(); // The .save() method saves the current state of the canvas
        ctx.translate(Math.floor(this.xCentre), 0); // The translate() method is being used to move the context of the canvas to the centre of the target screen on the x axis
        ctx.rotate(ship.angle * Math.PI / 180); // The .rotate() method of being used to rotate the outline of the ship, which is next to be be drawn. The point about which is it being rotated is always (0, 0), therefore the .translate() method was used before this to rotate the image about a different point.
        // .rotate() method found here: https://www.w3schools.com/tags/canvas_rotate.asp
        ship.draw(); // This draws the ship, and the target acquired message if necessary
        ctx.restore(); // The .restore() is being used to restore the context of the canvas to the state it was in before .translate() and .rotate() was used. In preparation for other things to be drawn on the canvas.
        // .save() and .restore() found here: http://html5.litten.com/understanding-save-and-restore-for-the-canvas-context/

        // Draw interference ---------------------------------------------------
        targetScreen.generateOverlays(this.yCentre - this.radius, this.radius * 2, this.radius * 2, 6, scene.colour.overlay);
        this.shadow();
        ctx.restore(); // This .restore() is being used to remove the clipping mask applied by the rectangular path used to create the screen
      },
    };

    var grid = {
      "xCentre": targetScreen.xCentre,
      "yCentre": targetScreen.yCentre,
      "radius": targetScreen.radius * 0.8,
      "columns": 8,
      "rows": 8,
      "draw": function () {
        drawGrid(ctx, this.xCentre - this.radius, this.yCentre - this.radius, this.radius * 2, this.radius * 2, this.columns, this.rows, scene.colour.hud);
      }
    };

    var scannerScreen = {
      "xCentre": scene.width * 0.8,
      "yCentre": scene.height * 0.65,
      "radius": scene.width * 0.15,
      "colour": scene.colour.screen,
      "shadow": function () {
        for (var i = 1; i <= 2; i++) {
          var shadow;
          if (i === 1) {
            shadow = ctx.createLinearGradient(this.xCentre, this.yCentre - this.radius, this.xCentre, this.yCentre + this.radius);
            shadow.addColorStop(0.4, scene.colour.transparent);
            shadow.addColorStop(0.95, scene.colour.transparent);
          } else if (i === 2) {
            shadow = ctx.createLinearGradient(this.xCentre - this.radius, this.yCentre, this.xCentre + this.radius, this.yCentre);
            shadow.addColorStop(0.1, scene.colour.transparent);
            shadow.addColorStop(0.9, scene.colour.transparent);
          }
          shadow.addColorStop(0, scene.colour.shadow);
          shadow.addColorStop(1, scene.colour.shadow);
          ctx.fillStyle = shadow;
          ctx.fillRect(this.xCentre - this.radius, this.yCentre - this.radius, this.xCentre + this.radius, this.yCentre + this.radius);
        }
      },
      "overlayOffset": 0,
      "generateOverlays": function (top, height, width, rows, colour) {
        var rowHeight = height / rows;
        ctx.fillStyle = colour;
        for (var i = 1; i <= rows + 2; i+= 2) {
          var rowTop = ((i - 1) * rowHeight) + top + this.overlayOffset;
          if (i != rows) {
            ctx.fillRect(this.xCentre - this.radius, rowTop, width, rowHeight);
          }
        }
        if (this.overlayOffset <= rowHeight) {
          this.overlayOffset ++;
        } else {
          this.overlayOffset = -rowHeight;
        }
      },
      "draw": function () {
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.xCentre - this.radius, this.yCentre - this.radius, this.radius * 2, this.radius * 2);
        ctx.fillStyle = this.colour;
        ctx.fill();
        ctx.clip();
        // ctx.fillRect(this.xCentre - this.radius, this.yCentre - this.radius, this.radius * 2, this.radius * 2);
        this.rings.draw();
        this.line.draw();
        this.blip.draw();
        this.generateOverlays(scannerScreen.yCentre - scannerScreen.radius, scannerScreen.radius * 2, scannerScreen.radius * 2, 6, scene.colour.overlay);
        this.shadow();
        ctx.restore();
      },
      "rings": {
        "number": 4,
        "radius": scene.width * 0.12,
        "draw": function () {
          ctx.lineWidth = 3;
          for (var i = 1; i <= this.number; i++) {
            drawCircle(ctx, scannerScreen.xCentre, scannerScreen.yCentre, this.radius * (i / this.number), scene.colour.hud, 'stroke');
          }
        }
      },
      "line": {
        "angle": 0,
        "speed": 1,
        "colour": scene.colour.hud,
        "draw": function () {
          // Draw line ---------------------------------------------------------
          ctx.beginPath();
          ctx.moveTo(scannerScreen.xCentre, scannerScreen.yCentre);
          ctx.lineTo(this.xFinish, this.yFinish);
          ctx.lineCap = 'round';
          ctx.strokeStyle = this.colour;
          ctx.stroke();

          // Update properties -------------------------------------------------
          this.angle += (this.speed * Math.PI / 180);
          this.xFinish = scannerScreen.xCentre + (scannerScreen.rings.radius * Math.cos(this.angle));
          this.yFinish = scannerScreen.yCentre + (scannerScreen.rings.radius * Math.sin(this.angle));
          // The two lines above find the co-ordinates for a point on the circumference of a circle using these equations:
          // x = a + rcos(t) <= where a is the x co-ordinate of the centre of the circle, r is the radius and t is the angle
          // y = b + rsin(t) <= where b is the y co-ordinate of the centre of the circle, r is the radius and t is the angle
        }
      },
      "blip": {
        "xCentre": 0,
        "yCentre": 0,
        "radius": 0,
        "colour": scene.colour.hud,
        "countdown": 120,
        "visible": false,
        "speed": -0.3,
        "offset": 0,
        "draw": function () {
          var distanceFromBegin = getDistance(scannerScreen.xCentre, scannerScreen.yCentre, scannerScreen.xCentre + this.offset, scannerScreen.yCentre - scannerScreen.radius * 0.65);
          var distanceFromEnd = getDistance(scannerScreen.line.xFinish, scannerScreen.line.yFinish, scannerScreen.xCentre + this.offset, scannerScreen.yCentre - scannerScreen.radius * 0.65);
          var lineLength = getDistance(scannerScreen.xCentre, scannerScreen.yCentre, scannerScreen.line.xFinish, scannerScreen.line.yFinish);

          if (distanceFromEnd + distanceFromBegin >= lineLength && distanceFromEnd + distanceFromBegin <= lineLength + 2) {
            // If the distance between the centre of the screen and the blip plus the distance between the blip and the end of the scanline is equal to the length of the line, the blip must lie onm the line
            // The second condition allows the if statement to account for the line not being drawn over the exact co-ordinates that the blip exists on
            this.visible = true;
            this.xCaptured = scannerScreen.xCentre + this.offset;
            this.yCaptured = scannerScreen.yCentre - scannerScreen.radius * 0.65;
          }

          if (this.visible === true) { // If the blip is visible, draw it and count down
            this.countdown --;
            drawCircle(ctx, this.xCaptured, this.yCaptured, scannerScreen.radius * 0.08, this.colour);
          }

          if (this.countdown === 0) {
            this.countdown = 120;
            this.visible = false;
          }

          this.offset += this.speed;
        }
      }
    };

    var ship = {
      "xCentre": 0,
      "yCentre": targetScreen.yCentre,
      "xRadius": targetScreen.radius * 0.6,
      "yRadius": (targetScreen.radius * 0.6) / 3.8,
      "colour": {
        "standard": scene.colour.hud,
        "targeted": '#FF0000'
      },
      "angle": 0, // Refers to the current angle of the ship
      "maxAngle": 15,
      "speed": 12,
      "targetPass": 6, // This refers to the number of times the ship must be centred before it is 'targeted'
      "passes": 0,
      "state": 'normal',
      "targetCountdown": 30,
      "flashCountdown": 3,
      "targetMessage": 'TARGET ACQUIRED', // Canvas does not support line breaks so /n cannot be used to start a new line
      "draw": function () {
        var colour = this.colour.standard;

        if (this.state == 'detected') {
          colour = this.colour.targeted;

          if (Math.abs(this.angle) <= 3 * Math.PI / 180) { // This if statement is used to gradually decrease the maximum angle of the ship
            this.maxAngle -= 2;
          }

          if (this.maxAngle <= 0 && this.targetCountdown !== 0) { // This if statement is used to
            this.targetCountdown --;
          }

          if (this.targetCountdown === 0) {
            this.state = 'targeted';
            this.targetCountdown = 30;
          }
        }

        if (this.state == 'targeted') {
          this.targetCountdown --;
          colour = scene.colour.transparent;

          if (this.targetCountdown === 0 && this.flashCountdown !== 0) { // This if statement is used to flash the ship
            this.state = 'detected';
            this.targetCountdown = 30;
            this.flashCountdown --;
          }

          if (this.flashCountdown === 0) { // If the ship has flashed 3 times add the text "Target Acquired"
            colour = this.colour.targeted;

            ctx.font = '20px "Press Start 2P", Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = ship.colour.targeted;
            ctx.fillText(ship.targetMessage, 0, targetScreen.yCentre + targetScreen.radius * 0.4); // This x position value is 0 because the canvas has been "translated" to the center of the box
            // .fillText() and other related canvas methods were found here: https://www.w3schools.com/tags/canvas_filltext.asp and here: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text
          }
        }

        drawShip(ctx, this.xCentre, this.yCentre, this.xRadius, this.yRadius, colour, 'stroke');

        this.angle += this.speed * Math.PI / 180;

        if (this.angle >= this.maxAngle || this.angle <= -this.maxAngle) {
          this.speed *= -1; // This reverses the speed, making the the ship rotate in the opposite direction
          this.passes ++; // This increases the total number of passes

          scannerScreen.blip.speed *= -1;
        }

        if (this.state == 'normal') {
          if (this.passes >= this.targetPass) {
            this.state = 'detected';
          }
        }
      }
    };

    var button = {
      "xCentre": scene.width * 0.8,
      "yCentre": scene.height * 0.25,
      "radius": scene.width * 0.08,
      "text": 'EJECT',
      "colour": {
        "button": 'rgba(118, 21, 21, 1)',
        "text": 'rgba(255, 255, 255, 1)'
      },
      "draw": function () {
        drawCircle(ctx, this.xCentre, this.yCentre, this.radius, this.colour.button);
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = this.colour.text;
        ctx.fillText(this.text, this.xCentre, this.yCentre + 10);
      }
    };

    function animate () {
      // Draw general parts ----------------------------------------------------
      ctx.fillStyle = scene.colour.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw targetting screen ------------------------------------------------
      targetScreen.draw();

      // Draw radar ------------------------------------------------------------
      scannerScreen.draw();

      button.draw();

      requestAnimationFrame(animate);
    }

    animate();
  }

  drawAnimatedCanvas('animatedCanvas');

};
