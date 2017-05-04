// TODO list
/* Line 17: "TODO Figure this out - 100vh height adds scrollbars on both axes"
 *  Line 150: "TODO Determine scale factor - maybe this should be global?"
 *  Line 172: "TODO Fix this reset!"
 *  Line 190: "TODO Change this to location of where the horde WILL be (refer to Trello notes for method)"
 */

$(document).ready(function() {
    //var c = document.getElementById("mainCanvas");
    var c = $("#mainCanvas");
    //var ctx = c.getContext.("2d");
    var ctx = c.get(0).getContext("2d");
    // Sets width of canvas to the width&height of browser window. get(0). Only works with CSS reset.
    c.attr("width", $(window).get(0).innerWidth);
    c.attr("height", $(window).get(0).innerHeight);
    //Uses JQuery Resize function to allow the canvas dimensions to be dynamically changed and updated.
    $(window).resize(resizeCanvas);

    function resizeCanvas() {
        c.attr("width", $('.canvas-container').width());
        c.attr("height", $('.canvas-container').height()); // TODO Figure this out - 100vh height adds scrollbars on both axes
    }

    resizeCanvas();

    // Set variables for canvas width and height ---------------------------------
    // var canvasWidth = c.width();
    // var canvasHeight = c.height();

    // Initialise images ---------------------------------------------------------
    var skele = new Image();
    skele.src = 'images/both.png';
    // var tower = new Image();
    // tower.src = 'images/tower.png';
    var fireBall = new Image();
    fireBall.src = 'images/fireballv2.png';
    var flames = new Image();
    flames.src = 'images/flames.png';

    // Initialise JSON objects ---------------------------------------------------
    var scene = {
        "width": c.width(),
        "height": c.height(),
        "originNum": 826
    }

    scene.scaleFactor = scene.height / scene.originNum; // This is declared outside of the original scene initialisation because it uses keys that aren't acessible before this time

    var boulder = {
        // All boulder properties are given here to prevent having to look elsewhere in the code if any changes are required
        // JSON objects found here: https://www.w3schools.com/js/js_json_objects.asp
        "xOrigin": 100,
        "yOrigin": 0,
        "xPos": 100,
        "yPos": 0,
        "xOffset": -200,
        "yOffset": scene.height * 0.15,
        "radius": 10,
        "velocity": 10,
        "landingPos": scene.height / Math.pow(scene.width, 2), // Refers to the x-coordinate at which the boulder lands
        "landingPosCalculated": false,
        "animate": false,
        "shift": 0,
        "frameWidth": 67,
        "frameHeight": 59,
        "totalFrames": 6,
        "currentFrame": 0,

        "trigger": { // TODO Change twitter trigger to these
            "previous": 0,
            "current": 0
        }
    }

    var horde = {
        "sqrx": 0,
        "hordeY": scene.height * 0.85,
        "rectSize": 50,
        "startPos": scene.width,
        "shift": 0,
        "frameWidth": 32.1,
        "frameHeight": 94,
        "totalFrames": 9,
        "currentFrame": 0,
        "speed": 1 // This prevents the horde from animating for x number of frames. In this case: 5
    }

    var explosion = {
        "shift": 0,
        "frameWidth": 106,
        "frameHeight": 96,
        "totalFrames": 9,
        "currentFrame": 0,
        "refresh": 3,
    }

    var tower = {
        "img": new Image(),
        "top": scene.height * 0.1,
        "left": 0,
        "height": scene.height * 0.9,
        "width": scene.width * 0.225
    };

    tower.img.src = 'images/tower.png';

    $('#mainCanvas').click(function() { // When the fire button is clicked the fire function is called
        boulder.animate = true;
    });

    function resetBoulder() {
        boulder.xPos = boulder.xOrigin;
        boulder.yPos = boulder.yOrigin;
    }

    // Draw boulder --------------------------------------------------------------
    function drawCircle() {
        ctx.drawImage(fireBall, boulder.shift, 0, boulder.frameWidth, boulder.frameHeight, boulder.xPos, boulder.yPos, boulder.frameWidth * scene.scaleFactor, boulder.frameHeight * scene.scaleFactor);
        //shifts through sprite sheet (animates)
        boulder.shift += boulder.frameWidth + 1;

        //resets spritesheet. Loops through
        if (boulder.currentFrame == boulder.totalFrames) {
            boulder.shift = 0;
            boulder.currentFrame = 0;
        }
        //loops through each frame. frame properties stated in boulder Object.
        boulder.currentFrame++;
    }

    // Return the y position for the boulder -------------------------------------
    function getBoulderY(x) {
        return Math.pow(x + boulder.xOffset, 2) * boulder.landingPos + boulder.yOffset;
    }

    // Animate the scene ---------------------------------------------------------
    var countdown = horde.speed;
    var cycle = explosion.refresh;
    var sqrActPos = scene.width - horde.sqrx + 5;

    var triggerCountdown = 30;
    var filesize = 1;
    var previousFilesize = 1;

    var file = 0;

    function animate() {
        ctx.clearRect(0, 0, scene.width, scene.height); // Clears the canvas from the previous frame

        countdown--;
        if (countdown === 0) { // This controls the speed of the horde by only running every 5th time the animate function runs
            countdown = horde.speed;
            //calc for actual position of horde
            sqrActPos = scene.width - horde.sqrx + 5;

            //update Squares X pos
            horde.sqrx++;
            //shifts through sprite sheet (animates)
            horde.shift += horde.frameWidth + 1;

            //resets spritesheet. Loops through
            if (horde.currentFrame == horde.totalFrames) {

                horde.shift = 0;
                horde.currentFrame = 0;
            }
            //loops through each frame. frame properties stated in horde Object.
            horde.currentFrame++;
        }

        ctx.drawImage(skele, horde.shift, 0, horde.frameWidth, horde.frameHeight, sqrActPos, horde.hordeY, horde.frameWidth * scene.scaleFactor, horde.frameHeight * scene.scaleFactor);
        ctx.drawImage(skele, horde.shift, 0, horde.frameWidth, horde.frameHeight, sqrActPos + 40, horde.hordeY, horde.frameWidth * scene.scaleFactor, horde.frameHeight * scene.scaleFactor);
        ctx.drawImage(skele, horde.shift, 0, horde.frameWidth, horde.frameHeight, sqrActPos + 80, horde.hordeY, horde.frameWidth * scene.scaleFactor, horde.frameHeight * scene.scaleFactor);

        // Animate boulder ---------------------------------------------------------
        if (boulder.animate) { // If the boulder animation property is true, the boulder will animate

            if (boulder.landingPosCalculated === false) { // Sets the x position for the boulder to land to the x pos of the horde IF it hasn't been calculated
                boulder.landingPosCalculated = true;

                boulder.landingPos = (scene.height - boulder.yOffset) / Math.pow(sqrActPos + boulder.xOffset, 2); // Refers to the x-coordinate at which the boulder lands;
            }

            boulder.xPos += boulder.velocity; // This updates the boulders x position
            boulder.yPos = getBoulderY(boulder.xPos); // This updates the boulders y position relative to the x position (y=x^2)

            drawCircle(boulder.xPos, boulder.yPos);
        }

        ctx.drawImage(tower.img, tower.left, tower.top, tower.width, tower.height); // Draws the tower

        // Horde resets & explosion animation --------------------------------------
        // Soft reset --------------------------------------------------------------
        if (boulder.yPos + boulder.radius >= horde.hordeY) {
            cycle--;
            if (cycle === 0) {
                cycle = explosion.refresh;

                explosion.shift += explosion.frameWidth + 1;
                //resets spritesheet. Loops through
                if (explosion.currentFrame == explosion.totalFrames) {
                    explosion.shift = 0;
                    explosion.currentFrame = 0;
                }
                explosion.currentFrame++;
            }
            ctx.drawImage(flames, explosion.shift, 0, explosion.frameWidth, explosion.frameHeight, boulder.xPos, boulder.yPos, explosion.frameWidth, explosion.frameHeight);
            horde.sqrx = 0;

            boulder.animate = false;
            boulder.landingPosCalculated = false;
            resetBoulder();
        }

        // Hard reset --------------------------------------------------------------
        if (horde.sqrx >= scene.width - 297 * scene.scaleFactor) { // Resets the horde if they reach the tower
            horde.sqrx = 0;

            boulder.animate = false;
            boulder.landingPosCalculated = false;
            resetBoulder();
        }

        triggerCountdown--;

        if (triggerCountdown === 0) {
        // Twitter trigger -----------------------------------------------------------
           file = $.ajax({
              url: "twitter-stream.json",
              type: "HEAD",
              success: function () {
                filesize = file.getResponseHeader('Content-Length');
                console.log(filesize + ", " + previousFilesize);

                if (filesize !== previousFilesize) {
                  boulder.animate = true;
                }

                previousFilesize = filesize;
              }
            });

            // var xhr = $.ajax({
            //   type: "HEAD",
            //   url: "twitter-stream.json",
            //   success: function(){
            //     alert(xhr.getResponseHeader('Content-Length') + ' bytes');
            //     console.log(xhr.getResponseHeader('Content-Length'));
            //   }
            // });
            triggerCountdown = 30;
        }

        requestAnimationFrame(animate);
    }

    animate();


});
