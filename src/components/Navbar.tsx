"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 border-2 border-cyan-500 rounded-full flex items-center justify-center">
          <div className="w-4 h-1 bg-cyan-500 rotate-45 translate-x-0.5" />
        </div>
        <span className="text-2xl font-bold tracking-tighter text-white">KAAZ</span>
      </div>

      <div className="hidden md:flex items-center gap-12">
        {['THE MACHINE', 'SPECIFICATIONS', 'RESERVE'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase().replace(' ', '-')}`}
            className="text-sm font-medium tracking-widest text-gray-400 hover:text-cyan-400 transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      <Button 
        variant="outline" 
        className="border-cyan-900/50 bg-cyan-950/20 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-500 px-8 rounded-none border-t-0 border-b-0 relative overflow-hidden group"
      >
        <span className="relative z-10 tracking-widest text-xs font-bold">CONTACT</span>
        <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      </Button>
    </motion.nav>
  );
};

export default Navbar;