"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { cn } from "@/lib/utils";

interface KaazButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'explore' | 'reserve';
  children: React.ReactNode;
}

export const KaazButton = ({ variant = 'explore', children, className, ...props }: KaazButtonProps) => {
  const isExplore = variant === 'explore';
  const [isActive, setIsActive] = useState(false);

  // Generate random particle properties once on mount
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      x: Math.floor(Math.random() * 60 + 20),
      y: Math.floor(Math.random() * 60 + 20),
      duration: Math.floor(Math.random() * 14 + 6),
      delay: Math.floor(Math.random() * 10),
      alpha: (Math.floor(Math.random() * 50 + 40)) / 100,
      originX: Math.random() > 0.5 ? Math.floor(Math.random() * 500 + 300) * -1 : Math.floor(Math.random() * 500 + 300),
      originY: Math.random() > 0.5 ? Math.floor(Math.random() * 500 + 300) * -1 : Math.floor(Math.random() * 500 + 300),
      size: (Math.floor(Math.random() * 50 + 40)) / 100,
    }));
  }, []);

  // HSL values for Cyan and Orange
  const hue = isExplore ? "180" : "25"; // Cyan vs Orange
  const saturation = "100%";
  
  return (
    <button 
      className={cn(
        "relative group transition-all duration-300 bg-[#222] text-white -skew-x-[21deg] hover:scale-110 active:scale-100",
        "px-10 py-4 text-lg md:text-xl font-heading tracking-widest uppercase border-0 cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      style={{
        // @ts-ignore
        "--active": isActive ? "1" : "0",
        "--hue": hue,
        "--saturation": saturation,
      }}
      {...props}
    >
      {/* Sparkle Backdrop */}
      <div className={cn(
        "absolute inset-[1px] bg-[#111] transition-colors duration-300 z-0",
        isActive ? (isExplore ? "bg-cyan-950/40" : "bg-orange-950/40") : "bg-[#111]"
      )} />

      {/* Rotating Spark Border */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="spark absolute inset-0 opacity-[calc(var(--active)+0.4)] transition-opacity duration-300">
          <div className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[15%] w-[200%] aspect-square animate-[spin_2s_linear_infinite]",
            "bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]"
          )} />
        </div>
      </div>

      {/* Glow Effect */}
      <div className={cn(
        "absolute inset-0 transition-all duration-300 z-[-1]",
        "shadow-[0_0_calc(var(--active)*4em)_calc(var(--active)*1.5em)_hsl(var(--hue)_var(--saturation)_50%_/_0.3)]"
      )} />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none z-[-1] opacity-[var(--active)] transition-opacity duration-300">
        {particles.map((p, i) => (
          <svg 
            key={i}
            viewBox="0 0 24 24"
            className="absolute animate-[spin_var(--duration)_linear_infinite]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}rem`,
              height: `${p.size}rem`,
              opacity: p.alpha,
              animationDelay: `-${p.delay}s`,
              animationDuration: `${p.duration}s`,
              transformOrigin: `${p.originX}% ${p.originY}%`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              // @ts-ignore
              animationPlayState: isActive ? 'running' : 'paused'
            }}
          >
            <path fill="currentColor" d="M12 2L14.5 9H22L16 14L18.5 21L12 17L5.5 21L8 14L2 9H9.5L12 2Z" className={isExplore ? "text-cyan-400" : "text-orange-400"} />
          </svg>
        ))}
      </div>

      {/* Content */}
      <span className="relative z-10 inline-block skew-x-[21deg] whitespace-nowrap font-bold">
        <span className={cn(
          "transition-colors duration-300",
          isActive ? (isExplore ? "text-cyan-100" : "text-orange-100") : "text-white"
        )}>
          {children}
        </span>
      </span>
    </button>
  );
};