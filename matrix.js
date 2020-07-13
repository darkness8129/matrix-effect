// variables
const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    // arr for drawing func
    symbolArr = new Array(Math.floor(canvas.width)).fill(0);
let paused = false,
    timer;

// first start of drawing func
window.addEventListener('load', resizeCanvas);

// resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas);

// pause effect when 'space' is clicked
window.addEventListener('keydown', () => pauseEffect(event))

// pause effect when touched on touchscreen
window.addEventListener('touchstart', () => pauseEffect(event))

//func for pausing
function pauseEffect(event) {
    // if keyboard event
    if (event.type === 'keydown') {
        if (event.key === ' ' && !paused) {
            clearInterval(timer);
            paused = true;
        } else if (event.key === ' ' && paused) {
            timer = setInterval(drawMatrix, 40);
            paused = false;
        }
        // if touchscreen event 
    } else if (event.type === 'touchstart') {
        if (!paused) {
            clearInterval(timer);
            paused = true;
        } else {
            timer = setInterval(drawMatrix, 40);
            paused = false;
        }
    }
}

// resize func
function resizeCanvas() {
    // width and height of canvas  
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // so that there is no acceleration with every resize
    clearInterval(timer)
    // draws a line in 40 ms
    timer = setInterval(drawMatrix, 40);
}

// drawing func
function drawMatrix() {
    // settings of font and the effect of slow attenuation
    ctx.font = '20px monospace';
    ctx.fillStyle = "rgba(0, 0, 0, .03)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0, 230, 64, 1)';

    // draw line
    symbolArr.map((elem, index) => {
        // write text with random symbol, x = 20 * index, y = elem
        ctx.fillText(String.fromCharCode(randomInt(50, 100)), 20 * index, elem);

        // limitation on y
        if (symbolArr[index] > canvas.height + Math.random() * 1000) {
            symbolArr[index] = 0;
        } else {
            symbolArr[index] += 15;
        }
    });
}

// func for generating a random int number
function randomInt(min, max) {
    return min + Math.floor((max - min) * Math.random());
}