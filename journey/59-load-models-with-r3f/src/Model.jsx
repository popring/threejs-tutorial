import { useGLTF } from '@react-three/drei';

useGLTF.preload("./FlightHelmet/glTF/FlightHelmet.gltf")

export default function Model() {
  // const model = useGLTF("./hamburger.glb")
  // const model = useGLTF("./hamburger-draco.glb")
  const model = useGLTF('./FlightHelmet/glTF/FlightHelmet.gltf');
  return <primitive object={model.scene} scale={5} position-y={-1} />;
}
