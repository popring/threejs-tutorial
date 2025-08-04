import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';

export const CustomObject = () => {
  const geometryRef = useRef();
  const verticesCount = 10 * 3;

  const positions = useMemo(() => {
    console.log(11);
    const ps = new Float32Array(verticesCount * 3);
    for (let i = 0; i < ps.length; i++) {
      ps[i] = (Math.random() - 0.5) * 3;
    }
    return ps;
  }, [verticesCount]);

  useEffect(() => {
    const a = geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach='attributes-position'
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color='red' side={THREE.DoubleSide} />
    </mesh>
  );
};
