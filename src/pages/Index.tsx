"use client";

import { motion } from "framer-motion";
import { images, svgPaths } from "./kaaz/KaazAssets";
import { KaazButton } from "./kaaz/KaazButton";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import Specifications from "@/components/Specifications";

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#031015] text-white overflow-x-hidden relative font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 h-screen">
        <img 
          src={images.carBg} 
          alt="Kaaz Hypercar Background" 
          className="w-full h-full object-cover object-center md:object-[center_top]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col min-h-screen">
        <header className="flex items-center justify-between py-8">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d={svgPaths.logo} />
            </svg>
            <span className="text-xl font-bold tracking-widest font-heading">KAAZ</span>
          </div>

          <nav className="hidden md:flex items-center gap-12 text-sm tracking-widest text-gray-400 font-medium">
            <a href="#" className="hover:text-white transition-colors uppercase">The Machine</a>
            <a href="#specifications" className="hover:text-white transition-colors uppercase">Specifications</a>
            <a href="#" className="hover:text-white transition-colors uppercase">Reserve</a>
          </nav>

          <div className="hidden md:block">
            <button className="px-6 py-2 border border-cyan-500/30 text-cyan-400 text-xs tracking-widest uppercase hover:bg-cyan-900/20 transition-all rounded-sm backdrop-blur-sm font-heading">
              Contact
            </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </header>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-24 left-0 right-0 bg-black/95 backdrop-blur-md p-6 border-b border-gray-800 flex flex-col gap-6 z-50 font-heading"
          >
            <a href="#" className="text-gray-300 hover:text-white uppercase tracking-widest text-sm">The Machine</a>
            <a href="#specifications" className="text-gray-300 hover:text-white uppercase tracking-widest text-sm">Specifications</a>
            <a href="#" className="text-gray-300 hover:text-white uppercase tracking-widest text-sm">Reserve</a>
            <button className="px-6 py-3 border border-cyan-500/30 text-cyan-400 text-xs tracking-widest uppercase w-full text-center">
              Contact
            </button>
          </motion.div>
        )}

        <main className="flex-1 flex flex-col justify-center mt-12 md:mt-0 max-w-2xl min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide mb-6">
              <span className="block text-gray-100">Redefining Velocity.</span>
              <span className="block text-gray-400 font-medium text-3xl md:text-5xl lg:text-6xl mt-2">Engineered for the Elite.</span>
            </h1>
            
            <p className="text-gray-400 text-sm md:text-lg max-w-md leading-relaxed mb-10 border-l-2 border-cyan-500/50 pl-4 font-light">
              A next-generation hypercar built for precision, dominance, and uncompromising innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <KaazButton variant="explore" onClick={() => console.log('explore')} className="font-heading">
                Explore The Machine
              </KaazButton>
              <KaazButton variant="reserve" onClick={() => console.log('reserve')} className="font-heading">
                Reserve Yours
              </KaazButton>
            </div>
          </motion.div>
        </main>

        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-white/10 mt-12 backdrop-blur-sm bg-black/20 rounded-t-xl px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="flex flex-col relative group">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="pl-4">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl md:text-5xl font-heading font-light text-cyan-100">0-100</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">km/h</span>
              </div>
              <div className="text-sm text-cyan-400/80 tracking-widest uppercase font-medium">
                In <span className="text-white font-heading text-xl ml-1">2.1s</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col relative group">
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-white/20" />
            <div className="lg:pl-8 pl-4">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl md:text-5xl font-heading font-light text-gray-200">810</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">kg</span>
              </div>
              <div className="text-xs text-gray-500 tracking-widest uppercase font-medium">
                Ultra-light Chassis
              </div>
            </div>
          </div>

          <div className="flex flex-col relative group">
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-white/20" />
            <div className="lg:pl-8 pl-4">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl md:text-5xl font-heading font-light text-cyan-100">1,200+</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">HP</span>
              </div>
              <div className="text-xs text-gray-500 tracking-widest uppercase font-medium">
                Hybrid Powertrain
              </div>
            </div>
          </div>

          <div className="flex flex-col relative group">
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-white/20" />
            <div className="lg:pl-8 pl-4">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl md:text-5xl font-heading font-light text-gray-200">99</span>
                <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Units</span>
              </div>
              <div className="text-xs text-gray-500 tracking-widest uppercase font-medium">
                Worldwide
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Specifications />

      <div className="py-8 bg-black">
        <MadeWithDyad />
      </div>
    </div>
  );
}