import React from 'react';
import { Box } from '@react-three/drei';

const TV = ({ position, isOn }) => {
  const screenColor = isOn ? '#00ff00' : '#000000';

  return (
    <group position={position}>
      <Box args={[1, 0.6, 0.1]}>
        <meshStandardMaterial color="#333333" />
      </Box>
      <Box args={[0.8, 0.4, 0.05]} position={[0, 0, 0.06]}>
        <meshStandardMaterial color={screenColor} emissive={screenColor} />
      </Box>
    </group>
  );
};

export default TV;
