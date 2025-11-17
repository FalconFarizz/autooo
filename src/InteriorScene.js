import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  useProgress,
  Sky,
  MeshReflectorMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// Single-file realistic interior scene with: realistic fan, TV (video texture),
// lights, environment & improved materials. Drop this file into a React app.
// Needs: react, react-dom, @react-three/fiber, @react-three/drei, three
// -----------------------------------------------------------------------------

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ color: '#fff', fontFamily: 'sans-serif' }}>
        Loading... {Math.round(progress)}%
      </div>
    </Html>
  );
}

// ------------------ Realistic Ceiling Fan with detailed design --------------------------------
function Fan({ isOn = true, position = [0, 2.4, 0], scale = 1 }) {
  const group = useRef();
  const bladeGroup = useRef();

  // blades rotation speed
  useFrame((state, delta) => {
    if (!group.current || !bladeGroup.current) return;
    const speed = isOn ? 8 : 0.1; // radians per second multiplier
    bladeGroup.current.rotation.y += delta * speed;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      {/* ceiling canopy */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
        <meshStandardMaterial metalness={0.8} roughness={0.2} color="#2c2c2c" />
      </mesh>

      {/* down rod with decorative chain */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 8]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color="#1a1a1a" />
      </mesh>

      {/* pull chain */}
      <mesh position={[0.15, -0.6, 0]} castShadow>
        <cylinderGeometry args={[0.005, 0.005, 0.3, 8]} />
        <meshStandardMaterial metalness={1.0} roughness={0.0} color="#c0c0c0" />
      </mesh>
      <mesh position={[0.15, -0.9, 0]} castShadow>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial metalness={1.0} roughness={0.0} color="#c0c0c0" />
      </mesh>

      {/* motor housing - realistic */}
      <mesh position={[0, -0.45, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.25, 32]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color="#2c2c2c" />
      </mesh>

      {/* motor housing details */}
      <mesh position={[0, -0.35, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.05, 16]} />
        <meshStandardMaterial metalness={0.8} roughness={0.3} color="#444" />
      </mesh>

      {/* blade arms */}
      <group ref={bladeGroup}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <group key={i} rotation={[0, (i / 6) * Math.PI * 2, 0]}>
            {/* blade arm */}
            <mesh position={[0, -0.45, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
              <meshStandardMaterial metalness={0.8} roughness={0.2} color="#333" />
            </mesh>

            {/* realistic fan blade - curved shape */}
            <mesh position={[0.35, -0.45, 0]} rotation={[0, 0, Math.PI / 12]} castShadow>
              <boxGeometry args={[0.8, 0.02, 0.15]} />
              <meshStandardMaterial metalness={0.2} roughness={0.6} color="#8b4513" />
            </mesh>

            {/* blade reinforcement */}
            <mesh position={[0.25, -0.45, 0]} rotation={[0, 0, Math.PI / 12]} castShadow>
              <boxGeometry args={[0.3, 0.01, 0.05]} />
              <meshStandardMaterial metalness={0.3} roughness={0.5} color="#654321" />
            </mesh>

            {/* blade tip */}
            <mesh position={[0.75, -0.45, 0]} rotation={[0, 0, Math.PI / 12]} castShadow>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial metalness={0.7} roughness={0.3} color="#d4af37" />
            </mesh>
          </group>
        ))}
      </group>

      {/* bottom cap */}
      <mesh position={[0, -0.55, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color="#2c2c2c" />
      </mesh>

      {/* decorative elements */}
      <mesh position={[0, -0.4, 0]} castShadow>
        <torusGeometry args={[0.2, 0.015, 8, 16]} />
        <meshStandardMaterial metalness={0.9} roughness={0.1} color="#d4af37" />
      </mesh>

      {/* light kit (optional) */}
      <mesh position={[0, -0.65, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.1, 16]} />
        <meshStandardMaterial metalness={0.8} roughness={0.2} color="#f5f5f5" />
      </mesh>

      {/* light bulbs */}
      {[0, 1, 2].map((i) => (
        <mesh key={`bulb-${i}`} position={[Math.cos((i / 3) * Math.PI * 2) * 0.08, -0.7, Math.sin((i / 3) * Math.PI * 2) * 0.08]} castShadow>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial emissive={isOn ? new THREE.Color('#fff7e6') : new THREE.Color('#000000')} emissiveIntensity={isOn ? 1 : 0} />
        </mesh>
      ))}

      {/* point light for illumination when on */}
      <pointLight
        position={[0, -0.7, 0]}
        intensity={isOn ? 1 : 0}
        distance={4}
        decay={2}
        color="#fff7e6"
      />
    </group>
  );
}

// ------------------ TV with video texture -----------------------------------------
function TV({ isOn = true, position = [-1.2, 1.1, -2.6], rotation = [0, 0, 0], scale = 1 }) {
  const screenRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    // create a video element once
    const video = document.createElement('video');
    video.src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
    video.crossOrigin = 'anonymous';
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    videoRef.current = video;

    return () => {
      // clean up
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.src = '';
        } catch (e) { }
      }
    };
  }, []);

  useEffect(() => {
    if (!screenRef.current) return;
    if (isOn) {
      const v = videoRef.current;
      const playPromise = v.play();
      // handle browsers that return a promise
      if (playPromise && playPromise.then) playPromise.catch(() => { });
      const tex = new THREE.VideoTexture(v);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.needsUpdate = true;
      screenRef.current.material.map = tex;
      screenRef.current.material.needsUpdate = true;
    } else {
      // clear texture
      if (screenRef.current.material.map) {
        screenRef.current.material.map.dispose();
        screenRef.current.material.map = null;
        screenRef.current.material.needsUpdate = true;
      }
      if (videoRef.current) videoRef.current.pause();
    }
  }, [isOn]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* TV body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.8, 1.05, 0.08]} />
        <meshStandardMaterial color="#0b0b0b" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* screen (slightly in front) */}
      <mesh position={[0, 0, 0.045]} ref={screenRef}>
        <planeGeometry args={[1.68, 0.95]} />
        <meshStandardMaterial emissive={isOn ? new THREE.Color('#ffffff') : new THREE.Color('#000000')} emissiveIntensity={isOn ? 1.2 : 0} />
      </mesh>

      {/* stand */}
      <mesh position={[0, -0.63, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.2]} />
        <meshStandardMaterial color="#151515" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// ------------------ Philips Wall Light ---------------------------------------
