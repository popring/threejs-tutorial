import { useGLTF, useAnimations } from '@react-three/drei';
import { useControls } from 'leva';
import { useEffect } from 'react';

useGLTF.preload('./Fox/glTF/Fox.gltf');

export default function Fox(props) {
  const fox = useGLTF('./Fox/glTF/Fox.gltf');
  const animations = useAnimations(fox.animations, fox.scene);
  const { animation } = useControls({
    animation: {
      value: 'Walk',
      options: ['Walk', 'Run', 'Survey'],
    },
  });
  console.log(animations);
  useEffect(() => {
    animations.actions[animation].reset().fadeIn(0.5).play();
    return () => {
      animations.actions[animation].fadeOut(0.5);
    };
  }, [animation]);
  return (
    <primitive
      object={fox.scene}
      {...props}
      scale={0.02}
      position={[-2.5, 0, 2.5]}
      rotation-y={0.3}
    />
  );
}
