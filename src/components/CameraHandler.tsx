"use client";

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState, useRef } from 'react';
import * as THREE from 'three';

export type ViewType = 'front' | 'top' | 'side' | 'perspective';

interface CameraHandlerProps {
  view: ViewType;
}

const VIEW_CONFIGS: Record<ViewType, { position: [number, number, number]; target: [number, number, number] }> = {
  front: { position: [0, 5, 100], target: [0, 0, 0] },
  top: { position: [0, 150, 0], target: [0, 0, 0] },
  side: { position: [120, 5, 0], target: [0, 0, 0] },
  perspective: { position: [100, 50, 100], target: [0, 0, 0] },
};

const CameraHandler = ({ view }: CameraHandlerProps) => {
  const { camera, controls } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const isAnimating = useRef(false);
  const lastView = useRef<ViewType | null>(null);

  useEffect(() => {
    // Only trigger animation if the view actually changed
    if (lastView.current !== view) {
      const config = VIEW_CONFIGS[view];
      targetPos.current.set(...config.position);
      targetLookAt.current.set(...config.target);
      isAnimating.current = true;
      lastView.current = view;
    }
  }, [view]);

  useFrame(() => {
    if (!isAnimating.current) return;

    // Smoothly interpolate camera position
    camera.position.lerp(targetPos.current, 0.05);
    
    if (controls) {
      // @ts-ignore - OrbitControls has a target property
      controls.target.lerp(targetLookAt.current, 0.05);
      // @ts-ignore
      controls.update();
    } else {
      camera.lookAt(targetLookAt.current);
    }

    // Stop animating once we are close enough to the target
    if (camera.position.distanceTo(targetPos.current) < 0.1) {
      isAnimating.current = false;
    }
  });

  return null;
};

export default CameraHandler;