function PhilipsWallLight({ isOn = true, position = [0, 1.5, -5.9], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* wall mount */}
      <mesh castShadow>
        <boxGeometry args={[0.3, 0.4, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* light shade */}
      <mesh position={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.2, 32]} />
        <meshStandardMaterial emissive={isOn ? new THREE.Color('#fff7e6') : new THREE.Color('#000000')} emissiveIntensity={isOn ? 2 : 0} metalness={0.1} roughness={0.5} />
      </mesh>
      {/* point light */}
      <pointLight
        position={[0, 0, 0.2]}
        intensity={isOn ? 1.5 : 0}
        distance={5}
        decay={2}
        castShadow
      />
    </group>
  );
}

// ------------------ Philips Floor Lamp ---------------------------------------
function PhilipsFloorLamp({ isOn = true, position = [1.5, 0, -2] }) {
  return (
    <group position={position}>
      {/* base */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* pole */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 2, 16]} />
        <meshStandardMaterial color="#444" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* shade */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <coneGeometry args={[0.2, 0.3, 32]} />
        <meshStandardMaterial emissive={isOn ? new THREE.Color('#fff7e6') : new THREE.Color('#000000')} emissiveIntensity={isOn ? 2.5 : 0} metalness={0.1} roughness={0.5} />
      </mesh>
      {/* point light */}
      <pointLight
        position={[0, 2.1, 0]}
        intensity={isOn ? 2 : 0}
        distance={6}
        decay={2}
        castShadow
      />
    </group>
  );
}

