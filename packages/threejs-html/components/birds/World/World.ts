import { createScene } from '../components/scene';
import { createCamera } from '../components/camera';
import { createRenderer } from '../systems/renderer';
import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';
import { Resizer } from '../systems/Resizer';
import { createLights } from '../components/light';
import { Loop } from '../systems/Loop';
import { createControls } from '../systems/controls';
import { loadBirds } from '../components/birds/birds';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

class World {
  private container: HTMLElement;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private loop: Loop;
  private controls: OrbitControls;


  // 1. Create an instance of the World app
  constructor(container) {
    this.container = container;
    this.camera = createCamera();
    this.scene = createScene();
    this.renderer = createRenderer();
    this.loop = new Loop(this.camera, this.scene, this.renderer);


    container.append(this.renderer.domElement);

    this.controls = createControls(this.camera, this.renderer.domElement);
    this.controls.addEventListener('change', () => {
      this.render();
    });

    const { mainLight, ambientLight } = createLights();

    this.loop.updateables.push(this.controls);

    this.scene.add(ambientLight, mainLight);

    const resizer = new Resizer(this.camera, this.renderer, this.container);
    resizer.onResize = () => {
      this.render();
    };
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds();

    this.controls.target.copy(parrot.position);
    this.scene.add(parrot, flamingo, stork);
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
