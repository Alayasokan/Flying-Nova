// Elements
var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var scoreDisplay = document.getElementById("score");

// Game Variables
var jumping = 0;
var counter = 0;

scoreDisplay.innerHTML = "Score : " + counter;


// Random hole position + score update
hole.addEventListener("animationiteration", function () {
    var random = -((Math.random() * 300) + 150);
    hole.style.top = random + "px";

    counter++;
    scoreDisplay.innerHTML = "Score : " + counter;
});


// Gravity + Collision detection
setInterval(function () {

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

    // Gravity
    if (jumping == 0) {
        character.style.top = (characterTop + 3) + "px";
    }

    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));

    var cTop = -(500 - characterTop);

    // Collision Check
    if (
        (characterTop > 480) ||
        ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))
    ) {
        customAlert.alert("Your maximum score " + counter, "Game Over");

        character.style.top = "100px";
        counter = 0;
        scoreDisplay.innerHTML = "Score : " + counter;
    }

}, 10);


// Jump Function
function jump() {

    if (jumping == 1) return;   // Prevent multi jump

    jumping = 1;
    let jumpCount = 0;

    var jumpInterval = setInterval(function () {

        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));

        if ((characterTop > 6) && (jumpCount < 15)) {
            character.style.top = (characterTop - 5) + "px";
        }

        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }

        jumpCount++;

    }, 10);
}


// Controls
document.addEventListener("click", jump);

document.addEventListener("keydown", function (e) {
    if (e.code === "Space" || e.code === "ArrowUp") {
        jump();
    }
});


// Custom Alert Class
function CustomAlert() {

    this.alert = function (message, title) {

        document.body.innerHTML +=
            '<div id="dialogoverlay"></div>' +
            '<div id="dialogbox" class="slit-in-vertical">' +
            '<div>' +
            '<div id="dialogboxhead"></div>' +
            '<div id="dialogboxbody"></div>' +
            '<div id="dialogboxfoot"></div>' +
            '</div></div>';

        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogbox');

        let winH = window.innerHeight;
        dialogoverlay.style.height = winH + "px";

        dialogbox.style.top = "100px";

        dialogoverlay.style.display = "block";
        dialogbox.style.display = "block";

        if (typeof title === 'undefined') {
            document.getElementById('dialogboxhead').style.display = 'none';
        } else {
            document.getElementById('dialogboxhead').innerHTML =
                '<i class="fa fa-exclamation-circle"></i> ' + title;
        }

        document.getElementById('dialogboxbody').innerHTML = message;

        document.getElementById('dialogboxfoot').innerHTML =
            '<button onclick="customAlert.ok()">OK</button>';
    }

    this.ok = function () {
        document.getElementById('dialogbox').style.display = "none";
        document.getElementById('dialogoverlay').style.display = "none";
        location.reload();
    }
}


// Create Alert Object
let customAlert = new CustomAlert();
