"use client";

import React, { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  useGLTF, 
  PresentationControls, 
  ContactShadows, 
  Html, 
  useProgress,
  Environment,
  PerspectiveCamera
} from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

/**
 * KAAZ AUTOMOTIVE - HYPERCAR SHOWCASE
 * 3D INTEGRATION
 */

// --- 3D Components ---

function CarModel({ url, isExplored }: { url: string; isExplored: boolean }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        const mesh = node as THREE.Mesh;
        if (mesh.material) {
          (mesh.material as THREE.MeshStandardMaterial).envMapIntensity = 1.5;
        }
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (group.current && !isExplored) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      group.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive 
        object={scene} 
        scale={isExplored ? 1.4 : 1.1} 
        position={[0, -0.2, 0]} 
      />
    </group>
  );
}

function TechLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-80 p-10 bg-black/90 backdrop-blur-3xl border border-white/5 shadow-[0_0_50px_rgba(0,0,0,1)]">
        <div className="flex justify-between w-full mb-3 font-mono text-[8px] tracking-[0.6em] text-[#00f2ff] uppercase">
          <span>Buffer_Syncing</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-white/5 h-[1px] relative overflow-hidden">
          <div 
            className="absolute h-full bg-[#00f2ff] shadow-[0_0_20px_#00f2ff] transition-all duration-700 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-4 text-[8px] text-white/20 uppercase tracking-widest animate-pulse">Initializing Assets...</p>
      </div>
    </Html>
  );
}

export default function Showcase() {
  const [isExplored, setIsExplored] = useState(false);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  
  // Using the correct working URL for the Ferrari model from Three.js dev branch
  const modelPath = "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/ferrari.glb"; 

  return (
    <div 
      ref={setEventSource}
      className="relative min-h-screen bg-[#050506] text-white font-sans overflow-hidden selection:bg-[#00f2ff] selection:text-black"
    >
      
      {/* 1. INTERFACE: HEADER */}
      <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-10 py-10 pointer-events-none">
        <div 
          className="flex items-center gap-4 pointer-events-auto group cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-[2px] bg-[#00f2ff] shadow-[0_0_15px_#00f2ff] group-hover:w-16 transition-all duration-500"></div>
          <span className="text-2xl font-black tracking-tighter uppercase italic text-white">KAAZ</span>
        </div>
        
        <div className="flex items-center gap-10 pointer-events-auto">
          <button className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-30 hover:opacity-100 hover:text-[#00f2ff] transition-all">Propulsion</button>
          <button className="text-[9px] font-bold tracking-[0.4em] uppercase opacity-30 hover:opacity-100 hover:text-[#00f2ff] transition-all">Aerodynamics</button>
          <button className="px-8 py-3 bg-white text-black text-[9px] font-black tracking-[0.4em] uppercase hover:bg-[#00f2ff] transition-all shadow-xl">Reserve</button>
        </div>
      </nav>

      {/* 2. INTERFACE: HERO TEXT */}
      <div 
        className={`absolute inset-0 z-20 flex flex-col justify-center px-10 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] 
        ${isExplored ? 'opacity-0 -translate-x-32 pointer-events-none' : 'opacity-100 translate-x-0'}`}
      >
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-[1px] w-12 bg-[#00f2ff]"></span>
            <span className="text-[#00f2ff] font-mono text-[9px] tracking-[0.6em] uppercase">Architecture: V12_Carbon</span>
          </div>
          
          <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter italic uppercase leading-[0.75] mb-10 select-none text-white">
            DARK<br />
            <span className="text-transparent stroke-text opacity-40">MATTER.</span>
          </h1>
          
          <p className="max-w-md text-white/40 text-[13px] leading-loose mb-12 font-medium tracking-wide">
            A relentless pursuit of velocity. Forged in the digital grid, optimized for performance. The peak of aerodynamic efficiency and raw V12 dominance.
          </p>
          
          <button 
            onClick={() => setIsExplored(true)}
            className="group relative px-14 py-6 bg-transparent border border-[#00f2ff]/30 text-[#00f2ff] font-black uppercase tracking-[0.3em] text-[10px] overflow-hidden hover:border-[#00f2ff] transition-all"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Initiate Digital Twin</span>
            <div className="absolute inset-0 bg-[#00f2ff] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
          </button>
        </div>
      </div>

      {/* 3. CORE: 3D ENGINE */}
      <div className="absolute inset-0 z-10">
        {eventSource && (
          <Canvas 
            shadows 
            dpr={[1, 2]}
            eventSource={eventSource}
            eventPrefix="client"
          >
            <color attach="background" args={['#050506']} />
            <fog attach="fog" args={['#050506', 10, 25]} />
            
            <Suspense fallback={<TechLoader />}>
              <PresentationControls
                enabled={isExplored}
                global={false} 
                cursor={false}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 1000 }}
                rotation={[0, -0.4, 0]}
                polar={[-Math.PI / 6, Math.PI / 6]}
                azimuth={[-Math.PI / 1.5, Math.PI / 1.5]}
              >
                <Stage 
                  environment="city" 
                  intensity={0.6} 
                  contactShadow={false}
                  shadows="contact"
                  adjustCamera={false}
                >
                  <CarModel url={modelPath} isExplored={isExplored} />
                </Stage>
              </PresentationControls>

              <ContactShadows 
                position={[0, -1.2, 0]} 
                opacity={0.8} 
                scale={20} 
                blur={2} 
                far={2} 
                color="#000000"
              />
            </Suspense>

            <PerspectiveCamera makeDefault position={[0, 1.5, 12]} fov={35} />

            <OrbitControls 
              makeDefault
              enabled={!isExplored}
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 2.4}
              maxPolarAngle={Math.PI / 2.1}
              autoRotate={!isExplored}
              autoRotateSpeed={0.4}
            />
            
            <Environment preset="night" />
          </Canvas>
        )}
      </div>

      {/* 4. INTERFACE: EXPLORATION HUD */}
      <div 
        className={`absolute bottom-16 w-full z-40 px-10 flex justify-between items-end transition-all duration-1000 delay-100
        ${isExplored ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}
      >
        <div className="flex gap-20 items-end">
          <div className="space-y-1">
            <p className="text-[#00f2ff] font-mono text-[9px] tracking-[0.5em] uppercase opacity-60">Status: Local_Buffer_Active</p>
            <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">Carbon Chassis</h3>
            <div className="h-[2px] w-20 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></div>
          </div>
          
          <button 
            onClick={() => setIsExplored(false)}
            className="flex items-center gap-4 text-white/30 hover:text-white transition-all group pb-2"
          >
            <span className="text-xl group-hover:-translate-x-2 transition-transform">←</span>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Deactivate Neural Link</span>
          </button>
        </div>

        <div className="text-right flex flex-col items-end">
           <div className="flex items-baseline gap-2 mb-2">
             <span className="text-7xl font-black italic tracking-tighter text-white">12</span>
             <span className="text-2xl font-bold tracking-widest text-[#00f2ff] opacity-80 uppercase font-mono">Cylinders</span>
           </div>
           <p className="text-[9px] font-bold uppercase tracking-[0.6em] text-white/20">Optimal Performance Threshold</p>
        </div>
      </div>

      {/* 5. AESTHETIC LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]"></div>
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,4px_100%]"></div>
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f2ff]/20 to-transparent"></div>
      </div>

      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(255,255,255,0.4);
          text-shadow: 0 0 20px rgba(255,255,255,0.1);
        }
      `}</style>
    </div>
  );
}

// Pre-load the asset
useGLTF.preload("https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/gltf/ferrari.glb");