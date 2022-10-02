const canvas = document.querySelector('.myCanvas');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

// black background
ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

ctx.translate(width/2, height/2);

function degToRad(degree) {
    return degree * Math.PI /180;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + (min);
}

let length = 250;
let moveOffset = 5;

for (let i = 0; i < length; i++) {
    ctx.fillStyle = `rgba(${rand(0, 255)}, ${rand(0, 255)}, ${rand(0, 255)}, 0.9)`;
    ctx.beginPath();
    ctx.arc(length + moveOffset, moveOffset, rand(5,20), degToRad(-45), degToRad(45), true);
    ctx.lineTo(length + moveOffset, moveOffset);
    ctx.fill();

    length--;
    moveOffset += 0.5;
    ctx.rotate(degToRad(10));
}
