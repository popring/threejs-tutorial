import { createScene } from '../components/scene';
import { createCamera } from '../components/camera';
import { createRenderer } from '../systems/renderer';
import { createCube } from '../components/cube';
import { Scene, WebGLRenderer, PerspectiveCamera, Mesh } from 'three';
import { Resizer } from '../systems/Resizer';
import { createLight } from '../components/light';
class World {
  private container: HTMLElement;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;

  // 1. Create an instance of the World app
  constructor(container) {
    this.container = container;
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    container.append(this.renderer.domElement);

    const cube = createCube();
    const light = createLight();
    this.scene.add(cube, light);

    const resizer = new Resizer(this.camera, this.renderer, this.container);
  }

  // 2. Render the scene
  render() {
    this.renderer.render(this.scene, this.camera);
  }
}

export { World };
