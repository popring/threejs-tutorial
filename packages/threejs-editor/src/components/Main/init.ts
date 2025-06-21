import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {
  EffectComposer,
  OutlinePass,
  RenderPass,
  ShaderPass,
  GammaCorrectionShader,
  TransformControls,
  OrbitControls,
} from 'three/examples/jsm/Addons.js';

export function init(
  dom: HTMLElement,
  data: any,
  onSelected: (obj: any) => void,
  updateMeshPositon: (name: string, position: { x: number; y: number; z: number }) => void
) {
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

  const transformControls = new TransformControls(camera, renderer.domElement);
  const transformHelper = transformControls.getHelper();
  scene.add(transformHelper);

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  transformControls.addEventListener('change', (e) => {
    console.log('e', e);
    const obj = transformControls.object;
    console.log('obj', obj);
    if (obj) {
      updateMeshPositon(obj.name, {
        x: obj.position.x,
        y: obj.position.y,
        z: obj.position.z,
      });
    }
  });
  transformControls.addEventListener('dragging-changed', (e) => {
    orbitControls.enabled = !e.value;
  });

  function render(time: number) {
    composer.render();
    transformControls.update(time);
    // renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render(0);

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

    const objs = scene.children.filter(
      (item) => item.name.startsWith('Box') || item.name.startsWith('Cylinder')
    );

    const intersections = raycaster.intersectObjects(objs);

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
      transformControls.attach(obj);
    } else {
      outlinePass.selectedObjects = [];
      onSelected(null);
      transformControls.detach();
    }
  });

  return {
    scene,
  };
}
