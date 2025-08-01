import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Timer } from 'three/addons/misc/Timer.js';
import GUI from 'lil-gui';
import { Sky } from 'three/examples/jsm/Addons.js';

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

const textureLoader = new THREE.TextureLoader();

const floorAlphaTexture = textureLoader.load('./floor/alpha.webp');
const floorColorTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp'
);
const floorARMTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp'
);
const floorNormalTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp'
);
const floorDisplacementTexture = textureLoader.load(
  './floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp'
);

floorColorTexture.repeat.set(8, 8);
floorARMTexture.repeat.set(8, 8);
floorNormalTexture.repeat.set(8, 8);
floorDisplacementTexture.repeat.set(8, 8);

floorColorTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;

floorColorTexture.wrapT = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorColorTexture.colorSpace = THREE.SRGBColorSpace;

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    alphaMap: floorAlphaTexture,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.receiveShadow = true;
scene.add(floor);

gui
  .add(floor.material, 'displacementScale')
  .min(0)
  .max(1)
  .step(0.001)
  .name('floorDisplacementScale');
gui
  .add(floor.material, 'displacementBias')
  .min(-1)
  .max(1)
  .step(0.001)
  .name('floorDisplacementBias');

const house = new THREE.Group();
scene.add(house);

// Wall
const wallColorTexture = textureLoader.load(
  './wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp'
);
const wallARMTexture = textureLoader.load(
  './wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp'
);
const wallNormalTexture = textureLoader.load(
  './wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp'
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const wall = new THREE.Mesh(
  new THREE.BoxGeometry(values.wallWidth, values.wallHeight, values.wallDepth),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);
wall.castShadow = true;
wall.receiveShadow = true;
wall.position.y += values.wallHeight / 2 + 0.01;
house.add(wall);

// Roof
const roofColorTexture = textureLoader.load(
  './roof/roof_slates_02_1k/roof_slates_02_diff_1k.jpg'
);
const roofARMTexture = textureLoader.load(
  './roof/roof_slates_02_1k/roof_slates_02_arm_1k.jpg'
);
const roofNormalTexture = textureLoader.load(
  './roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.jpg'
);
roofColorTexture.colorSpace = THREE.SRGBColorSpace;
roofColorTexture.repeat.set(3, 1);
roofColorTexture.wrapS = THREE.RepeatWrapping;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(values.roofRadius, values.roofHeight, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
  })
);
roof.position.y = values.wallHeight + values.roofHeight / 2;
roof.rotation.y = Math.PI / 4;
roof.castShadow = true;
roof.receiveShadow = true;
house.add(roof);

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg');
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load(
  './door/ambientOcclusion.jpg'
);
const doorHeightTexture = textureLoader.load('./door/height.jpg');
const doorNormalTexture = textureLoader.load('./door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg');

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(values.doorWidth, values.doorHeight, 100, 100),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
  })
);
door.position.y = values.doorHeight / 2;
door.position.z = values.wallWidth / 2 + 0.01;
house.add(door);

// Bush
const bushColorTexture = textureLoader.load(
  './bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp'
);
const bushARMTexture = textureLoader.load(
  './bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp'
);
const bushNormalTexture = textureLoader.load(
  './bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp'
);
bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;

const bushGeometry = new THREE.SphereGeometry(
  values.bushRadius,
  values.bushWidth,
  values.bushHeight
);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: '#ccffcc',
  map: bushColorTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.setScalar(0.4);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

// Grave
const graveColorTexture = textureLoader.load(
  './grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp'
);
const graveARMTexture = textureLoader.load(
  './grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp'
);
const graveNormalTexture = textureLoader.load(
  './grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp'
);

graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

graveColorTexture.wrapS = THREE.RepeatWrapping;
graveARMTexture.wrapS = THREE.RepeatWrapping;
graveNormalTexture.wrapS = THREE.RepeatWrapping;

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});
const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  const radius = 3 + Math.random() * 4;
  const angle = Math.random() * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  grave.position.x = x;
  grave.position.z = z;
  grave.position.y = Math.random() * 0.4;
  grave.castShadow = true;
  grave.receiveShadow = true;

  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

// TODO:
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.257);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1.5);
directionalLight.position.set(3, 2, -8);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(256, 256);
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

scene.add(directionalLight);

const doorLight = new THREE.PointLight('#ff7d46', 5);
doorLight.position.set(0, 2.2, 2.5);
scene.add(doorLight);

/**
 * Ghosts
 */
const ghost1 = new THREE.PointLight('#8800ff', 6);
const ghost2 = new THREE.PointLight('#ff0088', 6);
const ghost3 = new THREE.PointLight('#ff0000', 6);
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;
scene.add(ghost1, ghost2, ghost3);

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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y =
    Math.sin(ghost1Angle) *
    Math.sin(ghost1Angle * 2.34) *
    Math.sin(ghost1Angle * 3.45);

  const ghost2Angle = -elapsedTime * 0.38;
  ghost2.position.x = Math.cos(ghost2Angle) * 5;
  ghost2.position.z = Math.sin(ghost2Angle) * 5;
  ghost2.position.y =
    Math.sin(ghost2Angle) *
    Math.sin(ghost2Angle * 2.34) *
    Math.sin(ghost2Angle * 3.45);

  const ghost3Angle = elapsedTime * 0.23;
  ghost3.position.x = Math.cos(ghost3Angle) * 6;
  ghost3.position.z = Math.sin(ghost3Angle) * 6;
  ghost3.position.y =
    Math.sin(ghost3Angle) *
    Math.sin(ghost3Angle * 2.34) *
    Math.sin(ghost3Angle * 3.45);

  ghost1.shadow.mapSize.width = 256;
  ghost1.shadow.mapSize.height = 256;
  ghost1.shadow.camera.far = 10;

  ghost2.shadow.mapSize.width = 256;
  ghost2.shadow.mapSize.height = 256;
  ghost2.shadow.camera.far = 10;

  ghost3.shadow.mapSize.width = 256;
  ghost3.shadow.mapSize.height = 256;
  ghost3.shadow.camera.far = 10;

  const sky = new Sky();
  sky.scale.setScalar(100);
  sky.material.uniforms['turbidity'].value = 10;
  sky.material.uniforms['rayleigh'].value = 3;
  sky.material.uniforms['mieCoefficient'].value = 0.1;
  sky.material.uniforms['mieDirectionalG'].value = 0.95;
  sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95);
  scene.add(sky);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
