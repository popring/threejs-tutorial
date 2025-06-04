import * as THREE from 'three';

const loader = new THREE.TextureLoader();
const texture = loader.load('./zhuan.png');
// 设置纹理水平方向重复方式
texture.wrapS = THREE.RepeatWrapping;
// 设置纹理垂直方向重复方式
texture.wrapT = THREE.RepeatWrapping;
// 设置纹理重复次数
texture.repeat.set(3, 3);
// 设置纹理颜色空间
texture.colorSpace = THREE.SRGBColorSpace;


const geometry = new THREE.PlaneGeometry(1000, 1000);

const material = new THREE.MeshBasicMaterial({
  map: texture,
  aoMap: texture,
});

const mesh = new THREE.Mesh(geometry, material);

export default mesh;