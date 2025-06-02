import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

// 两个三角形
// const vertices = new Float32Array([
//   0, 0, 0,
//   100, 0, 0,
//   0, 100, 0,
//   0, 0, 10,
//   0, 0, 100,
//   100, 0, 10,
// ]);

// 实现 PlaneGeometry
// const vertices = new Float32Array([
//   0, 0, 0,
//   100, 0, 0,
//   0, 100, 0,

//   0, 100, 0,
//   100, 0, 0,
//   100, 100, 0,
// ]);


const vertices = new Float32Array([
  0, 0, 0,
  100, 0, 0,
  0, 100, 0,

  // 0, 100, 0,
  // 100, 0, 0,
  100, 100, 0,
]);
const attributes = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attributes;
const indexes = new Uint16Array([0, 1, 2, 2, 1, 3]);
geometry.index = new THREE.BufferAttribute(indexes, 1);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color('orange'),
  // 线框模式
  wireframe: true,
});

console.log(geometry);

const mesh = new THREE.Mesh(geometry, material);

export default mesh;
