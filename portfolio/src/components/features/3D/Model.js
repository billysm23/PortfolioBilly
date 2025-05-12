import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';

const Model = () => {
  const mesh = useRef();
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0075;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial 
        color="#7000ff" 
        metalness={0.9} 
        roughness={0.1} 
      />
    </mesh>
  );
};

export default Model;