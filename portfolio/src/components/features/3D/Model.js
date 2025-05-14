import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { useTheme } from '../../../context/ThemeContext';

const Model = () => {
  const mesh = useRef();
  const { isDark } = useTheme();
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.0075;
    }
  });
  
  if (!isDark) return null;

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshStandardMaterial 
        color={isDark ? "#7000ff" : "#50B9DC"}
        metalness={0.9} 
        roughness={0.1} 
        emissive={isDark ? "#7000ff" : "#50B9DC"} 
        emissiveIntensity={isDark ? 0 : 0.99}
      />
    </mesh>
  );
};

export default Model;