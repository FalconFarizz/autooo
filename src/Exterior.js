import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sky, OrbitControls } from '@react-three/drei';

function House() {
  return (
    <group>
      {/* Main walls - larger */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[10, 4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Second story */}
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[10, 3, 8]} />
        <meshStandardMaterial color="#f8f8f8" />
      </mesh>
      {/* Garage extension */}
      <mesh position={[5.5, 2, 0]}>
        <boxGeometry args={[3, 4, 5]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      {/* Roof - larger */}
      <mesh position={[0, 6.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[7, 3, 4]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>
      {/* Garage roof */}
      <mesh position={[5.5, 6.5, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.5, 2, 4]} />
        <meshStandardMaterial color="#a52a2a" />
      </mesh>
      {/* Chimney - larger */}
      <mesh position={[2, 7.5, 2]}>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="#696969" />
      </mesh>
      {/* Chimney top */}
      <mesh position={[2, 9, 2]}>
        <coneGeometry args={[0.7, 0.7, 4]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      {/* Front door - grand */}
      <mesh position={[0, 1, 4]}>
        <boxGeometry args={[2, 3, 0.1]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      {/* Door frame */}
      <mesh position={[0, 1, 4.05]}>
        <boxGeometry args={[2.2, 3.2, 0.05]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* Garage door */}
      <mesh position={[5.5, 1, 2.5]}>
        <boxGeometry args={[3, 3, 0.1]} />
        <meshStandardMaterial color="#778899" />
      </mesh>
      {/* Windows - larger and more */}
      <mesh position={[-3, 2.5, 4]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-3, 2.5, 4.02]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[3, 2.5, 4]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[3, 2.5, 4.02]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-4, 2.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-4, 2.5, 0.02]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[4, 2.5, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[4, 2.5, 0.02]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Second story windows */}
      <mesh position={[-3, 5, 4]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-3, 5, 4.02]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[3, 5, 4]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[3, 5, 4.02]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[-4, 5, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-4, 5, 0.02]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[4, 5, 0]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[4, 5, 0.02]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Side windows */}
      <mesh position={[0, 2.5, -4]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 2.5, -3.98]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[5.5, 2.5, -2.5]}>
        <boxGeometry args={[1.5, 1.5, 0.05]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.8} />
      </mesh>
      <mesh position={[5.5, 2.5, -2.48]}>
        <boxGeometry args={[1.7, 1.7, 0.02]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Balcony */}
      <mesh position={[0, 4.5, 4]}>
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial color="#d3d3d3" />
      </mesh>
      {/* Balcony railings */}
      <mesh position={[-1.8, 4.6, 4]}>
        <boxGeometry args={[0.1, 0.8, 2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[1.8, 4.6, 4]}>
        <boxGeometry args={[0.1, 0.8, 2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0, 4.6, 5]}>
        <boxGeometry args={[3.6, 0.8, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Front porch - larger */}
      <mesh position={[0, 0.1, 5]}>
        <boxGeometry args={[5, 0.2, 3]} />
        <meshStandardMaterial color="#d3d3d3" />
      </mesh>
      {/* Porch steps */}
      <mesh position={[0, 0.05, 7]}>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
      <mesh position={[0, 0, 9]}>
        <boxGeometry args={[3, 0.1, 1]} />
        <meshStandardMaterial color="#c0c0c0" />
      </mesh>
      {/* Porch pillars - larger */}
      <mesh position={[-2, 1, 5]}>
        <cylinderGeometry args={[0.2, 0.2, 2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[2, 1, 5]}>
        <cylinderGeometry args={[0.2, 0.2, 2]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Porch roof */}
      <mesh position={[0, 2.8, 5]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[3.5, 1.5, 4]} />
        <meshStandardMaterial color="#8b0000" />
      </mesh>
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#90ee90" />
    </mesh>
  );
}

function Gate({ gateOpen }) {
  const leftGateRef = useRef();
  const rightGateRef = useRef();

  useFrame(() => {
    if (leftGateRef.current) {
      const targetRotation = gateOpen ? -Math.PI / 3 : 0;
      leftGateRef.current.rotation.y += (targetRotation - leftGateRef.current.rotation.y) * 0.1;
    }
    if (rightGateRef.current) {
      const targetRotation = gateOpen ? Math.PI / 3 : 0;
      rightGateRef.current.rotation.y += (targetRotation - rightGateRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 9]}>
      {/* Left gate post */}
      <mesh position={[-1.5, 1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* Right gate post */}
      <mesh position={[1.5, 1, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 2]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* Left gate */}
      <mesh ref={leftGateRef} position={[-0.75, 1, 0]}>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
      {/* Right gate */}
      <mesh ref={rightGateRef} position={[0.75, 1, 0]}>
        <boxGeometry args={[1.5, 2, 0.1]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
      {/* Gate crossbars */}
      <mesh position={[-0.75, 1.5, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.05]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
      <mesh position={[0.75, 1.5, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.05]} />
        <meshStandardMaterial color="#2f4f4f" />
      </mesh>
    </group>
  );
}

function Fence() {
  return (
    <group>
      {/* Front fence - larger */}
      {[...Array(20)].map((_, i) => (
        <mesh key={`front-${i}`} position={[-5 + i * 0.5, 0.5, 9]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      ))}
      {/* Side fences - longer */}
      {[...Array(12)].map((_, i) => (
        <mesh key={`left-${i}`} position={[-5, 0.5, 4.5 - i * 0.5]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      ))}
      {[...Array(12)].map((_, i) => (
        <mesh key={`right-${i}`} position={[5, 0.5, 4.5 - i * 0.5]}>
          <boxGeometry args={[0.1, 1, 0.1]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      ))}
      {/* Fence posts */}
      <mesh position={[-5, 0.75, 9]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      <mesh position={[5, 0.75, 9]}>
        <cylinderGeometry args={[0.15, 0.15, 1.5]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  );
}

function Tree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.5, 1, 8]} />
        <meshStandardMaterial color="#228b22" />
      </mesh>
    </group>
  );
}

function Sun() {
  return (
    <group position={[20, 15, 20]}>
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#ffdd44" />
      </mesh>
      {/* Sun glow */}
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial color="#ffdd44" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function Exterior({ gateOpen }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cameraPosition = isMobile ? [10, 6, 10] : [15, 8, 15];
  const fov = isMobile ? 60 : 50;

  return (
    <div className="exterior-scene">
      <Canvas camera={{ position: cameraPosition, fov: fov }} shadows>
        <Suspense fallback={null}>
          <Sky sunPosition={[100, 20, 100]} distance={450000} turbidity={8} rayleigh={6} />
          <ambientLight intensity={0.2} />
          <directionalLight position={[20, 15, 20]} intensity={1.5} castShadow 
            shadow-mapSize-width={2048} shadow-mapSize-height={2048}
            shadow-camera-left={-50} shadow-camera-right={50}
            shadow-camera-top={50} shadow-camera-bottom={-50} />
          <Sun />
          <House />
          <Ground />
          <Gate gateOpen={gateOpen} />
          <Fence />
          <Tree position={[-6, 0, -6]} />
          <Tree position={[6, 0, -8]} />
          <Tree position={[8, 0, 4]} />
          <Tree position={[-8, 0, 6]} />
          <Tree position={[10, 0, -4]} />
          <Tree position={[-10, 0, -2]} />
          <Tree position={[12, 0, 2]} />
          <Tree position={[-12, 0, 0]} />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Exterior;
