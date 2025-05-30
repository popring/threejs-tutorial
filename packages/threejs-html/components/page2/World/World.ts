import { createScene } from '../components/scene';
import { createCamera } from '../components/camera';
import { createRenderer } from '../systems/renderer';
import { createCube } from '../components/cube';
import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Mesh,
  MathUtils,
} from 'three';
import { Resizer } from '../systems/Resizer';
import { createLights } from '../components/light';
import { Loop } from '../systems/Loop';
import { createControls } from '../systems/controls';
class World {
  private container: HTMLElement;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private loop: Loop;
  // 1. Create an instance of the World app
  constructor(container) {
    this.container = container;
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);
    container.append(this.renderer.domElement);

    const controls = createControls(this.camera, this.renderer.domElement);
    controls.addEventListener('change', () => {
      this.render();
    });

    const cube = createCube();
    const { mainLight, ambientLight } = createLights();

    this.loop.updateables.push(controls);

    this.scene.add(ambientLight, mainLight, cube);

    const resizer = new Resizer(this.camera, this.renderer, this.container);
    resizer.onResize = () => {
      this.render();
    };
  }

  // 2. Render the scene
  render() {
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }
}

export { World };
