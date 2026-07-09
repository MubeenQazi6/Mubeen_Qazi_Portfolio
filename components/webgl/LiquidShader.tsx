"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

// Classic Perlin 2D Noise 
vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); 
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; 
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

void main() {
  vec2 uv = vUv;
  
  vec2 aspectMouse = uMouse;
  vec2 aspectUv = uv;
  if(uResolution.x > uResolution.y) {
      aspectMouse.x *= uResolution.x / uResolution.y;
      aspectUv.x *= uResolution.x / uResolution.y;
  } else {
      aspectMouse.y *= uResolution.y / uResolution.x;
      aspectUv.y *= uResolution.y / uResolution.x;
  }

  float dist = distance(aspectUv, aspectMouse);
  float interaction = smoothstep(0.4, 0.0, dist);
  
  vec2 noiseUv = uv * 3.0;
  noiseUv.x += uTime * 0.1;
  noiseUv.y -= uTime * 0.05;
  float noise = cnoise(noiseUv + interaction * 2.0);
  
  vec3 bgColor = vec3(0.00, 0.00, 0.01);
  vec3 accent1 = vec3(0.13, 0.77, 0.36); 
  vec3 accent2 = vec3(0.23, 0.51, 0.96); 
  
  float colorMix = smoothstep(-1.0, 1.0, noise);
  vec3 finalAccent = mix(accent2, accent1, colorMix);
  
  float glow = interaction * 0.5;
  
  vec3 color = mix(bgColor, finalAccent, (noise * 0.15 + glow) * 0.5);
  
  float vignette = smoothstep(1.5, 0.2, distance(vUv, vec2(0.5)));
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;

export function LiquidShader() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size]
  );

  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value += delta;

    targetMouse.current.x = (state.pointer.x + 1) / 2;
    targetMouse.current.y = (state.pointer.y + 1) / 2;

    currentMouse.current.lerp(targetMouse.current, 0.05);
    materialRef.current.uniforms.uMouse.value.copy(currentMouse.current);
    
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}
