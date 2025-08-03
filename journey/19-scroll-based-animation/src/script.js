import * as THREE from 'three';
import GUI from 'lil-gui';
import gsap from 'gsap';

/**
 * Debug
 */
const gui = new GUI();

const parameters = {
  materialColor: '#ffeded',
};
const objectDistance = 4;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({ color: '#ff0000' })
// );
// scene.add(cube);

const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load('textures/gradients/3.jpg');
gradientTexture.magFilter = THREE.NearestFilter;

const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
});

const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material
);
mesh1.position.x = 1.5;
mesh2.position.x = -1.5;
mesh3.position.x = 1.5;

mesh1.position.y = -objectDistance * 0;
mesh1.scale.setScalar(0.5);

mesh2.position.y = -objectDistance * 1;

mesh3.position.y = -objectDistance * 2;
mesh3.scale.setScalar(0.5);

const sectionMeshes = [mesh1, mesh2, mesh3];
scene.add(...sectionMeshes);

gui.addColor(parameters, 'materialColor').onChange(() => {
  material.color.set(parameters.materialColor);
  particlesMaterial.color.set(parameters.materialColor);
});

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

gui.add(directionalLight.position, 'x').min(-10).max(10).step(1);
gui.add(directionalLight.position, 'y').min(-10).max(10).step(1);
gui.add(directionalLight.position, 'z').min(-10).max(10).step(1);

const particlesCount = 200;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] =
    objectDistance * 0.5 -
    Math.random() * objectDistance * sectionMeshes.length;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}
const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  color: parameters.materialColor,
  sizeAttenuation: true,
  size: 0.03,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

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

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

let scrollY = 0;
let currentSection = 0;

window.addEventListener('scroll', (e) => {
  scrollY = window.scrollY;

  const newSection = Math.round((scrollY / sizes.height + 0.2));
  if (newSection !== currentSection) {
    currentSection = newSection;
    // console.log('change section', currentSection)
    gsap.to(sectionMeshes[currentSection].rotation, {
      duration: 1.5,
      ease: 'power2.inOut',
      x: '+=6',
      y: '+=3',
      z: '+=1.5',
    });

    // gsap.fromTo(
    //   sectionMeshes[currentSection].scale,
    //   {
    //     duration: 1.5,
    //     ease: 'power1.in',
    //     x: 1.5,
    //     y: 1.5,
    //     z: 1.5,
    //   },
    //   {
    //     duration: 1,
    //     ease: 'power1.out',
    //     x: 0.5,
    //     y: 0.5,
    //     z: 0.5,
    //   }
    // );

    // gsap.from(
    //   sectionMeshes[currentSection].position,
    //   {
    //     duration: 1,
    //     ease: 'power1.in',
    //     x: currentSection % 2 == 0 ? 3 : -6,
    //     // y: 1.5,
    //     // z: 1.5,
    //   }
    // );
  }
});

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  for (const mesh of sectionMeshes) {
    mesh.rotation.x += deltaTime * 0.5;
    mesh.rotation.y += deltaTime * 0.7;
  }

  camera.position.y = (-scrollY / sizes.height) * objectDistance;

  const parallaxX = cursor.x * 0.5;
  const parallaxY = -cursor.y * 0.5;
  cameraGroup.position.x +=
    (parallaxX - cameraGroup.position.x) * 5 * deltaTime;
  cameraGroup.position.y +=
    (parallaxY - cameraGroup.position.y) * 5 * deltaTime;

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
