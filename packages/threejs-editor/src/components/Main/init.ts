import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  EffectComposer,
  OutlinePass,
  RenderPass,
  ShaderPass,
  GammaCorrectionShader,
} from 'three/examples/jsm/Addons.js';

export function init(dom: HTMLElement, data: any, onSelected: (obj: any) => void) {
  const scene = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper(500);
  scene.add(axesHelper);

  const directionalLight = new THREE.DirectionalLight(0xffffff);
  directionalLight.position.set(500, 500, 500);
  scene.add(directionalLight);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const width = 1000;
  const height = window.innerHeight - 60;

  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
  camera.position.set(500, 500, 500);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(width, height);
  scene.add(camera);

  const gridHelper = new THREE.GridHelper(1000);
  scene.add(gridHelper);

  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  const v = new THREE.Vector2(window.innerWidth, window.innerHeight);
  const outlinePass = new OutlinePass(v, scene, camera);
  outlinePass.pulsePeriod = 1;
  composer.addPass(outlinePass);

  const gammaPass = new ShaderPass(GammaCorrectionShader);
  composer.addPass(gammaPass);

  function render() {
    composer.render();
    // renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();

  dom.append(renderer.domElement);

  window.addEventListener('resize', () => {
    const width = 1000;
    const height = window.innerHeight - 60;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  renderer.domElement.addEventListener('click', (e) => {
    const y = -((e.offsetY / height) * 2 - 1);
    const x = (e.offsetX / width) * 2 - 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const intersections = raycaster.intersectObjects(scene.children);

    if (intersections.length > 0) {
      const obj = intersections[0].object;
      // if (obj instanceof THREE.Mesh) {
      //   const material = obj.material as THREE.MeshStandardMaterial;
      //   if (material.color) {
      //     material.color.set('green');
      //   }
      // }
      outlinePass.selectedObjects = [obj];
      onSelected(obj);
    } else {
      outlinePass.selectedObjects = [];
      onSelected(null);
    }
  });

  new OrbitControls(camera, renderer.domElement);

  return {
    scene,
  };
}
