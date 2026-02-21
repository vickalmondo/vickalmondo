"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, Shield, Wind } from 'lucide-react';

const specs = [
  {
    title: "AERODYNAMICS",
    description: "Active wing system with variable geometry for maximum downforce at high speeds.",
    icon: Wind,
    value: "1.2 Tons",
    label: "Downforce"
  },
  {
    title: "POWERTRAIN",
    description: "Quad-motor electric setup paired with a high-revving V12 hydrogen combustion engine.",
    icon: Zap,
    value: "1,200 HP",
    label: "Combined Output"
  },
  {
    title: "INTELLIGENCE",
    description: "Neural-link driver assistance system providing real-time track telemetry and optimization.",
    icon: Cpu,
    value: "0.01s",
    label: "Response Time"
  },
  {
    title: "SAFETY",
    description: "Graphene-reinforced carbon fiber monocoque with integrated energy absorption zones.",
    icon: Shield,
    value: "Level 5",
    label: "Protection"
  }
];

const Specifications = () => {
  return (
    <section id="specifications" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-widest mb-4">SPECIFICATIONS</h2>
          <div className="w-24 h-1 bg-cyan-500" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 border border-white/5 bg-white/5 backdrop-blur-sm hover:border-cyan-500/30 transition-all group"
            >
              <spec.icon className="w-8 h-8 text-cyan-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold tracking-widest mb-4">{spec.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                {spec.description}
              </p>
              <div className="pt-6 border-t border-white/10">
                <div className="text-2xl font-bold text-white">{spec.value}</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">{spec.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
    </section>
  );
};

export default Specifications;