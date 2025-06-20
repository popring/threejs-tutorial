import { useEffect, useRef } from 'react';
import { init } from './init';
import { useThreeStore } from '../../store';
import * as THREE from 'three';

function Main() {
  const { data } = useThreeStore();
  const sceneRef = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    const dom = document.getElementById('canvas-container')!;
    const { scene } = init(dom);
    sceneRef.current = scene;

    return () => {
      dom.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    data.meshArr.forEach((item) => {
      if (item.type === "Box") {
        const {
          width,
          height,
          depth,
          material: { color },
          position,
        } = item.props;
        let mesh = scene.getObjectByName(item.name);

        if (!mesh) {
          const geometry = new THREE.BoxGeometry(width, height, depth);
          const material = new THREE.MeshPhongMaterial({
            color,
          });
          mesh = new THREE.Mesh(geometry, material);
        }

        mesh.name = item.name;
        mesh.position.copy(position);
        scene.add(mesh);
      } else if (item.type === "Cylinder") {
        const {
          radiusTop,
          radiusBottom,
          height,
          material: { color },
          position,
        } = item.props;
        let mesh = scene.getObjectByName(item.name);

        if (!mesh) {
          const geometry = new THREE.CylinderGeometry(
            radiusTop,
            radiusBottom,
            height
          );
          const material = new THREE.MeshPhongMaterial({
            color,
          });
          mesh = new THREE.Mesh(geometry, material);
        }
        mesh.name = item.name;
        mesh.position.copy(position);
        scene.add(mesh);
      }
    });
  }, [data]);

  return <div id='canvas-container' className='Main'></div>;
}

export default Main;
