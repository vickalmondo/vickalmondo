"use client";

import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { label: '0-100 KM/H', value: '2.1s', sub: 'IN' },
  { label: 'ULTRA-LIGHT CHASSIS', value: '810 KG', sub: '' },
  { label: 'HYBRID POWERTRAIN', value: '1,200+HP', sub: '' },
  { label: 'WORLDWIDE', value: '99 UNITS', sub: '' },
];

const Stats = () => {
  return (
    <div className="bg-black px-8 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="flex flex-col items-start">
              <div className="flex items-baseline gap-2 mb-1">
                {stat.sub && <span className="text-[10px] font-bold text-gray-600 tracking-widest">{stat.sub}</span>}
                <span className="text-3xl md:text-4xl font-bold text-white tracking-tighter group-hover:text-cyan-400 transition-colors duration-500">
                  {stat.value}
                </span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">
                {stat.label}
              </span>
            </div>
            {index < stats.length - 1 && (
              <div className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Stats;