import { createScene } from '../components/scene';
import { createCamera } from '../components/camera';
import { createRenderer } from '../systems/renderer';
import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';
import { Resizer } from '../systems/Resizer';
import { createLights } from '../components/light';
import { Loop } from '../systems/Loop';
import { createControls } from '../systems/controls';
import { Train } from '../components/Train/Train';

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

    const { mainLight, ambientLight } = createLights();
    const train = new Train();

    this.loop.updateables.push(controls, train);

    this.scene.add(ambientLight, mainLight, train);

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
