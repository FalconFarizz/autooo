import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const Gate = ({ position, isOpen }) => {
  const gateRef = useRef();

  useFrame(() => {
    if (gateRef.current) {
      gateRef.current.position.x = isOpen ? position[0] + 2 : position[0];
    }
  });

  return (
    <group position={position}>
      <Box ref={gateRef} args={[1, 2, 0.1]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
    </group>
  );
};

export default Gate;
