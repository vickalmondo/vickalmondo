"use client";

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export type ViewType = 'front' | 'top' | 'side' | 'perspective';

interface CameraHandlerProps {
  view: ViewType;
}

const VIEW_CONFIGS: Record<ViewType, { position: [number, number, number]; target: [number, number, number] }> = {
  front: { position: [0, 0.5, 8], target: [0, 0, 0] },
  top: { position: [0, 10, 0], target: [0, 0, 0] },
  side: { position: [10, 0.5, 0], target: [0, 0, 0] },
  perspective: { position: [8, 4, 8], target: [0, 0, 0] },
};

const CameraHandler = ({ view }: CameraHandlerProps) => {
  const { camera, controls } = useThree();
  const [targetPos] = useState(() => new THREE.Vector3());
  const [targetLookAt] = useState(() => new THREE.Vector3());

  useEffect(() => {
    const config = VIEW_CONFIGS[view];
    targetPos.set(...config.position);
    targetLookAt.set(...config.target);
  }, [view, targetPos, targetLookAt]);

  useFrame((state) => {
    // Smoothly interpolate camera position
    camera.position.lerp(targetPos, 0.1);
    
    // If controls exist (OrbitControls), update their target smoothly too
    if (controls) {
      // @ts-ignore - OrbitControls has a target property
      controls.target.lerp(targetLookAt, 0.1);
      // @ts-ignore
      controls.update();
    } else {
      camera.lookAt(targetLookAt);
    }
  });

  return null;
};

export default CameraHandler;