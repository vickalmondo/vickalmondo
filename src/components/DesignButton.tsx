"use client";

import React from 'react';
import { cn } from "@/lib/utils";

interface DesignButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const DesignButton = ({ children, className, ...props }: DesignButtonProps) => {
  return (
    <button
      className={cn(
        "w-[236px] h-[34px] bg-cyan-500 text-black text-[10px] font-bold tracking-[0.3em] uppercase",
        "hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300",
        "flex items-center justify-center relative overflow-hidden group",
        "font-heading",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </button>
  );
};

export default DesignButton;