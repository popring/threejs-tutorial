import {
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  Text,
  useGLTF,
} from '@react-three/drei';

export default function Experience() {
  const computer = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf'
  );

  return (
    <>
      <color args={['#241a1a']} attach={'background'} />

      <Environment preset='city' />

      {/* <OrbitControls makeDefault /> */}

      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={35}
            color='#ff6900'
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />

          <Text
            font='./bangers-v20-latin-regular.woff'
            fontSize={0.7}
            position={[1.5, 0.75, 0.75]}
            rotation-y={-1.25}
            color='salmon'
            maxWidth={2}
            textAlign='center'
          >
            Harry Potter
          </Text>

          <primitive object={computer.scene} position-y={-1.2}>
            <Html
              transform
              wrapperClass='htmlScreen'
              distanceFactor={1.17}
              position={[0, 1.56, -1.4]}
              rotation-x={-0.266}
            >
              <iframe src='https://bruno-simon.com/html/' />
            </Html>
          </primitive>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
