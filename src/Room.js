import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  useProgress,
} from '@react-three/drei';

import * as THREE from 'three';
import Light from './components/Light';
import Fan from './components/Fan';
import TV from './components/TV';
import Sofa from './components/Sofa';
import CoffeeTable from './components/CoffeeTable';
import Bookshelf from './components/Bookshelf';
import Rug from './components/Rug';

// Loader component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center className="loader">
      Loading Room... {progress.toFixed(0)}%
    </Html>
  );
}

function RoomModel() {
  return (
    <group position={[0, 0, 0]}>
      {/* Floor - Hardwood texture */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color="#D2B48C"
          roughness={0.7}
          normalScale={[0.5, 0.5]}
        />
      </mesh>
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#F8F8FF" roughness={0.9} />
      </mesh>
      {/* Back wall - Light beige paint */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
      </mesh>
      {/* Front wall */}
      <mesh position={[0, 0, 5]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
      </mesh>
      {/* Left wall */}
      <mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
      </mesh>
      {/* Right wall */}
      <mesh position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
      </mesh>
      {/* Window on back wall */}
      <mesh position={[0, 0.5, -4.9]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial color="#87CEEB" transparent opacity={0.3} />
      </mesh>
      {/* Window frame */}
      <mesh position={[0, 0.5, -4.85]}>
        <planeGeometry args={[2.2, 1.7]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>
      {/* Door on front wall */}
      <mesh position={[2, 0, 4.9]}>
        <planeGeometry args={[1.5, 3]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>
      {/* Door frame */}
      <mesh position={[2, 0, 4.95]}>
        <planeGeometry args={[1.7, 3.2]} />
        <meshStandardMaterial color="#654321" roughness={0.7} />
      </mesh>

      {/* Furniture */}
      <Sofa position={[0, 0, 1]} />
      <CoffeeTable position={[0, 0, 0]} />
      <Bookshelf position={[-4, 0, -2]} />
      <Rug position={[0, -0.95, 0]} />

      {/* Additional decorative elements */}
      {/* Picture frame on wall */}
      <mesh position={[-3, 0.5, -4.9]}>
        <planeGeometry args={[1, 0.8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.5} />
      </mesh>
      {/* Picture */}
      <mesh position={[-3, 0.5, -4.85]}>
        <planeGeometry args={[0.8, 0.6]} />
        <meshStandardMaterial color="#4682B4" roughness={0.3} />
      </mesh>

      {/* Plant */}
      <mesh position={[3, -0.8, -3]}>
        <planeGeometry args={[0.5, 0.8]} />
        <meshStandardMaterial color="#228B22" roughness={0.9} />
      </mesh>
    </group>
  );
}

// Interactive components inside the room
function InteractiveObjects({ lightOn, fanOn, tvOn }) {
  return (
    <>
      <Light position={[0, 0.5, 0]} isOn={lightOn} />
      <Fan position={[0, 0.8, 0]} isOn={fanOn} />
      <TV position={[-2, 0, -3]} isOn={tvOn} />
    </>
  );
}

// Main Scene
export default function Room({ lightOn, fanOn, tvOn }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 50, near: 1, far: 1000, position: [0, 2, 8] }}
      gl={{
        antialias: true,
        physicallyCorrectLights: true,
        outputColorSpace: THREE.SRGBColorSpace,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
      }}
      className="canvas"
    >
      <Suspense fallback={<Loader />}>
        {/* Ambient light for general illumination */}
        <ambientLight intensity={0.2} color="#FFE4B5" />

        {/* Main directional light (sunlight through window) */}
        <directionalLight
          position={[-3, 4, -3]}
          intensity={0.8}
          color="#FFF8DC"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        {/* Ceiling light */}
        <pointLight
          position={[0, 0.8, 0]}
          intensity={lightOn ? 1.5 : 0.1}
          color="#FFFACD"
          distance={8}
          decay={2}
          castShadow
        />

        {/* TV light when on */}
        {tvOn && (
          <pointLight
            position={[-2, 0.3, -3]}
            intensity={0.5}
            color="#E0FFFF"
            distance={3}
            decay={2}
          />
        )}

        {/* Window light */}
        <pointLight
          position={[0, 1, -4]}
          intensity={0.3}
          color="#87CEEB"
          distance={5}
          decay={2}
        />

        <RoomModel />
        <InteractiveObjects lightOn={lightOn} fanOn={fanOn} tvOn={tvOn} />

        {/* Enhanced shadows */}
        <ContactShadows
          position={[0, -1, 0]}
          opacity={0.4}
          scale={15}
          blur={4}
          far={8}
          resolution={512}
        />

        {/* Environment for reflections */}
        <Environment preset="apartment" background blur={0.1} />

        <OrbitControls
          enableZoom
          enablePan
          enableDamping
          dampingFactor={0.05}
          minDistance={3}
          maxDistance={25}
          target={[0, 0, 0]}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
}
