import React from 'react';
import { Sphere } from '@react-three/drei';

const Light = ({ position, isOn }) => {
  const emissiveColor = isOn ? '#ffff00' : '#000000';
  const intensity = isOn ? 1 : 0;

  return (
    <group position={position}>
      <Sphere args={[0.1, 16, 16]}>
        <meshStandardMaterial color="#ffff00" emissive={emissiveColor} />
      </Sphere>
      <pointLight intensity={intensity} color="#ffff00" />
    </group>
  );
};

export default Light;
