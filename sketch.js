let number_of_Stars = 1000;

let starArray = [];

let hoverSpeedMultiplier = 500;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < number_of_Stars; i++) {
    starArray.push(new Estrella());
  }
  
  // Add event listener to canvas for hover
  canvas.addEventListener("mouseover", function() {
    for (const newArr of starArray) {
      newArr.targetspeed *= hoverSpeedMultiplier;
      newArr.color = color(random(255), random(255), random(255));
    }
  });

  canvas.addEventListener("mouseout", function() {
    for (const newArr of starArray) {
      newArr.color = "white"; // change the color of the star back to white when the mouse is not hovering
    }
  });
  
 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(05, 50);
  translate(width / 2, height / 2);
  for (const newArr of starArray) {
    newArr.map();
  }
}

function Estrella() {
  this.x = random(-150, 150);
  this.y = random(-150, 150);
  this.targetspeed = random(5);
  this.speed = 0;
  this.color = "white";
  this.map = function () {
    stroke(this.color);
    this.speed += 0.05;
    if (this.speed > this.targetspeed) {
      this.speed = this.targetspeed;
    }
    
    strokeWeight(this.speed);
    point(this.x, this.y);
    this.mover();
    this.reiniciar();
  };

  this.mover = function () {
    let aceleration = createVector(this.x, this.y);
    aceleration.normalize();//Convertimos el vector en uno de radio 1
    aceleration.mult(this.speed);//Le asignamos una magnitud deseada
    this.x += aceleration.x;//se mueve x
    this.y += aceleration.y;//se mueve y
  };
  this.isOut = function () {
    if (this.x < -width / 2 || this.x > width / 2) {
      return true;
    }
    if (this.y < -height / 2 || this.y > height / 2) {
      return true;
    }
    return false;
  };
  this.reiniciar = function () {
    if (this.isOut()) {
      let i = starArray.indexOf(this);
      starArray.splice(i, 1);
      starArray.push(new Estrella());
    }
  };
}
