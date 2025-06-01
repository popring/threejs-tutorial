import { GLTF } from 'three/addons/loaders/GLTFLoader.js';

function setupModel(data: GLTF) {
  const scene = data.scene.children[0];

  return scene;
}

export { setupModel };