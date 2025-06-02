import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

{
    const geometry = new THREE.BoxGeometry(100, 100, 100);
    const material = new THREE.MeshLambertMaterial(({
        color: new THREE.Color('orange')
    }));
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    scene.add(mesh);
}

{
    const pointLight = new THREE.PointLight(0xffffff, 10000);
    pointLight.position.set(80, 80, 80);
    scene.add(pointLight);
}

{
  const axesHelper = new THREE.AxesHelper(200);
  scene.add(axesHelper);
}

{
    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.set(200, 200, 200);
    camera.lookAt(20, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height)

    function render() {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    // 循环调用render函数，实现可交互效果
    render();

    document.body.append(renderer.domElement);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);

}
