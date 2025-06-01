import { GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';

function setupModel(data: GLTF) {
  const model = data.scene.children[0];
  const clip = data.animations[0];

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();

  // @ts-ignore
  model.tick = (delta: number) => {
    mixer.update(delta);
  };

  return model;
}

export { setupModel };