import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
    50, // fov = Field Of View
    1, // aspect ratio (dummy value)
    0.1, // near clipping plane
    100, // far clipping plane
  );

  // move the camera back so we can view the scene
  camera.position.set(-5, 5, 10);

  return camera;
}

export { createCamera };