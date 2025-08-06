import { useThree } from '@react-three/fiber';
import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
  Text,
  Float,
  MeshReflectorMaterial,
} from '@react-three/drei';
import { useRef } from 'react';

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();

  return (
    <>
      <OrbitControls enableDamping={false} makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <PivotControls
        anchor={[0, 0, 0]}
        depthTest={false}
        visible={false}
        // lineWidth={4}
        // axisColors={['#9381ff', '#ff4d6d', '#7ae582']}
        // scale={100}
        // fixed={true}
      >
        <mesh position-x={-2} ref={sphere}>
          <sphereGeometry />
          <meshStandardMaterial color='orange' />
          {/* <Html
            visible={false}
            position={[1, 1, 0]}
            distanceFactor={8}
            occlude={[sphere]}
            center
            wrapperClass='label'
          >
            That's a sphere
          </Html> */}
        </mesh>
      </PivotControls>

      <mesh position-x={2} scale={1.5} ref={cube}>
        <boxGeometry />
        <meshStandardMaterial color='mediumpurple' />
      </mesh>
      {/* <TransformControls visible={false} object={cube} mode='translate' /> */}

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          color='greenyellow'
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
        />
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text
          position={[0, 2, 2]}
          color='salmon'
          fontSize={3}
          font='./bangers-v20-latin-regular.woff'
          textAlign='center'
          maxWidth={10}
        >
          I Love R3F
          <meshNormalMaterial />
        </Text>
      </Float>
    </>
  );
}
