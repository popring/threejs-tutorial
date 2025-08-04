import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import { Experience } from './Experience';
import { CustomObject } from './CustomObject';
import * as THREE from 'three';

const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(
  <Canvas
    // dpr={[1, 2]}
    // orthographic
    gl={{
      antialias: true,
      toneMapping: THREE.CineonToneMapping,
      // toneMapping: THREE.ACESFilmicToneMapping
      outputColorSpace: THREE.LinearSRGBColorSpace,
    }}
    camera={{
      fov: 70,
      near: 0.1,
      far: 100,
      position: [3, 2, 6],
      // zoom: 100
    }}
  >
    <Experience />
    <CustomObject />
  </Canvas>
);
