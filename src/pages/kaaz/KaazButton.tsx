"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface KaazButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'explore' | 'reserve';
  children: React.ReactNode;
}

export const KaazButton = ({ variant = 'explore', children, className, ...props }: KaazButtonProps) => {
  const baseStyles = "px-8 py-4 text-xs tracking-[0.2em] uppercase font-bold transition-all duration-500 relative overflow-hidden group";
  
  const variants = {
    explore: "bg-transparent border border-cyan-500/50 text-cyan-400 hover:text-black hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
    reserve: "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black"
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {variant === 'explore' && (
        <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      )}
      {variant === 'reserve' && (
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
      )}
    </button>
  );
};