// ------------------ Attractive red and white room -------------------------------------
function Room() {
  return (
    <group>
      {/* floor - elegant marble pattern */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* back wall - feature wall with red accent */}
      <mesh receiveShadow position={[0, 1.9, -6]}>
        <boxGeometry args={[12, 4, 0.2]} />
        <meshStandardMaterial color="#dc143c" roughness={0.9} />
      </mesh>

      {/* left wall - white with decorative elements */}
      <mesh receiveShadow position={[-6, 1.9, 0]}>
        <boxGeometry args={[0.2, 4, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} />
      </mesh>

      {/* right wall - white with red trim */}
      <mesh receiveShadow position={[6, 1.9, 0]}>
        <boxGeometry args={[0.2, 4, 12]} />
        <meshStandardMaterial color="#ffffff" roughness={0.95} />
      </mesh>

      {/* ceiling - white with subtle texture */}
      <mesh receiveShadow position={[0, 4.05, 0]}>
        <boxGeometry args={[12, 0.2, 12]} />
        <meshStandardMaterial roughness={0.95} color="#ffffff" />
      </mesh>

      {/* decorative wainscoting on walls */}
      <mesh receiveShadow position={[0, 1, -6]}>
        <boxGeometry args={[12, 0.2, 0.25]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[-6, 1, 0]}>
        <boxGeometry args={[0.25, 0.2, 12]} />
        <meshStandardMaterial color="#dc143c" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[6, 1, 0]}>
        <boxGeometry args={[0.25, 0.2, 12]} />
        <meshStandardMaterial color="#dc143c" roughness={0.9} />
      </mesh>

      {/* crown molding */}
      <mesh receiveShadow position={[0, 3.8, -6]}>
        <boxGeometry args={[12, 0.1, 0.15]} />
        <meshStandardMaterial color="#dc143c" roughness={0.8} />
      </mesh>
      <mesh receiveShadow position={[-6, 3.8, 0]}>
        <boxGeometry args={[0.15, 0.1, 12]} />
        <meshStandardMaterial color="#dc143c" roughness={0.8} />
      </mesh>
      <mesh receiveShadow position={[6, 3.8, 0]}>
        <boxGeometry args={[0.15, 0.1, 12]} />
        <meshStandardMaterial color="#dc143c" roughness={0.8} />
      </mesh>

      {/* rug - complementary pattern */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -0.6]}>
        <planeGeometry args={[4, 2.2]} />
        <meshStandardMaterial roughness={0.9} metalness={0.02} color="#e6e6e6" />
      </mesh>

      {/* decorative wall panels */}
      <mesh receiveShadow position={[-4, 2, -5.95]}>
        <boxGeometry args={[2, 1.5, 0.05]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
      <mesh receiveShadow position={[4, 2, -5.95]}>
        <boxGeometry args={[2, 1.5, 0.05]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>
    </group>
  );
}

// ------------------ Small decor: sofa + table -------------------------------------
function Sofa() {
  return (
    <group position={[1.6, 0, -1.2]}>
      {/* base */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[2.6, 0.4, 1.1]} />
        <meshStandardMaterial roughness={0.6} color="#3d3d3d" />
      </mesh>
      {/* back */}
      <mesh position={[0, 0.8, -0.45]} castShadow>
        <boxGeometry args={[2.6, 0.8, 0.2]} />
        <meshStandardMaterial roughness={0.6} color="#3d3d3d" />
      </mesh>
      {/* armrests */}
      <mesh position={[-1.2, 0.6, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 1.1]} />
        <meshStandardMaterial roughness={0.6} color="#3d3d3d" />
      </mesh>
      <mesh position={[1.2, 0.6, 0]} castShadow>
        <boxGeometry args={[0.2, 0.4, 1.1]} />
        <meshStandardMaterial roughness={0.6} color="#3d3d3d" />
      </mesh>
      {/* cushions */}
      <mesh position={[-0.6, 0.45, 0]} castShadow>
        <boxGeometry args={[1.1, 0.1, 0.9]} />
        <meshStandardMaterial roughness={0.7} color="#555" />
      </mesh>
      <mesh position={[0.6, 0.45, 0]} castShadow>
        <boxGeometry args={[1.1, 0.1, 0.9]} />
        <meshStandardMaterial roughness={0.7} color="#555" />
      </mesh>
    </group>
  );
}

function CoffeeTable() {
  return (
    <group position={[0.2, 0, -1.3]}>
      {/* tabletop */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.9, 0.05, 0.6]} />
        <meshStandardMaterial roughness={0.5} color="#4a2f1a" />
      </mesh>
      {/* legs */}
      <mesh position={[-0.4, 0.15, -0.25]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial roughness={0.5} color="#4a2f1a" />
      </mesh>
      <mesh position={[0.4, 0.15, -0.25]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial roughness={0.5} color="#4a2f1a" />
      </mesh>
      <mesh position={[-0.4, 0.15, 0.25]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial roughness={0.5} color="#4a2f1a" />
      </mesh>
      <mesh position={[0.4, 0.15, 0.25]} castShadow>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshStandardMaterial roughness={0.5} color="#4a2f1a" />
      </mesh>
    </group>
  );
}

// ------------------ Main exported scene component ----------------------------------
export default function InteriorScene({ lightOn = true, fanOn = true, tvOn = true }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 576);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const cameraPosition = isMobile ? [3, 2, 5] : [5, 2.6, 6.5];
  const fov = isMobile ? 60 : 45;

  return (
    <div className="interior-scene">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: cameraPosition, fov: fov, near: 0.1 }}
        gl={{
          antialias: true,
          physicallyCorrectLights: true,
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <Suspense fallback={<Loader />}>
          {/* environment & sky */}
          <color attach="background" args={lightOn ? [0.15, 0.18, 0.22] : [0.01, 0.01, 0.02]} />
          <hemisphereLight intensity={lightOn ? 0.6 : 0.05} skyColor={new THREE.Color(lightOn ? '#87ceeb' : '#111111')} groundColor={new THREE.Color(lightOn ? '#444444' : '#000000')} />

          <directionalLight
            position={[6, 10, 4]}
            intensity={lightOn ? 3 : 0.1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          <Environment preset="studio" background={false} />
          <Sky sunPosition={[50, 8, 20]} turbidity={5} rayleigh={2} />

          {/* Room and decor */}
          <Room />
                    <Sofa />
          <CoffeeTable />

          {/* interactive objects */}
          <PhilipsWallLight isOn={lightOn} position={[-5.9, 1.5, 0]} rotation={[0, Math.PI / 2, 0]} />
          <PhilipsWallLight isOn={lightOn} position={[5.9, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]} />
          <PhilipsFloorLamp isOn={lightOn} position={[1.5, 0, -2]} />
          <Fan isOn={fanOn} position={[0, 2.45, -1]} />
          <TV isOn={tvOn} position={[-1.8, 1.15, -2.9]} />

          {/* ground reflections / shadows */}
          <ContactShadows position={[0, 0.01, 0]} opacity={0.6} scale={18} blur={3} far={2.5} />

          {/* subtle reflective area to give realism */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -0.6]}>
            <planeGeometry args={[4.4, 2.4]} />
            <MeshReflectorMaterial
              blur={[400, 80]}
              mixBlur={0.6}
              resolution={512}
              mirror={0.8}
              color="#f0f0f0"
            />
          </mesh>

          {/* controls */}
          <OrbitControls target={[0.4, 1.2, -1.2]} enableDamping dampingFactor={0.06} />
        </Suspense>
      </Canvas>
    </div>
  );
}
