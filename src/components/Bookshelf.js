import React from 'react';
import { Box } from '@react-three/drei';

const Bookshelf = ({ position }) => {
  return (
    <group position={position}>
      {/* Main bookshelf structure */}
      <Box args={[2.0, 2.2, 0.3]} position={[0, 1.1, 0]}>
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </Box>
      {/* Side panels */}
      <Box args={[0.1, 2.2, 0.3]} position={[-0.95, 1.1, 0]}>
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </Box>
      <Box args={[0.1, 2.2, 0.3]} position={[0.95, 1.1, 0]}>
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </Box>
      {/* Shelves */}
      <Box args={[1.8, 0.05, 0.25]} position={[0, 0.4, 0.025]}>
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </Box>
      <Box args={[1.8, 0.05, 0.25]} position={[0, 1.0, 0.025]}>
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </Box>
      <Box args={[1.8, 0.05, 0.25]} position={[0, 1.6, 0.025]}>
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </Box>
      {/* Books */}
      <Box args={[0.15, 0.25, 0.2]} position={[-0.7, 0.45, 0.15]}>
        <meshStandardMaterial color="#FF0000" roughness={0.8} />
      </Box>
      <Box args={[0.12, 0.3, 0.18]} position={[-0.5, 0.45, 0.15]}>
        <meshStandardMaterial color="#00FF00" roughness={0.8} />
      </Box>
      <Box args={[0.18, 0.28, 0.19]} position={[-0.2, 0.45, 0.15]}>
        <meshStandardMaterial color="#0000FF" roughness={0.8} />
      </Box>
      <Box args={[0.14, 0.26, 0.17]} position={[0.1, 0.45, 0.15]}>
        <meshStandardMaterial color="#FFFF00" roughness={0.8} />
      </Box>
      <Box args={[0.16, 0.24, 0.18]} position={[0.4, 0.45, 0.15]}>
        <meshStandardMaterial color="#FF00FF" roughness={0.8} />
      </Box>
      <Box args={[0.13, 0.27, 0.16]} position={[0.7, 0.45, 0.15]}>
        <meshStandardMaterial color="#00FFFF" roughness={0.8} />
      </Box>
      {/* Decorative items */}
      <Box args={[0.2, 0.3, 0.15]} position={[-0.6, 1.05, 0.15]}>
        <meshStandardMaterial color="#FFD700" roughness={0.3} />
      </Box>
      <Box args={[0.15, 0.2, 0.12]} position={[0.5, 1.05, 0.15]}>
        <meshStandardMaterial color="#C0C0C0" roughness={0.2} />
      </Box>
    </group>
  );
};

export default Bookshelf;
