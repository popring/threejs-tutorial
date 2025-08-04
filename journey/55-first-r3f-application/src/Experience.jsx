import { useFrame, extend, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

extend({ OrbitControls });

export const Experience = () => {
  const cubeRef = useRef();
  const groupRef = useRef();
  // const { camera, gl } = useThree();

  // console.log("camera", camera, "gl", gl)

  useFrame((state, delta) => {
    // cubeRef.current.rotation.y += delta;
    // groupRef.current.rotation.y += delta;
    const angle = state.clock.elapsedTime;
    state.camera.position.x = Math.sin(angle) * 6;
    state.camera.position.z = Math.cos(angle) * 6;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    // <mesh scale={3} position-x={[2, 0, 0]}>
    //   {/* <torusKnotGeometry /> */}
    //   {/* <meshNormalMaterial /> */}
    //   {/* <sphereGeometry args={[ 1.5, 32,32]} /> */}
    //   <boxGeometry />
    //   <meshStandardMaterial color='mediumpurple' />
    // </mesh>

    <>
      <directionalLight position={[1, 2, 3]} intensity={4.5} />

      <ambientLight intensity={1} />

      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color='orange' />
        </mesh>

        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color='mediumpurple' />
        </mesh>
      </group>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color='greenyellow' />
      </mesh>

      {/* <orbitControls args={[camera, gl.domElement]} /> */}
    </>
  );
};
