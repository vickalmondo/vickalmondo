"use client";

import React, { useState, Suspense, useRef, useMemo, ReactNode } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  useGLTF, 
  PresentationControls, 
  ContactShadows, 
  Html, 
  useProgress,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Camera, Box, Zap, Shield } from 'lucide-react';

// --- 3D Components ---

interface LamborghiniModelProps {
  url: string;
  isExplored: boolean;
}

function LamborghiniModel({ url, isExplored }: LamborghiniModelProps) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);

  const cleanScene = useMemo(() => {
    if (!scene) return null;
    const clonedScene = scene.clone();
    clonedScene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        const mesh = node as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 2;
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.1;
          (mesh.material as THREE.MeshStandardMaterial).metalness = 0.9;
        }
      }
    });
    return clonedScene;
  }, [scene]);

  useFrame((state) => {
    if (group.current && !isExplored) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      group.current.rotation.y += 0.001;
    }
  });

  if (!cleanScene) return null;

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={cleanScene} 
        scale={1} 
        position={[0, -0.2, 0]} 
      />
    </group>
  );
}

function ModelFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[2, 0.5, 4]} />
      <meshStandardMaterial color="#00f2ff" wireframe />
      <Html center>
        <div className="bg-black/90 text-[#00f2ff] px-4 py-2 border border-[#00f2ff] text-[10px] font-mono tracking-tighter uppercase whitespace-nowrap">
          SYSTEM_ERR: LOAD_FAILED
        </div>
      </Html>
    </mesh>
  );
}

function TechLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-64 p-8 bg-black/95 border border-white/10 backdrop-blur-xl">
        <div className="flex justify-between w-full mb-2 font-mono text-[8px] tracking-[0.5em] text-[#00f2ff] uppercase">
          <span>Initializing_Neural_Link</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/5 h-[2px] relative overflow-hidden">
          <div 
            className="absolute h-full bg-[#00f2ff] transition-all duration-300 shadow-[0_0_10px_#00f2ff]" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </Html>
  );
}

// --- Main Application ---

