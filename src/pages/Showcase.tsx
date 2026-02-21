"use client";

import React, { useState, Suspense, useRef, useMemo, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  useGLTF, 
  ContactShadows, 
  Html, 
  useProgress,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import CameraHandler, { ViewType } from '@/components/CameraHandler';
import { Box, Maximize, Move, Square } from 'lucide-react';

/**
 * KAAZ AUTOMOTIVE - HYPERCAR SHOWCASE
 * Optimized for wide-angle viewing and smooth interaction
 */

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
          (mesh.material as THREE.MeshStandardMaterial).roughness = 0.2;
        }
      }
    });
    return clonedScene;
  }, [scene]);

  useFrame((state) => {
    if (group.current && !isExplored) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  if (!cleanScene) return null;

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={cleanScene} 
        scale={isExplored ? 1.6 : 1.4} 
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
      <div className="flex flex-col items-center justify-center w-64 p-8 bg-black/95 border border-white/10">
        <div className="flex justify-between w-full mb-2 font-mono text-[8px] tracking-[0.5em] text-[#00f2ff] uppercase">
          <span>Loading_Model</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/5 h-[2px] relative overflow-hidden">
          <div 
            className="absolute h-full bg-[#00f2ff] transition-all duration-300" 
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
  const [currentView, setCurrentView] = useState<ViewType>('perspective');
  const navigate = useNavigate();
  
  const modelPath = "/scene.glb"; 

  const viewOptions: { id: ViewType; label: string; icon: any }[] = [
    { id: 'perspective', label: 'ISO', icon: Maximize },
    { id: 'front', label: 'FRT', icon: Square },
    { id: 'side', label: 'SID', icon: Move },
    { id: 'top', label: 'TOP', icon: Box },
  ];

  return (
    <div className="relative h-screen w-full bg-[#050506] text-white font-sans overflow-hidden">
      
      {/* UI: HEADER */}
      <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-8 py-8 pointer-events-none">
        <div 
          className="flex items-center gap-4 pointer-events-auto cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-[2px] bg-[#00f2ff] group-hover:w-14 transition-all duration-500"></div>
          <span className="text-xl font-black tracking-widest italic uppercase">KAAZ</span>
        </div>
        <div className="hidden md:flex items-center gap-8 pointer-events-auto">
          <button className="text-[8px] font-bold tracking-[0.4em] uppercase opacity-30 hover:opacity-100 transition-all">Specs</button>
          <button className="px-6 py-2 bg-white text-black text-[8px] font-black tracking-[0.4em] uppercase hover:bg-[#00f2ff] transition-all">Order</button>
        </div>
      </nav>

      {/* UI: SIDE VIEW CONTROLS */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {viewOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              setCurrentView(option.id);
              setIsExplored(true);
            }}
            className={`w-12 h-12 flex flex-col items-center justify-center border transition-all duration-300 group relative
              ${currentView === option.id 
                ? 'bg-[#00f2ff] border-[#00f2ff] text-black' 
                : 'bg-black/40 border-white/10 text-white/40 hover:border-[#00f2ff]/50 hover:text-white'}`}
          >
            <option.icon size={14} className="mb-1" />
            <span className="text-[7px] font-black tracking-tighter">{option.label}</span>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-4 px-3 py-1 bg-black border border-white/10 text-[8px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {option.id} View
            </div>
          </button>
        ))}
      </div>

      {/* UI: HERO TEXT */}
      <div 
        className={`absolute inset-0 z-20 flex flex-col justify-center px-10 transition-all duration-1000 
        ${isExplored ? 'opacity-0 -translate-x-20 pointer-events-none' : 'opacity-100 translate-x-0'}`}
      >
        <div className="max-w-xl">
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.8] mb-6 select-none">
            DARK<br />
            <span className="opacity-20" style={{ WebkitTextStroke: '1px white', color: 'transparent' }}>MATTER.</span>
          </h1>
          <p className="text-white/40 text-[11px] leading-relaxed mb-8 tracking-wider max-w-xs uppercase">
            Aerodynamic excellence forged in the virtual wind tunnel.
          </p>
          <button 
            onClick={() => {
              setIsExplored(true);
              setCurrentView('perspective');
            }}
            className="px-10 py-4 border border-[#00f2ff]/40 text-[#00f2ff] font-bold uppercase tracking-[0.3em] text-[9px] hover:bg-[#00f2ff] hover:text-black transition-all"
          >
            Examine Chassis
          </button>
        </div>
      </div>

      {/* CORE: 3D ENGINE */}
      <div className="absolute inset-0 z-10">
        <Canvas 
          shadows 
          camera={{ position: [100, 50, 100], fov: 45, far: 2000 }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#050506']} />
          <Suspense fallback={<TechLoader />}>
            <CameraHandler view={currentView} />
            
            <Stage 
              preset="rembrandt"
              intensity={1} 
              contactShadow={false}
              shadows="contact"
              adjustCamera={false} 
              environment="city"
            >
              <ErrorBoundary fallback={<ModelFallback />}>
                  <LamborghiniModel url={modelPath} isExplored={isExplored} />
              </ErrorBoundary>
            </Stage>

            <ContactShadows 
              position={[0, -1.2, 0]} 
              opacity={0.6} 
              scale={40} 
              blur={2} 
              color="#000000"
            />
          </Suspense>

          <OrbitControls 
            makeDefault
            enableZoom={true} 
            enablePan={true}
            minDistance={10} 
            maxDistance={1000}
            autoRotate={true}
            autoRotateSpeed={0.5} 
          />
          <Environment preset="night" />
        </Canvas>
      </div>

      {/* UI: BACK BUTTON */}
      {isExplored && (
        <button 
          onClick={() => {
            setIsExplored(false);
            setCurrentView('perspective');
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 text-white/50 hover:text-[#00f2ff] transition-all group pointer-events-auto"
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Return to Hangar</span>
        </button>
      )}

      {/* VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]"></div>
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