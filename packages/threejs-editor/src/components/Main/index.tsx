import { useEffect, useRef, useState } from 'react';
import { init } from './init';
import { useThreeStore } from '../../store';
import { FloatButton } from 'antd';
import {
  ArrowsAltOutlined,
  DragOutlined,
  RetweetOutlined,
} from '@ant-design/icons';

import * as THREE from 'three';
import type { TransformControlsMode } from 'three/examples/jsm/Addons.js';

function Main() {
  const { data, setSelectedObj, selectedObj, removeObj, updateMeshInfo } =
    useThreeStore();
  const sceneRef = useRef<THREE.Scene | null>(null);
  const transformControlsModeRef =
    useRef<(mode: TransformControlsMode) => void>(null);
  const [mode, setMode] = useState<'translate' | 'rotate' | 'scale'>(
    'translate'
  );

  const seControlMode = (mode: TransformControlsMode) => {
    transformControlsModeRef.current?.(mode);
    setMode(mode);
  };

  const onSelected = (obj: any) => {
    setSelectedObj(obj);
  };

  useEffect(() => {
    const dom = document.getElementById('canvas-container')!;
    const { scene, setTransformControlsMode } = init(
      dom,
      data,
      onSelected,
      updateMeshInfo,
    );
    transformControlsModeRef.current = setTransformControlsMode;
    sceneRef.current = scene;

    return () => {
      dom.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    data.meshArr.forEach((item) => {
      if (item.type === 'Box') {
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
      } else if (item.type === 'Cylinder') {
        const {
          radiusTop,
          radiusBottom,
          height,
          material: { color },
          position,
          scale,
          rotation,
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
        mesh.scale.copy(scale!);
        mesh.rotation.x = rotation?.x ?? 0;
        mesh.rotation.y = rotation?.y ?? 0;
        mesh.rotation.z = rotation?.z ?? 0;
        scene.add(mesh);
      }
    });
  }, [data]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        sceneRef.current?.remove(selectedObj);
        removeObj(selectedObj.name);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [removeObj, selectedObj]);

  return (
    <div className='Main'>
      <div id='canvas-container'></div>
      <FloatButton.Group className='btn-group'>
        <FloatButton
          icon={<DragOutlined />}
          onClick={() => seControlMode('translate')}
          type={mode === 'translate' ? 'primary' : 'default'}
        />
        <FloatButton
          icon={<RetweetOutlined />}
          onClick={() => seControlMode('rotate')}
          type={mode === 'rotate' ? 'primary' : 'default'}
        />
        <FloatButton
          icon={<ArrowsAltOutlined />}
          onClick={() => seControlMode('scale')}
          type={mode === 'scale' ? 'primary' : 'default'}
        />
      </FloatButton.Group>
    </div>
  );
}

export default Main;
