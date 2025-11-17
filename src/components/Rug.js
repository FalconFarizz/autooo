import React from 'react';
import { Cylinder } from '@react-three/drei';

const Rug = ({ position }) => {
  return (
    <group position={position}>
      {/* Main rug */}
      <Cylinder args={[2.5, 2.5, 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </Cylinder>
      {/* Rug pattern - decorative border */}
      <Cylinder args={[2.3, 2.3, 0.06]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#654321" roughness={0.8} />
      </Cylinder>
      {/* Inner pattern */}
      <Cylinder args={[2.0, 2.0, 0.07]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#A0522D" roughness={0.7} />
      </Cylinder>
    </group>
  );
};

export default Rug;
