//Canvas Tag
var canvas = document.querySelector('canvas')

//Size of canvas
canvas.width = window.innerWidth-6;
canvas.height = window.innerHeight-6;
var c = canvas.getContext('2d');


//Interactivity
var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 10;
var minRadius = 3;
var colorArray = [
  '#FFF5AD',
  '#C4FFB2',
  '#B5B2D3',
  '#fddfed',
  '#FF674D'
]


window.addEventListener('mousemove',
  function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse);
  });

window.addEventListener('resize',
  function(){
    canvas.width = window.innerWidth-6;
    canvas.height = window.innerHeight-6;
    init();
  })

//Creating a class for drawing and updating canvas
class Circle {
    constructor(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.minRadius = radius;
      this.color = color;
    }
  
    draw() {
      c.beginPath();
      c.globalAlpha = 0.5;  //opacity
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
    }
  
    update() {
        this.draw();
        if (this.x + this.radius > innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if(Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50){
          if(this.radius < maxRadius){
            this.radius += 1;
          }
        }else if(this.radius > this.minRadius){
          this.radius -= 1;
        }
    }
}


//List for storing the circle
var circleArray = [];


function init(){

  circleArray = [];

  //Creating an object of CIRCLE and pushing/adding in the list 'circleArray'
  for (let i = 0; i < 600; i++) {
    let radius =  Math.random() * 6 + 1;
    let x = radius + Math.random() * (innerWidth - radius * 2);
    let y = radius + Math.random() * (innerHeight - radius * 2);
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);
    let color = colorArray[Math.floor(Math.random() * colorArray.length)]
    circleArray.push(new Circle(x, y, dx, dy, radius, color));
  }

}


//Triggering the 'update' function of each object to start animation
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

//Calling the 'init' function to start animation
init();
animate();
