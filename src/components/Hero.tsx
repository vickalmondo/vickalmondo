"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 pt-20 overflow-hidden bg-black">
      {/* Background Image/Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2070&auto=format&fit=crop" 
          alt="KAAZ Hypercar" 
          className="w-full h-full object-cover opacity-60 scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      <div className="relative z-20 max-w-4xl">
        <motion.h1 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6 tracking-tight"
        >
          Redefining Velocity.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Engineered for the Elite.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed"
        >
          A next-generation hypercar built for precision, dominance, and uncompromising innovation.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4"
        >
          <Button className="bg-transparent border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500 hover:text-black px-10 py-6 rounded-none transition-all duration-500 group relative overflow-hidden">
            <span className="relative z-10 tracking-widest font-bold">EXPLORE THE MACHINE</span>
            <div className="absolute inset-0 bg-cyan-400/10 blur-xl group-hover:bg-cyan-400/20 transition-all" />
          </Button>
          
          <Button className="bg-transparent border border-orange-500/50 text-orange-400 hover:bg-orange-500 hover:text-black px-10 py-6 rounded-none transition-all duration-500 group relative overflow-hidden">
            <span className="relative z-10 tracking-widest font-bold">RESERVE YOURS</span>
            <div className="absolute inset-0 bg-orange-400/10 blur-xl group-hover:bg-orange-400/20 transition-all" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;