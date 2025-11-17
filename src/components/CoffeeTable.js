import React from 'react';
import { Box, Cylinder } from '@react-three/drei';

const CoffeeTable = ({ position }) => {
  return (
    <group position={position}>
      {/* Table top */}
      <Box args={[1.5, 0.1, 0.8]} position={[0, 0.45, 0]}>
        <meshStandardMaterial color="#8B4513" roughness={0.3} />
      </Box>
      {/* Table legs */}
      <Cylinder args={[0.05, 0.05, 0.4]} position={[-0.6, 0.2, -0.3]}>
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.4]} position={[0.6, 0.2, -0.3]}>
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.4]} position={[-0.6, 0.2, 0.3]}>
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </Cylinder>
      <Cylinder args={[0.05, 0.05, 0.4]} position={[0.6, 0.2, 0.3]}>
        <meshStandardMaterial color="#654321" roughness={0.6} />
      </Cylinder>
      {/* Decorative items */}
      <Box args={[0.1, 0.15, 0.1]} position={[-0.3, 0.55, 0]}>
        <meshStandardMaterial color="#FFD700" roughness={0.2} />
      </Box>
      <Cylinder args={[0.08, 0.08, 0.2]} position={[0.2, 0.55, 0.1]}>
        <meshStandardMaterial color="#FF6B6B" roughness={0.4} />
      </Cylinder>
    </group>
  );
};

export default CoffeeTable;
