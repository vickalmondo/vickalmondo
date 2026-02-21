"use client";

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type ViewType = 'front' | 'top' | 'side' | 'perspective';

interface CameraHandlerProps {
  view: ViewType;
}

// Set preset positions much further back to start with a wide view
const VIEW_CONFIGS: Record<ViewType, { position: [number, number, number]; target: [number, number, number] }> = {
  front: { position: [0, 5, 150], target: [0, 0, 0] },
  top: { position: [0, 300, 0], target: [0, 0, 0] },
  side: { position: [200, 5, 0], target: [0, 0, 0] },
  perspective: { position: [150, 100, 150], target: [0, 0, 0] },
};

const CameraHandler = ({ view }: CameraHandlerProps) => {
  const { camera, controls } = useThree();
  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const isAnimating = useRef(false);
  const lastView = useRef<ViewType | null>(null);

  useEffect(() => {
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

    // Use a slightly faster lerp to reach the target quickly
    camera.position.lerp(targetPos.current, 0.1);
    
    if (controls) {
      // @ts-ignore
      controls.target.lerp(targetLookAt.current, 0.1);
      // @ts-ignore
      controls.update();
    } else {
      camera.lookAt(targetLookAt.current);
    }

    // Stop animating as soon as we are close to prevent "fighting" with user input
    if (camera.position.distanceTo(targetPos.current) < 0.5) {
      isAnimating.current = false;
    }
  });

  return null;
};

export default CameraHandler;