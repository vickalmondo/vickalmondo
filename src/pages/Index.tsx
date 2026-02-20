"use client";

import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, ContactShadows, Html, useProgress, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { MadeWithDyad } from "@/components/made-with-dyad";

/**
 * KAAZ DESIGN SYSTEM TOKENS
 * Primary: #00f2ff (Electric Cyan)
 * Secondary: #ff8a00 (Ignition Orange)
 * Background: #050506 (Void Black)
 */

// 3D Model Component with Hover Animation
function CarModel({ url, isExplored }: { url: string; isExplored: boolean }) {
  const { scene } = useGLTF(url);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current && !isExplored) {
      // Gentle floating effect in overview mode
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} dispose={null} position={[0, -0.5, 0]}>
      <primitive object={scene} scale={isExplored ? 1.4 : 1.2} />
    </group>
  );
}

// Custom HUD Loader
function HudLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-64">
        <div className="w-full bg-white/5 h-[1px] mb-2 overflow-hidden">
          <div 
            className="h-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff] transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-[#00f2ff] font-mono text-[8px] tracking-[0.5em] uppercase animate-pulse">
          Syncing_Telemetry: {Math.round(progress)}%
        </p>
      </div>
    </Html>
  );
}

const Index = () => {
  const [isExplored, setIsExplored] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const modelUrl = "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/mclaren-f1/model.gltf";

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050506] text-white font-sans overflow-hidden selection:bg-[#00f2ff]/30">
      {/* 1. TOP NAVIGATION */}
      <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-12 py-8 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xl font-black tracking-tighter uppercase">KAAZ</span>
        </div>
        
        <div className="hidden md:flex items-center gap-12 text-[10px] font-bold tracking-[0.3em] uppercase opacity-60">
          <a href="#" className="hover:text-white transition-colors">The Machine</a>
          <a href="#" className="hover:text-white transition-colors">Specifications</a>
          <a href="#" className="hover:text-white transition-colors">Reserve</a>
        </div>

        <button className="px-8 py-2 border border-[#00f2ff]/30 rounded-sm text-[10px] font-bold tracking-widest uppercase hover:bg-[#00f2ff] hover:text-black transition-all shadow-[inset_0_0_15px_rgba(0,242,255,0.1)]">
          Contact
        </button>
      </nav>

      {/* 2. MAIN CONTENT OVERLAY */}
      <div className={`absolute inset-0 z-20 flex flex-col justify-center px-12 transition-all duration-1000 ${isExplored ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="max-w-3xl space-y-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
            Redefining Velocity.<br />
            <span className="text-white/20">Engineered for the Elite.</span>
          </h1>
          <p className="text-white/40 text-lg max-w-md font-medium leading-relaxed">
            A next-generation hypercar built for precision, dominance, and uncompromising innovation.
          </p>
          
          <div className="flex flex-wrap gap-6 pt-8">
            <button 
              onClick={() => setIsExplored(true)}
              className="relative group overflow-hidden px-10 py-4 bg-transparent border border-[#00f2ff]/50 text-[#00f2ff] font-bold uppercase tracking-[0.2em] text-xs transition-all hover:shadow-[0_0_30px_rgba(0,242,255,0.3)]"
            >
              <div className="absolute inset-0 bg-[#00f2ff]/10 group-hover:bg-[#00f2ff]/20 transition-all"></div>
              <span className="relative z-10">Explore the Machine</span>
            </button>

            <button className="relative group overflow-hidden px-10 py-4 bg-transparent border border-[#ff8a00]/50 text-[#ff8a00] font-bold uppercase tracking-[0.2em] text-xs transition-all hover:shadow-[0_0_30px_rgba(255,138,0,0.3)]">
              <div className="absolute inset-0 bg-[#ff8a00]/10 group-hover:bg-[#ff8a00]/20 transition-all"></div>
              <span className="relative z-10">Reserve Yours</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. PERFORMANCE STATS (FOOTER) */}
      <div className={`absolute bottom-0 w-full z-30 px-12 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 transition-transform duration-1000 ${isExplored ? 'translate-y-full' : 'translate-y-0'}`}>
        {[
          { label: "0-100 KM/H", val: "2.1s", sub: "Launch Control" },
          { label: "810 KG", val: "Weight", sub: "Ultra-Light Chassis", highlight: true },
          { label: "1,200+ HP", val: "Output", sub: "Hybrid Powertrain" },
          { label: "99 UNITS", val: "Worldwide", sub: "Limited Production" }
        ].map((stat, i) => (
          <div key={i} className="group cursor-crosshair">
            <div className={`h-[1px] w-full mb-4 transition-all duration-700 ${stat.highlight ? 'bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]' : 'bg-white/10 group-hover:bg-white/30'}`}></div>
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/40 mb-1">{stat.label}</p>
            <h4 className="text-2xl font-black italic">{stat.val}</h4>
            <p className="text-[10px] uppercase tracking-widest text-white/20 mt-1">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* 4. EXPLORATION HUD (TOP LEFT) */}
      <div className={`absolute top-12 left-12 z-40 transition-all duration-1000 delay-500 ${isExplored ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[2px] w-12 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></div>
          <span className="text-[#00f2ff] font-bold tracking-[0.4em] text-[10px] uppercase">Telemetry Active</span>
        </div>
        <h2 className="text-white text-5xl font-black italic tracking-tighter">870<span className="text-[#00f2ff] not-italic text-2xl ml-2">KG</span></h2>
        <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">Dynamic Weight Distribution</p>
        
        <button 
          onClick={() => setIsExplored(false)}
          className="mt-8 text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 pointer-events-auto"
        >
          <span>←</span> Back to Overview
        </button>
      </div>

      {/* 5. 3D INTERACTIVE CORE */}
      <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
        <Canvas 
          shadows 
          camera={{ position: [0, 1, 8], fov: 35 }}
          dpr={[1, 2]}
          // Using the container ref as the event source is much more stable than document.body
          eventSource={containerRef as any}
        >
          <color attach="background" args={['#050506']} />
          <fog attach="fog" args={['#050506', 5, 20]} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={isExplored ? 2 : 1} color="#ffffff" castShadow />
          <pointLight position={[-10, 5, -5]} intensity={2} color="#00f2ff" />
          <Environment preset="night" />

          <Suspense fallback={<HudLoader />}>
            <CarModel url={modelUrl} isExplored={isExplored} />
            
            <ContactShadows 
              position={[0, -0.6, 0]} 
              opacity={0.4} 
              scale={20} 
              blur={2.4} 
              far={1.5} 
              color="#000000" 
            />
          </Suspense>

          <OrbitControls 
            makeDefault
            enableZoom={isExplored} 
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2.1}
            autoRotate={!isExplored}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* 6. AESTHETIC SCANLINES & VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_3px,4px_100%]"></div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 z-50 pointer-events-none">
        <MadeWithDyad />
      </div>
    </div>
  );
}

export default Index;