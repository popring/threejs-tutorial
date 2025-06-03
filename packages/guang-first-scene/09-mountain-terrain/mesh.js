import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

const geometry = new THREE.PlaneGeometry(3000, 3000, 300, 300);

const material = new THREE.MeshBasicMaterial({
  color: new THREE.Color('orange'),
  wireframe: true,
});

const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(-Math.PI / 2);

console.log(mesh);

function updatePosition() {
  const position = geometry.attributes.position;

  for (let i = 0; i < position.count; i++) {
    const x = position.getX(i);
    const y = position.getY(i);

    // 使用噪声函数生成联系的伪随机值
    const z = noise2D(x / 300, y / 300) * 50;

    // 添加随时间变化的正弦波动
    // Date.now()*0.002 控制波动速度
    // x*0.05 使不同位置的顶点有不同的相位
    // 乘以10来控制波动的幅度
    const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;

    // 将基础地形高度和波动叠加，设置为顶点的z坐标
    position.setZ(i, z + sinNum);
  }

  position.needsUpdate = true;
}

export { updatePosition };

export default mesh;
