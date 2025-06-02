import * as THREE from 'three';

// 自带 PlaneGeometry

const geometry = new THREE.PlaneGeometry(100, 100);
const material = new THREE.MeshBasicMaterial(({
    color: new THREE.Color('orange')
}));
const mesh = new THREE.Mesh(geometry, material);

console.log(mesh);

export default mesh;
