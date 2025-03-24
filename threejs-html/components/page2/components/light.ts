import { DirectionalLight } from 'three';

function createLight() {
  const light = new DirectionalLight('white', 9);

  light.position.set(10, 10, 10);

  return light;
}

export { createLight };
