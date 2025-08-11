const input = document.getElementById('input');
// create web audio api elements
const audioCtx = new AudioContext(); // play/pause speakers
const gainNode = audioCtx.createGain(); // controls volume

// create Oscillator node
const oscillator = audioCtx.createOscillator(); // controls frequency
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";

// initialize
oscillator.start();
gainNode.gain.value = 0;

notenames = new Map();
notenames.set("C", 261.6);
notenames.set("D", 293.7);
notenames.set("E", 329.6);
notenames.set("F", 349.2);
notenames.set("G", 392.0);
notenames.set("A", 440);
notenames.set("B", 493.9);

// define canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // face of canvas
var width = ctx.canvas.width;
var height = ctx.canvas.height;
var freq = null;
var amplitude = 40;
var interval = null;

var counter = 0;

function drawWave() {
    ctx.clearRect(0, 0, width, height);
    x = 0;
    y = height/2;
    ctx.moveTo(x, y);
    ctx.beginPath();
    counter = 0;
    interval = setInterval(line, 20);
    if (counter > 50) {
        clearInterval(interval);
    }
}

function line() {
    y = height/2 + (amplitude * Math.sin(x * 2 * Math.PI * freq));
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
    counter++;
}

function frequency(pitch) {
    freq = pitch / 10000;
    gainNode.gain.setValueAtTime(50, audioCtx.currentTime);
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 1);
}

function handle() {
    //autoplay (?)
    audioCtx.resume();
    gainNode.gain.value = 0;
    var noteInput = String(input.value);

    frequency(notenames.get(noteInput));
    drawWave();
}

