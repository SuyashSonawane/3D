let hollow;
let floor;
let wall;
let overlay = document.querySelector(".overlay");
let x = 0;
let materials = [
  { mat: "materials/wall1.jpg", id: "wall1" },
  { mat: "materials/wall2.jpg", id: "wall2" },
  { mat: "materials/floor1.jpg", id: "floor1" },
  { mat: "materials/floor2.jpg", id: "floor2" },
];

function setup() {
  hollow = loadImage("images/hollow.png");
  floor = loadImage("images/floor1.png");
  wall = loadImage("images/wall1.png");
  if (windowHeight < 600) createCanvas(1024, 600);
  else createCanvas(windowWidth, windowWidth * 0.5);
  // frameRate(5);
  pixelDensity(3.0);
  loadImages();
  overlay.style.display = "none";
}

function draw() {
  background(0);
  render();
  // filter(BLUR, 3);
}
function loadImages() {
  for (let mat of materials) {
    let img = document.createElement("img");
    img.src = mat.mat;
    img.height = 50;
    img.width = 50;
    img.dataset.option = mat.id;
    img.addEventListener("click", imgClicked);
    document.querySelector(".controls").appendChild(img);
  }
}

function imgClicked(e) {
  let option = e.target.dataset.option;
  overlay.style.display = "flex";
  if (option.includes("wall")) {
    wall = loadImage(`images/${option}.png`, () => {
      overlay.style.display = "none";
    });
  }
  if (option.includes("floor")) {
    floor = loadImage(`images/${option}.png`, () => {
      overlay.style.display = "none";
    });
  }
}

function render() {
  let contents = [wall, floor, hollow];

  for (let i = 0; i < contents.length; i++) {
    contents[i].resize(width, height);
    image(contents[i], x * (i + 1), 0);
  }
}

function mouseMoved() {
  x = map(mouseX, 0, width, -2, 2) * 5;

  return false;
}
