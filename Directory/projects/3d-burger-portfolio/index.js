import * as THREE from 'three';
import { mainMenu } from './Components/mainMenu.js';

// === Constants ===
const CANVAS_SELECTOR = "#bg";
const LERP_SPEED = 0.1;
const LAYER_COLORS = [0x800080, 0x00ff00, 0xff0000, 0xffff00]; // Purple, Green, Red, Yellow
const LAYER_POSITIONS = [-0.4, -0.05, 0.3, 0.65, 1];

const ROTATION_SPEED = 0.01;
const ROTATION_ANGLE = Math.PI / 6;

// === Initialization ===
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector(CANVAS_SELECTOR),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

// === Camera ===
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
adjustCameraPosition(window.innerWidth);

// Camera Mobile Responsiveness
function adjustCameraPosition(width) {
    camera.aspect = width / window.innerHeight;
    camera.updateProjectionMatrix();

    // Adjust if needed for responsiveness
    if (width < 700) {
        camera.position.set(0, -0.6, 3.5);
    } else if (width < 1000) {
        camera.position.set(0, -0.6, 3.5);
    } else {
        camera.position.set(0, -0.6, 3.5);
    }
}

function handleResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    adjustCameraPosition(window.innerWidth);
}

// Scene
const scene = new THREE.Scene();

// Pivot Objects
const burgerPivot = new THREE.Object3D();
const friesPivot = new THREE.Object3D();
const drinkPivot = new THREE.Object3D();
scene.add(burgerPivot, friesPivot, drinkPivot);

// Load Initial Text
document.addEventListener('DOMContentLoaded', () => {
    updateTexts();
});

// === Burger Setup ===
const layers = createBurgerLayers();
const { topBun, bottomBun, multicolorPatty } = createBuns();
burgerPivot.add(topBun, bottomBun, multicolorPatty, ...layers);

// === Fries and Drink Setup ===
const { friesCube, chips } = createFries();
const { drinkCube, drinkCover, drinkStraw } = createDrink();
friesPivot.add(friesCube, ...chips);
drinkPivot.add(drinkCube, drinkCover, drinkStraw);

// === Event Listeners ===
window.addEventListener("resize", handleResize);
window.addEventListener("wheel", handleScroll);
window.addEventListener("keydown", handleKeyPress);


// === Controls ===
function handleScroll(event) {
    scrollStep = Math.max(0, Math.min(scrollStep + (event.deltaY > 0 ? 1 : -1), layers.length + 4));
    updateTexts();
}

function handleKeyPress(event) {
    if (event.key === "ArrowUp") {
        scrollStep = Math.max(0, scrollStep - 1);
        updateTexts();
    } else if (event.key === "ArrowDown") {
        scrollStep = Math.min(scrollStep + 1, layers.length + 4);
        updateTexts();
    }
}

function updateTexts() {
    const texts = document.querySelectorAll('.text');
    texts.forEach((text, index) => {
        text.style.display = scrollStep === index ? 'block' : 'none';
    });
}


// === Animation State ===
// Declare states outside of function to ensure their values remain omnipresent
let scrollStep = 0;
let pattyColorIndex = 0;
let pattyColorTime = 0;

let pattyMaterial = new THREE.MeshBasicMaterial({ 
    color: LAYER_COLORS[0], 
    transparent: true, 
    opacity: 0 
});

multicolorPatty.material = pattyMaterial;


// === Helper Functions ===
function createBurgerLayers() {
    
    // Loop through each color in the index for LAYER_COLORS
    return LAYER_COLORS.map((color, index) => {
        const geometry = new THREE.BoxGeometry(0.5, 0.2, 0.5);
        const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 });
        const layer = new THREE.Mesh(geometry, material);
        layer.position.y = LAYER_POSITIONS[index];
        burgerPivot.add(layer);
        return layer;
    });
}

function createBuns() {
    const topBun = createCube(0.6, 0.3, 0.6, 0xffcc99);
    const bottomBun = createCube(0.6, 0.3, 0.6, 0xffcc99);
    const multicolorPatty = createCube(0.5, 0.2, 0.5, LAYER_COLORS[0]);
    return { topBun, bottomBun, multicolorPatty };
}

function createFries() {
    const friesCube = createCube(0.3, 0.4, 0.3, 0xff0000);
    friesCube.position.set(-1, -0.55, 0);

    // 3 cute chips
    const chips = [-0.1, 0, 0.1].map(offset => {
        const chip = createCube(0.05, 0.3, 0.05, 0xffd700);
        chip.position.set(friesCube.position.x + offset, friesCube.position.y + 0.15, friesCube.position.z);
        return chip;
    });

    return { friesCube, chips };
}

function createDrink() {
    const drinkCube = createCylinder(0.2, 0.5, 0xff0000);
    drinkCube.position.set(1, -0.45, 0);

    const drinkCover = createCylinder(0.21, 0.05, 0xffffff);
    drinkCover.position.set(1, -0.2, 0);

    const drinkStraw = createCylinder(0.03, 0.6, 0x00ffff);
    drinkStraw.position.set(1, -0.1, 0);
    drinkStraw.rotation.x = Math.PI / 10;

    return { drinkCube, drinkCover, drinkStraw };
}

