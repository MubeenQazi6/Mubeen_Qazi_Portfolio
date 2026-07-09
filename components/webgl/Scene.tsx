"use client";

import { Canvas } from "@react-three/fiber";
import { LiquidShader } from "./LiquidShader";
import { Suspense } from "react";

export function WebGLScene() {
  return (
    <div className="fixed inset-0 z-[-1] h-screen w-screen overflow-hidden pointer-events-none bg-black">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={[1, 2]} // Support retina displays
        gl={{ antialias: false, alpha: false }} // alpha false for performance
      >
        <Suspense fallback={null}>
          <LiquidShader />
        </Suspense>
      </Canvas>
    </div>
  );
}
