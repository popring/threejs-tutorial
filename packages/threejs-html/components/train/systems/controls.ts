import { PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const createControls = (
  camera: PerspectiveCamera,
  canvas: HTMLCanvasElement
) => {
  const controls = new OrbitControls(camera, canvas);
  // controls.target.set(2, 1, 1);
  // controls.update();

  controls.enableDamping = true;
  controls.target.y = 1


  // @ts-ignore
  controls.tick = () => controls.update();

  controls.listenToKeyEvents(window);

  controls.autoRotate = true;
  controls.autoRotateSpeed = 3;

  controls.minDistance = 5;
  controls.maxDistance = 20;

  return controls;
};

export { createControls };
