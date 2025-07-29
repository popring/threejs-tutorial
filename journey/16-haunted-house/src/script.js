import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Timer } from 'three/addons/misc/Timer.js';
import GUI from 'lil-gui';

const values = {
  wallWidth: 4,
  wallHeight: 2.5,
  wallDepth: 4,
  houseColor: '#ff0000',
  roofColor: '#00ff00',
  wallColor: '#0000ff',
  floorColor: '#000000',
  ambientLight: 0.5,
  roofHeight: 1.5,
  roofRadius: 3.5,
  doorWidth: 2.2,
  doorHeight: 2.2,
  bushRadius: 1,
  bushWidth: 16,
  bushHeight: 16,
};

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * House
 */
// Temporary sphere
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshStandardMaterial({ roughness: 0.7 })
// )
// scene.add(sphere)

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshBasicMaterial({
    color: 'gray',
    side: THREE.DoubleSide,
  })
);
floor.rotation.x = Math.PI * 0.5;
scene.add(floor);

const house = new THREE.Group();
scene.add(house);

const wall = new THREE.Mesh(
  new THREE.BoxGeometry(values.wallWidth, values.wallHeight, values.wallDepth),
  new THREE.MeshStandardMaterial()
);
wall.position.y += values.wallHeight / 2 + 0.01;
house.add(wall);

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(values.roofRadius, values.roofHeight, 4),
  new THREE.MeshStandardMaterial()
);
roof.position.y = values.wallHeight + values.roofHeight / 2;
roof.rotation.y = Math.PI / 4;
house.add(roof);

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(values.doorWidth, values.doorHeight),
  new THREE.MeshStandardMaterial({ color: 'skyblue' })
);
door.position.y = values.doorHeight / 2;
door.position.z = values.wallWidth / 2 + 0.01;
house.add(door);

const bushGeometry = new THREE.SphereGeometry(
  values.bushRadius,
  values.bushWidth,
  values.bushHeight
);
const bushMaterial = new THREE.MeshStandardMaterial({ color: 'green' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.setScalar(0.4)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)
house.add(bush1, bush2, bush3, bush4);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