export default function Showcase() {
  const [isExplored, setIsExplored] = useState(false);
  const [view, setView] = useState<'default' | 'front' | 'side' | 'top'>('default');
  const navigate = useNavigate();
  const orbitRef = useRef<any>(null);
  
  const modelPath = "/scene.glb"; 

  const setCameraView = (type: 'default' | 'front' | 'side' | 'top') => {
    setView(type);
    if (!orbitRef.current) return;

    const positions = {
      default: { pos: [5, 2, 10], target: [0, 0, 0] },
      front: { pos: [0, 0.5, 8], target: [0, 0, 0] },
      side: { pos: [10, 0.5, 0], target: [0, 0, 0] },
      top: { pos: [0, 10, 0], target: [0, 0, 0] }
    };

    const selected = positions[type];
    // We'll let OrbitControls handle the smooth transition if we were using a library like gsap, 
    // but for now we'll just snap or use the built-in auto-rotate logic.
  };

  return (
    <div className="relative h-screen w-full bg-[#020203] text-white font-sans overflow-hidden">
      
      {/* UI: TOP NAVIGATION */}
      <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-8 py-8">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-3 group text-white/50 hover:text-white transition-all"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Back to Hangar</span>
        </button>
        
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#00f2ff] rounded-full animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#00f2ff]">Live Telemetry Active</span>
        </div>
      </nav>

      {/* UI: SIDE NAVIGATION (CAMERA PRESETS) */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {[
          { id: 'default', icon: Box, label: 'Perspective' },
          { id: 'front', icon: Camera, label: 'Front View' },
          { id: 'side', icon: Zap, label: 'Side Profile' },
          { id: 'top', icon: Shield, label: 'Aerodynamics' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setCameraView(item.id as any)}
            className={`group relative flex items-center justify-center w-12 h-12 border transition-all duration-500 ${
              view === item.id ? 'bg-[#00f2ff] border-[#00f2ff] text-black' : 'bg-black/40 border-white/10 text-white/40 hover:border-[#00f2ff]/50 hover:text-white'
            }`}
          >
            <item.icon className="w-4 h-4" />
            <span className="absolute left-16 px-3 py-1 bg-black border border-white/10 text-[8px] tracking-[0.2em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* UI: INFO OVERLAY */}
      <div className={`absolute right-8 bottom-8 z-50 max-w-xs transition-all duration-1000 ${isExplored ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="p-6 bg-black/60 border border-white/10 backdrop-blur-xl">
          <h3 className="text-[#00f2ff] text-[10px] font-bold tracking-[0.4em] uppercase mb-4">Chassis Specifications</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[8px] text-white/40 uppercase tracking-widest">Material</span>
              <span className="text-[10px] font-bold uppercase">Graphene Carbon</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[8px] text-white/40 uppercase tracking-widest">Weight Dist.</span>
              <span className="text-[10px] font-bold uppercase">42/58</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-2">
              <span className="text-[8px] text-white/40 uppercase tracking-widest">Drag Coeff.</span>
              <span className="text-[10px] font-bold uppercase">0.21 CD</span>
            </div>
          </div>
        </div>
      </div>

      {/* UI: HERO TEXT */}
      <div 
        className={`absolute inset-0 z-20 flex flex-col justify-center px-24 transition-all duration-1000 pointer-events-none
        ${isExplored ? 'opacity-0 -translate-x-20' : 'opacity-100 translate-x-0'}`}
      >
        <div className="max-w-xl">
          <h1 className="text-7xl md:text-9xl font-black italic uppercase leading-[0.8] mb-6 select-none tracking-tighter">
            KAAZ<br />
            <span className="opacity-10" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>ONE.</span>
          </h1>
          <p className="text-white/40 text-[11px] leading-relaxed mb-10 tracking-[0.3em] max-w-xs uppercase border-l border-[#00f2ff] pl-4">
            The pinnacle of automotive engineering. Zero compromise.
          </p>
          <button 
            onClick={() => setIsExplored(true)}
            className="pointer-events-auto px-12 py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#00f2ff] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            Initialize Scan
          </button>
        </div>
      </div>

      {/* CORE: 3D ENGINE */}
      <div className="absolute inset-0 z-10">
        <Canvas 
          shadows 
          camera={{ position: [5, 2, 10], fov: 35 }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#020203']} />
          <Suspense fallback={<TechLoader />}>
            <PresentationControls
              enabled={isExplored}
              global={false} 
              rotation={[0, -0.4, 0]}
              polar={[-Math.PI / 6, Math.PI / 6]}
              azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
            >
              <Stage 
                environment="city" 
                intensity={0.6} 
                contactShadow={false}
                shadows="contact"
                adjustCamera={true}
              >
                <ErrorBoundary fallback={<ModelFallback />}>
                   <LamborghiniModel url={modelPath} isExplored={isExplored} />
                </ErrorBoundary>
              </Stage>
            </PresentationControls>

            <ContactShadows 
              position={[0, -1.2, 0]} 
              opacity={0.4} 
              scale={20} 
              blur={2.5} 
              color="#000000"
            />
          </Suspense>

          <OrbitControls 
            ref={orbitRef}
            makeDefault
            enabled={isExplored}
            enableZoom={true} 
            enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.75}
            autoRotate={!isExplored}
            autoRotateSpeed={0.5}
          />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* UI: BACK BUTTON */}
      {isExplored && (
        <button 
          onClick={() => setIsExplored(false)}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 text-white/30 hover:text-[#00f2ff] transition-all group"
        >
          <span className="text-[8px] font-bold uppercase tracking-[0.5em]">Exit Scan Mode</span>
          <div className="w-px h-8 bg-white/10 group-hover:bg-[#00f2ff] transition-colors" />
        </button>
      )}

      {/* VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
    </div>
  );
}

class ErrorBoundary extends React.Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}