import * as THREE from 'three';

// const arc = new THREE.EllipseCurve(0, 0, 100, 50);
// const pointsList = arc.getPoints(20);
const arc = new THREE.EllipseCurve(0, 0, 100, 100, 0, Math.PI / 2);
const pointsList = arc.getPoints(50);

const geometry = new THREE.BufferGeometry();
geometry.setFromPoints(pointsList);

// const material = new THREE.PointsMaterial({
//     color: 'orange',
//     size: 10,
// });
// const points = new THREE.Points(geometry, material);
// export default points;

const material = new THREE.LineBasicMaterial({
  color: 'orange',
});
const line = new THREE.Line(geometry, material);

export default line;
