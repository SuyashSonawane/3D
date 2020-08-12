let FRONTWALL = "Plane_0";
let BACKWALL = "Plane_1";
let FLOOR = "Plane_3";
let LEFTWALL = "Plane_2";
let BED_CUSHION = "Cube002";
let BED = "Cube001";
let BLANKET = "Plane001";
let CABINET = "Cabinet1";
let PILLOW1 = "Cube004";
let PILLOW2 = "Cube005";
let SOFA_REST_R = "Box007";
let SOFA_BASE_R = "Box006";
let SOFA_BASE_L = "Box002";
let SOFA_CUSHION_R = "Box022";
let SOFA_CUSHION_L_1 = "Box012001";
let SOFA_CUSHION_L_2 = "Box013";
let CHAIR2 = "Box012";
let CHAIR1 = "Box011002";
let CHAIR_Pillow = "Box023";
let CARPET = "Box021";
let TAbLE_TOP = "Object063";
let DECOR = "decoration_set_085";
let DECOR1 = "decoration_set_082";
let DECOR2 = "decoration_set_083";
let DECOR3 = "decoration_set_084";
let DECOR4 = "decoration_set_081";
let VAS = "decoration_set_002";
let BOOK1 = "book2";
let BOOK2 = "book3";
let BOOK3 = "book4";
var cameraFar = 5;
var theModel;
var activeOption = BACKWALL;
const Textures = [
  "images/carpet.jpg",
  "images/cushion1.jpg",
  "images/cushion2.jpg",
  "images/floor1.jpg",
  "images/wood.jpg",
  "images/wood1.jpg",
  "images/wallpaper.jpg",
  "images/sofabase.jpg",
];
const TRAY = document.getElementById("js-tray-slide");
Textures.forEach((el) => {
  let img = document.createElement("img");
  img.classList.add("tray__swatch");
  img.setAttribute("data-key", el);
  img.src = el;
  // img.width = 30;
  // img.height = 30;
  TRAY.append(img);
  // document.querySelector(".tray").appendChild(img);
});
const swatches = document.querySelectorAll(".tray__swatch");

for (const swatch of swatches) {
  swatch.addEventListener("click", selectSwatch);
}

const options = document.querySelectorAll(".option");

for (const option of options) {
  option.addEventListener("click", selectOption);
}

function selectOption(e) {
  let option = e.target;
  activeOption = e.target.dataset.option;
  for (const otherOption of options) {
    otherOption.classList.remove("--is-active");
  }
  option.classList.add("--is-active");
}

function selectSwatch(e) {
  let src = e.target.dataset.key;
  let txt = new THREE.TextureLoader();
  txt.load(src, (tx) => {
    let mat = new THREE.MeshPhongMaterial({
      map: tx,
      wireframe: false,
    });
    theModel.traverse((o) => {
      if (o.isMesh) {
        if (o.name == activeOption) {
          o.material = mat;
        }
      }
    });
  });

  // setMaterial(theModel, "legs", new_mtl);
}
const MODEL_PATH = "models/bedroom.glb";

const BACKGROUND_COLOR = 0xf1f1f1;
// Init the scene
const scene = new THREE.Scene();
// Set background
scene.background = new THREE.Color(BACKGROUND_COLOR);
scene.fog = new THREE.Fog(BACKGROUND_COLOR, 20, 100);

const canvas = document.querySelector("#c");

// Init the renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.shadowMap.enabled = true;
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// Add a camerra
var camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = 4.322336227408336;
camera.position.y = 2.672529290658169;
camera.position.z = 5.9663231471143625;
camera.rotation._x = -0.32870264884392497;
camera.rotation._y = 0.6697641714250248;
camera.rotation._z = 0.20865843491076652;
// camera.position.z = cameraFar;
// camera.position.x = 0;
// camera.position={x: -5.008494960882773
// y: 2.329450478244851
// z: -6.224075549449764}
const INITIAL_MTL = new THREE.MeshPhongMaterial({
  color: 0xf1f1f1,
  shininess: 10,
  // side: THREE.DoubleSide,
});
// Init the object loader
var loader = new THREE.GLTFLoader();

loader.load(
  MODEL_PATH,
  function (gltf) {
    theModel = gltf.scene;

    // theModel.scale.set(2, 2, 2);

    new_mtl = new THREE.MeshPhongMaterial({
      color: parseInt("0x673ab7"),
    });

    theModel.traverse((o) => {
      if (o.isMesh) {
        o.material = INITIAL_MTL;
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    scene.add(theModel);

    loadMaterials();

    // Offset the y position a bit
    // theModel.position.y = -1;

    // Add the model to the scene
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

function loadMaterials() {
  let mats = [
    [FLOOR, "images/floor1.jpg"],
    [BACKWALL, "images/wood1.jpg"],
    [CARPET, "images/carpet.jpg"],
    [TAbLE_TOP, "images/wood.jpg"],
    [DECOR, "images/wood.jpg"],
    [DECOR1, "images/cushion1.jpg"],
    [DECOR2, "images/cushion1.jpg"],
    [DECOR3, "images/cushion1.jpg"],
    [DECOR4, "images/cushion1.jpg"],
    // [BOOK1, "images/cushion2.jpg"],
    // [BOOK3, "images/cushion1.jpg"],
    // [BOOK2, "images/cushion2.jpg"],
  ];

  mats.forEach((el) => {
    let txt = new THREE.TextureLoader();
    txt.load(el[1], (tx) => {
      // tx.wrapS = THREE.RepeatWrapping;
      // tx.wrapT = THREE.RepeatWrapping;
      // tx.offset.set(0, 0);
      // tx.repeat.set(2, 2);
      let mat = new THREE.MeshPhongMaterial({
        map: tx,
        wireframe: false,
      });
      theModel.traverse((o) => {
        if (o.isMesh) {
          if (o.name == el[0]) {
            o.material = mat;
          }
        }
      });
    });
  });
}

// Add lights
var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(0, 50, 0);
// Add hemisphere light to scene
scene.add(hemiLight);

var dirLight = new THREE.DirectionalLight(0xffffff, 0.84);
dirLight.position.set(55, 5, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);

// Add directional Light to scene
scene.add(dirLight);

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvasPixelWidth = canvas.width / window.devicePixelRatio;
  var canvasPixelHeight = canvas.height / window.devicePixelRatio;

  const needResize = canvasPixelWidth !== width || canvasPixelHeight !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2;
controls.minPolarAngle = Math.PI / 3;
controls.enableDamping = true;
// controls.enablePan = false;
controls.dampingFactor = 0.1;
controls.autoRotate = false; // Toggle this if you'd like the chair to automatically rotate
controls.autoRotateSpeed = 0.2; // 30
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}

animate();
