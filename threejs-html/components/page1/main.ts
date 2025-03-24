import {
  // BoxBufferGeometry,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxGeometry,
} from 'three';

// Get a reference to the container element that will hold our scene
const container = document.querySelector('#scene-container') as HTMLDivElement;
// create a Scene
const scene = new Scene();
// Set the background color
scene.background = new Color('skyblue');
// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(0, 0, 10);

// create a geometry
const geometry = new BoxGeometry();

// create a default (white) Basic material
const material = new MeshBasicMaterial();

const cube = new Mesh(geometry, material);
scene.add(cube);

const renderer = new WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);;
container.appendChild(renderer.domElement);
renderer.render(scene, camera);