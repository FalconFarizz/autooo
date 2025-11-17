import React from 'react';
import { Box } from '@react-three/drei';

const Sofa = ({ position }) => {
  return (
    <group position={position}>
      {/* Sofa base */}
      <Box args={[2.5, 0.8, 1.2]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </Box>
      {/* Sofa backrest */}
      <Box args={[2.5, 1.2, 0.3]} position={[0, 1.0, -0.45]}>
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </Box>
      {/* Left armrest */}
      <Box args={[0.3, 0.8, 1.2]} position={[-1.1, 0.8, 0]}>
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </Box>
      {/* Right armrest */}
      <Box args={[0.3, 0.8, 1.2]} position={[1.1, 0.8, 0]}>
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </Box>
      {/* Seat cushions */}
      <Box args={[2.1, 0.2, 1.0]} position={[0, 0.7, 0.1]}>
        <meshStandardMaterial color="#654321" roughness={0.9} />
      </Box>
    </group>
  );
};

export default Sofa;
