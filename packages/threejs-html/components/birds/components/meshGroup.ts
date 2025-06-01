import {
  SphereGeometry,
  Mesh,
  Group,
  MeshStandardMaterial,
  ConeGeometry,
  DodecahedronGeometry,
  RingGeometry,
  MathUtils,
} from 'three';

function createMeshGroup() {
  const group = new Group();

  const geometry = new SphereGeometry(0.25, 16, 16);
  // const geometry = new ConeGeometry(0.25, 1, 16, 1, false, 0, Math.PI * 2);
  // const geometry = new DodecahedronGeometry(0.3, 0);
  // const geometry = new RingGeometry(0.1, 0.2, 32);

  const material = new MeshStandardMaterial({
    color: 'indigo',
  });

  const protoSphere = new Mesh(geometry, material);

  group.add(protoSphere);

  for (let i = 0; i < 1; i += 0.1) {
    const sphere = protoSphere.clone();

    sphere.position.x = Math.cos(2 * Math.PI * i);
    sphere.position.y = Math.sin(2 * Math.PI * i);

    sphere.scale.multiplyScalar(0.01 + i);

    group.add(sphere);
  }

  group.scale.multiplyScalar(2);

  const radiansPerSecond = MathUtils.degToRad(30);

  // @ts-ignore
  group.tick = (delta: number) => {
    group.rotation.z += delta * radiansPerSecond;
  };

  return group;
}

export { createMeshGroup };