// https://threejs.org/docs/#api/en/geometries/BoxGeometry
function createCube(width, height, depth, color) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 });
    return new THREE.Mesh(geometry, material);
}

// https://threejs.org/docs/#api/en/geometries/CylinderGeometry
function createCylinder(radius, height, color) {
    const geometry = new THREE.CylinderGeometry(radius, radius, height, 32);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0 });
    return new THREE.Mesh(geometry, material);
}


// === Animation Handler ===
function animate() {
    handleBurgerPosition();
    handleBurgerLayersOpacity();
    handleSideElementsOpacity();
    handleMulticolorPattyAppearance();
    rotateSceneObjects();

    renderer.render(scene, camera);
}
// Make sure you generate this outside of animate function. Or it will loop infinitely, causing EXTREME LAG.
mainMenu('text-container');


// === Handle Object Animations ===

let hasBurgerMovedDown = false;
let targetBurgerY = 0;

function handleBurgerPosition() {
    const squishAmount = scrollStep >= layers.length + 4 ? 0.2 : 0;

    // Adjust top bun position
    if (scrollStep < layers.length + 4) {
        topBun.position.y += (1 - topBun.position.y) * LERP_SPEED;
        hasBurgerMovedDown = false;
    } else {
        topBun.position.y = 0.45 - squishAmount;
    }

    // Adjust bottom bun position
    if (scrollStep >= layers.length + 4) {
        bottomBun.position.y += (-0.45 + squishAmount - bottomBun.position.y) * LERP_SPEED;

        if (!hasBurgerMovedDown) {
            targetBurgerY = -0.45;
            hasBurgerMovedDown = true
        }
    } else {
        bottomBun.position.y += (-0.75 - bottomBun.position.y) * LERP_SPEED;
        targetBurgerY = 0;
    }

    // Ensure smooth transition when burgers moves
    burgerPivot.position.y += (targetBurgerY - burgerPivot.position.y) * LERP_SPEED;
}


function handleBurgerLayersOpacity() {
    layers.forEach((layer, index) => {
        const targetOpacity = scrollStep > index ? 1 : 0;
        layer.material.opacity += (targetOpacity - layer.material.opacity) * LERP_SPEED;

        const targetPosition = scrollStep >= layers.length + 4 ? 0 : LAYER_POSITIONS[index];
        layer.position.y += (targetPosition - layer.position.y) * LERP_SPEED;
    });

    const bunTargetOpacity = scrollStep > layers.length ? 1 : 0;
    topBun.material.opacity += (bunTargetOpacity - topBun.material.opacity) * LERP_SPEED;
    bottomBun.material.opacity += (bunTargetOpacity - bottomBun.material.opacity) * LERP_SPEED;
}


function handleSideElementsOpacity() {
    const sideTargetOpacity = scrollStep > layers.length + 1 ? 1 : 0;
    friesCube.material.opacity += (sideTargetOpacity - friesCube.material.opacity) * LERP_SPEED;

    chips.forEach((chip) => {
        chip.material.opacity += (sideTargetOpacity - chip.material.opacity) * LERP_SPEED;
    });

    const sideTargetOpacity2 = scrollStep > layers.length + 2 ? 1 : 0;
    drinkCube.material.opacity += (sideTargetOpacity2 - drinkCube.material.opacity) * LERP_SPEED;
    drinkCover.material.opacity += (sideTargetOpacity2 - drinkCover.material.opacity) * LERP_SPEED;
    drinkStraw.material.opacity += (sideTargetOpacity2 - drinkStraw.material.opacity) * LERP_SPEED;
}


function handleMulticolorPattyAppearance() {

    if (scrollStep === layers.length + 4) {
        // Gradually increase opacity
        pattyMaterial.opacity += (1 - pattyMaterial.opacity) * LERP_SPEED;

        // Cycle through colors
        pattyColorTime += 0.05;
        if (pattyColorTime > 1) {
            pattyColorTime = 0;
            pattyColorIndex = (pattyColorIndex + 1) % LAYER_COLORS.length;
        }
        // https://vanslaars.io/articles/cycle-through-an-array-of-values-with-the-modulus-operator/#:~:text=We%20get%20our%20target%20index,it%20loops%20around%20on%20itself.
        const nextColorIndex = (pattyColorIndex + 1) % LAYER_COLORS.length;
        const currentColor = new THREE.Color(LAYER_COLORS[pattyColorIndex]);
        const nextColor = new THREE.Color(LAYER_COLORS[nextColorIndex]);
        
        // https://threejs.org/docs/#api/en/math/Color.lerp
        pattyMaterial.color.lerpColors(currentColor, nextColor, pattyColorTime);
    } else {
        pattyMaterial.opacity += (0 - pattyMaterial.opacity) * LERP_SPEED;
    }
}

function rotateSceneObjects() {
    const pivots = [burgerPivot, drinkPivot, friesPivot];

    pivots.forEach(pivot => {
        pivot.rotation.y += ROTATION_SPEED;
        pivot.rotation.x = ROTATION_ANGLE; 
    });
}