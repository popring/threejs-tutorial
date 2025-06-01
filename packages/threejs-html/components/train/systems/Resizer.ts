import { PerspectiveCamera, WebGLRenderer } from 'three';

const setSize = (
  container: HTMLElement,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
) => {
  // Set the camera's aspect ratio to match the container's proportions
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  // next, set the renderer to the same size as our container element
  renderer.setSize(container.clientWidth, container.clientHeight);
  // finally, set the pixel ratio to ensure our scene will look good on mobile devices
  renderer.setPixelRatio(window.devicePixelRatio);
};
class Resizer {
  constructor(
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    container: HTMLElement
  ) {
    setSize(container, camera, renderer);
    window.addEventListener('resize', () => {
      setSize(container, camera, renderer);
      this.onResize();
    });
  }

  onResize = () => {}
}

export { Resizer };
