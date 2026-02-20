"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <Stats />
      
      {/* Additional immersive sections could go here */}
      <section className="py-32 px-8 bg-black flex flex-col items-center justify-center text-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-6 tracking-tight">The Future of Performance</h2>
          <p className="text-gray-500 leading-relaxed">
            Every curve, every vent, and every component of the KAAZ has been meticulously crafted to slice through the air with surgical precision. This isn't just a car; it's a statement of technological superiority.
          </p>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border border-gray-700 rounded-full flex items-center justify-center">
              <div className="w-3 h-0.5 bg-gray-700 rotate-45" />
            </div>
            <span className="text-lg font-bold tracking-tighter text-gray-400">KAAZ</span>
          </div>
          <div className="text-xs text-gray-600 tracking-widest uppercase">
            © 2024 KAAZ AUTOMOTIVE. ALL RIGHTS RESERVED.
          </div>
        </div>
        <MadeWithDyad />
      </footer>
    </main>
  );
};

export default Index;