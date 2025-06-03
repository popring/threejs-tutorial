import * as THREE from 'three';

const geometry = new THREE.BufferGeometry();

const vertices = new Float32Array([
  0, 0, 0,
  100, 0, 0,
  0, 100, 0,
  0, 0, 100,
  100, 100, 0,
]);

const attributes = new THREE.BufferAttribute(vertices, 3);
geometry.setAttribute('position', attributes);

const material = new THREE.PointsMaterial({
  size: 10,
  color: 'orange',
});

const points = new THREE.Points(geometry, material);

export default points;
