"use client";

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type ViewType = 'front' | 'top' | 'side' | 'perspective';

interface CameraHandlerProps {
  view: ViewType;
}

// Significantly increased distances to allow for a "far away" perspective
const VIEW_CONFIGS: Record<ViewType, { position: [number, number, number]; target: [number, number, number] }> = {
  front: { position: [0, 2, 40], target: [0, 0, 0] },
  top: { position: [0, 60, 0], target: [0, 0, 0] },
  side: { position: [50, 2, 0], target: [0, 0, 0] },
  perspective: { position: [40, 20, 40], target: [0, 0, 0] },
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

    camera.position.lerp(targetPos.current, 0.05);
    
    if (controls) {
      // @ts-ignore
      controls.target.lerp(targetLookAt.current, 0.05);
      // @ts-ignore
      controls.update();
    } else {
      camera.lookAt(targetLookAt.current);
    }

    if (camera.position.distanceTo(targetPos.current) < 0.1) {
      isAnimating.current = false;
    }
  });

  return null;
};

export default CameraHandler;