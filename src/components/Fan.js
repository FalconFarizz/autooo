import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder } from '@react-three/drei';

const Fan = ({ position, isOn }) => {
  const fanRef = useRef();

  useFrame((state, delta) => {
    if (isOn && fanRef.current) {
      fanRef.current.rotation.z += delta * 10;
    }
  });

  return (
    <group position={position}>
      <Cylinder ref={fanRef} args={[0.5, 0.5, 0.1, 8]}>
        <meshStandardMaterial color="#888888" />
      </Cylinder>
    </group>
  );
};

export default Fan;
