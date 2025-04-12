import {
  Mesh,
  MeshStandardMaterial,
  BoxGeometry,
  MathUtils,
  TextureLoader,
} from 'three';

const createMaterial = () => {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('/assets/uv-test-bw.png');

  const material = new MeshStandardMaterial({
    // color: 'purple',
    map: texture,
  });

  return material;
};

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(2, 2, 2);

  // create a default (white) Basic material
  const material = createMaterial();

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  cube.rotation.set(-0.5, -0.1, 0.8);

  const radiansPerSecond = MathUtils.degToRad(30);

  // this method will be called once per frame
  // @ts-ignore
  cube.tick = (delta: number) => {
    // increase the cube's rotation each frame
    cube.rotation.x += radiansPerSecond * delta;
    cube.rotation.y += radiansPerSecond * delta;
    cube.rotation.z += radiansPerSecond * delta;
  };

  return cube;
}

export { createCube };
