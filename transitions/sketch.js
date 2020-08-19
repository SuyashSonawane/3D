let BlurAmount = 0;
let resizer;
let isChanging = false;
let img;
let im;
let door = document.querySelector(".backDoor");
let TEXT = "Kitchen";
function setup() {
  createCanvas(windowWidth, windowWidth * 0.5);
  resizer = width;
  img = loadImage(
    "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  );
  im = loadImage(
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  );

  frameRate(2);
}

let x = 0,
  y = 0;

function draw() {
  background(220);
  img.resize(resizer, resizer * 0.5);
  image(img, x, y);
  // filter(BLUR, BlurAmount);

  if (isChanging && BlurAmount < 3) {
    tint(255, 125);
    BlurAmount += 0.9;
    resizer += 70;
    x -= 35;
  } else {
    noTint();
    resizer = resizer == width ? width : (resizer -= 70);
    x = x == 0 ? 0 : (x += 35);
    BlurAmount = BlurAmount == 0 ? 0 : (BlurAmount -= 0.9);

    isChanging = false;
  }
}

function mouseMoved() {
  // x += map(mouseX, 0, width, -1, 1) * 2;
  // return false;
}

function change() {
  isChanging = true;
  door.style.transform = "none";
  setTimeout(() => {
    img = im;
    element.classList.toggle("doorOpen");
    setTimeout(() => {
      element.classList.toggle("doorOpen");
      door.style.transform = "translateY(-100vh)";
    }, 1000);
  }, 1500);
}

var element = document.querySelector(".door");
// element.addEventListener("click", toggleDoor);

function mouseClicked() {
  change();
}
