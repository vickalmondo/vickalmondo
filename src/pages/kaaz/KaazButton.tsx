"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface KaazButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'explore' | 'reserve';
  children: React.ReactNode;
}

export const KaazButton = ({ variant = 'explore', children, className, ...props }: KaazButtonProps) => {
  const isExplore = variant === 'explore';
  
  return (
    <button 
      className={cn(
        "relative group transition-all duration-200 bg-[#222] text-white rounded-lg -skew-x-[21deg] hover:scale-105",
        "px-10 py-4 text-lg md:text-xl font-heading tracking-widest uppercase",
        isExplore ? "hover:text-cyan-400" : "hover:text-orange-500",
        className
      )}
      {...props}
    >
      {/* Pseudo-element ::before equivalent */}
      <div className={cn(
        "absolute top-0 right-0 w-0 h-full opacity-50 transition-all duration-200 rounded-lg group-hover:w-full group-hover:opacity-100 group-hover:left-0 group-hover:right-auto",
        isExplore ? "bg-cyan-950/50 shadow-[inset_0_0_0_4px_#083344]" : "bg-orange-950/50 shadow-[inset_0_0_0_4px_#431407]"
      )} />

      {/* Pseudo-element ::after equivalent (Border) */}
      <div className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] transition-all duration-400 border-2 border-transparent rounded-lg group-hover:w-full group-hover:h-full",
        isExplore ? "group-hover:border-cyan-500" : "group-hover:border-orange-500"
      )} />

      {/* Content span to un-skew text */}
      <span className="relative z-10 inline-block skew-x-[21deg] whitespace-nowrap">
        {children}
      </span>
    </button>
  );
};