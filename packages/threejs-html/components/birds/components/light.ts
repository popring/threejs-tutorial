import { DirectionalLight, AmbientLight, HemisphereLight } from 'three';

function createLights() {
  const ambientLight = new AmbientLight('white', 1);

  const mainLight = new DirectionalLight('white', 5);
  mainLight.position.set(10, 10, 10);

  const hemisphereLight = new HemisphereLight('white', 'black', 1);

  return { mainLight, ambientLight, hemisphereLight };
}

export { createLights };
