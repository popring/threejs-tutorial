import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import { useEffect, useState, useRef } from 'react';

export default function Experience() {
  const [matcapTexture] = useMatcapTexture('936451_C29A8F_5F3A2B_361D14', 256);
  const [matcapTextureText] = useMatcapTexture(
    '7B7E82_343536_A0B1C8_44444C',
    256
  );

  const torusGeometry = useRef();
  const torusMaterial = useRef();
  const donutGroup = useRef();

  const [donuts, setDonuts] = useState([]);

  useEffect(() => {
    setDonuts([...new Array(100)]);
  }, []);

  useFrame((state, delta) => {
    for (const donut of donutGroup.current.children) {
      donut.rotation.y += delta * 0.5;
    }
    donutGroup.current.rotation.y += delta * 0.03;
  });

  return (
    <>
      <Perf position='top-left' />

      <OrbitControls makeDefault />

      <torusGeometry ref={torusGeometry} />
      <meshMatcapMaterial ref={torusMaterial} matcap={matcapTexture} />

      <Center>
        <Text3D
          font='./fonts/helvetiker_regular.typeface.json'
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello World
          {/* <meshNormalMaterial /> */}
          <meshMatcapMaterial matcap={matcapTextureText} />
        </Text3D>
      </Center>

      <group ref={donutGroup}>
        {donuts.map((donut, index) => (
          <mesh
            key={index}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            geometry={torusGeometry.current}
            material={torusMaterial.current}
          ></mesh>
        ))}
      </group>
    </>
  );
}
