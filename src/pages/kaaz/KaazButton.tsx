"use client";

import React, { useMemo, useState } from 'react';
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
  const hue = isExplore ? "180" : "25";
  const saturation = "100%";
  
  return (
    <div className="relative inline-block">
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
          "--transition": "0.25s",
          "--spark": "1.8s",
          "--cut": "0.1em",
          "--bg": `radial-gradient(40% 50% at center 100%, hsl(var(--hue) calc(var(--active) * 97%) 72% / var(--active)), transparent), radial-gradient(80% 100% at center 120%, hsl(var(--hue) calc(var(--active) * 97%) 70% / var(--active)), transparent), hsl(var(--hue) calc(var(--active) * 97%) calc((var(--active) * 44%) + 12%))`
        }}
        {...props}
      >
        {/* Outer Glow/Border Effect (button:before) */}
        <div className={cn(
          "absolute inset-[-0.25em] z-[-1] border-[0.25em] rounded-sm transition-opacity duration-300 pointer-events-none",
          isExplore ? "border-cyan-500/50" : "border-orange-500/50",
          isActive ? "opacity-100" : "opacity-0"
        )} />

        {/* Default Border Layer */}
        <div className={cn(
          "absolute inset-0 border-2 transition-all duration-300 z-20 pointer-events-none",
          isExplore ? "border-[#7CD2DE]" : "border-[#E9B681]",
          isActive ? "opacity-100" : "opacity-60"
        )} />

        {/* Sparkle Backdrop */}
        <div className="absolute inset-[var(--cut)] bg-[#111] transition-colors duration-300 z-0" 
             style={{ background: "var(--bg)" }} />

        {/* Rotating Spark Border */}
        <div className="absolute inset-0 overflow-hidden z-10 pointer-events-none">
          <div className="absolute inset-0 opacity-[calc(var(--active)+0.4)] transition-opacity duration-300 animate-[flip_calc(var(--spark)*2)_infinite_steps(2,end)]">
            <div className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[15%] w-[200%] aspect-square animate-[rotate_var(--spark)_linear_infinite]",
              "bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)]"
            )} />
          </div>
        </div>

        {/* Glow Effect Shadow */}
        <div className={cn(
          "absolute inset-0 transition-all duration-300 z-[-1]",
          "shadow-[0_0_calc(var(--active)*6em)_calc(var(--active)*3em)_hsl(var(--hue)_97%_61%_/_0.75)]"
        )} />

        {/* Content */}
        <span className="relative z-30 inline-block skew-x-[21deg] whitespace-nowrap font-bold">
          <span className={cn(
            "transition-colors duration-300",
            isActive ? (isExplore ? "text-cyan-100" : "text-orange-100") : "text-white"
          )}>
            {children}
          </span>
        </span>
      </button>

      {/* Particles Container */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square pointer-events-none z-[-1] opacity-[var(--active)] transition-opacity duration-300 overflow-hidden"
           style={{ maskImage: "radial-gradient(white, transparent 65%)", WebkitMaskImage: "radial-gradient(white, transparent 65%)" }}>
        {particles.map((p, i) => (
          <svg 
            key={i}
            viewBox="0 0 24 24"
            className="absolute animate-[float-out_var(--duration)_linear_infinite]"
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

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flip { to { transform: rotate(360deg); } }
        @keyframes rotate { to { transform: rotate(90deg); } }
        @keyframes float-out { to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
};