// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const para = document.querySelector('p');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let count = 0;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// function to generate random color

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// super class for basic dimensions

class Shape {

  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }

}

class Ball extends Shape {

  constructor(x, y, velX, velY, color, size, exists) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = exists = true;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    // ball going off right edge
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
    // ball going off left edge
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
    // ball going off bottom edge
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
    // ball going off top edge
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    
    // moves ball for every call
    this.x += this.velX;
    this.y += this.velY;
  }
  
  // detects whether ball hits another ball and if so, sets both balls to same random color
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }  

}

class EvilCircle extends Shape {
  
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;

    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case 'a':
          this.x -= this.velX;
          break;
        case 'd':
          this.x += this.velX;
          break;
        case 'w':
          this.y -= this.velY;
          break;
        case 's':
          this.y += this.velY;
          break;
      }
    });
  }

  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // checks if circle reaches edge if it does, it bounces off to the opposite direction
  checkBounds() {
    if ((this.x + this.size) >= width) {
      this.x -= this.size;
    }
  
    if ((this.x - this.size) <= 0) {
      this.x += this.size;
    }
  
    if ((this.y + this.size) >= height) {
      this.y -= this.size;
    }
  
    if ((this.y - this.size) <= 0) {
      this.y += this.size;
    }
  }

  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + ball.size) {
          ball.exists = false;
          count--;
          para.textContent = `Ball count: ${count}`;
        }
      }
    }
  }

}

const balls = [];
const evil = new EvilCircle(random(0, width), random(0,height));

while (balls.length < 25) {
  const size = random(10,20);
  // ball position always drawn at least one ball width away from the edge of the canvas, to avoid drawing errors
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
  count++;
  para.textContent = `Ball count: ${count}`;
}

// animation loop: updates information in program
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    if(ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
    evil.draw();
    evil.checkBounds();
    evil.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
