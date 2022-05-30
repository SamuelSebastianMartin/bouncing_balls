const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 300;
const CANVAS_HEIGHT = canvas.height = 300;
const gravity = 0.1
const numBalls = 50;
let balls = [];

class Ball{
  constructor(x, y, radius=20, color='seagreen'){
    this.x = x;
    this.y = y;
    this.dx = 1;
    this.dy = 1;
    this.radius = radius;
    this.color = color;
  }
  update(){
    if (this.y + this.radius + this.dy > CANVAS_HEIGHT) { //  + dy stops bottom-clog
      this.dy = -this.dy * 0.90; // change direction & lose speed when bounce
      this.dx *= 0.98; // rolling friction
    } else {
      this.dy += gravity;
    }
    this.y += this.dy;
    if ((this.x + this.radius > CANVAS_WIDTH) || (this.x - this.radius < 0)) {
      this.dx *= -1;
    }
    this.x += this.dx;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }
}

// Helpers //
function randomColor(){
  colors = [
    '#234E85',
    '#6E7C74',
    '#C7B763',
    '#D09D48',
    '#CA6220',
    '#C63501',
    '#C63501',
    '#6B7A8D',
    '#6B7A8D'
  ]
  colorChoice = randomInt(0, colors.length);
  return colors[colorChoice];
}

function randomInt(lower, higher){
  return Math.floor(Math.random() * higher) + lower
}

for (let i = 0; i < numBalls; i++){
  let x = randomInt(20, CANVAS_WIDTH -30);
  let y = randomInt(20, CANVAS_HEIGHT - 40);
  let radius = randomInt(3, 20);
  let color = randomColor();
  let ball = new Ball(x, y, radius, color);
  balls.push(ball);
}
function animate(){
  ctx.globalAlpha = 0.6
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  balls.forEach((ball) => {
    ball.update();
    ball.draw();
  });
  requestAnimationFrame(animate);
}
animate();
