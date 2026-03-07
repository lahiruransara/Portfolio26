import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, EffectPass, RenderPass, BloomEffect, SelectiveBloomEffect, ChromaticAberrationEffect } from 'postprocessing';
import { AsciiEffect } from '../lib/asciiShader';

interface AsciiHeroProps {
  imagePath?: string;
}

export const AsciiHero: React.FC<AsciiHeroProps> = ({ 
  imagePath = 'https://picsum.photos/seed/portfolio/1080/1920' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      powerPreference: "high-performance",
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const loader = new THREE.TextureLoader();
    const photoTexture = loader.load(imagePath, (tex) => {
      updateAspect(tex);
    });

    const asciiEffect = new AsciiEffect({
      style: 1,
      inputBuffer: photoTexture,
      cellSize: 8,
      resolution: resolution,
    });

    function updateAspect(tex: THREE.Texture) {
      const image = tex.image as HTMLImageElement | HTMLCanvasElement | ImageBitmap | null;
      if (!image) return;
      
      const width = 'width' in image ? image.width : 0;
      const height = 'height' in image ? image.height : 0;
      
      if (width === 0 || height === 0) return;

      const imageAspect = width / height;
      const screenAspect = window.innerWidth / window.innerHeight;
      const uAspect = asciiEffect.uniforms.get("aspectRatio");

      if (uAspect) {
        if (screenAspect > imageAspect) {
          // Screen is wider than image: fit width, crop top/bottom
          uAspect.value.set(1.0, imageAspect / screenAspect);
        } else {
          // Screen is taller than image: fit height, crop sides
          uAspect.value.set(screenAspect / imageAspect, 1.0);
        }
      }
    }

    const bloomEffect = new BloomEffect({
      intensity: 1.5,
      luminanceThreshold: 0.05,
      luminanceSmoothing: 0.6,
      mipmapBlur: true,
    });

    const chromaticAberrationEffect = new ChromaticAberrationEffect({
      offset: new THREE.Vector2(0.005, 0.0),
      radialModulation: false,
      modulationOffset: 0,
    });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    
    // Pass 1: ASCII Transformation
    const asciiPass = new EffectPass(camera, asciiEffect);
    composer.addPass(asciiPass);
    
    // Pass 2: Bloom (Glow)
    const bloomPass = new EffectPass(camera, bloomEffect);
    composer.addPass(bloomPass);
    
    // Pass 3: Chromatic Aberration (Distortion)
    const chromaticPass = new EffectPass(camera, chromaticAberrationEffect);
    composer.addPass(chromaticPass);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
      resolution.set(width, height);
      const resUniform = asciiEffect.uniforms.get("resolution");
      if (resUniform) resUniform.value.copy(resolution);
      if (photoTexture.image) updateAspect(photoTexture);
    };

    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Update uniform before rendering
      const inputBufferUniform = asciiEffect.uniforms.get("inputBuffer");
      if (inputBufferUniform) inputBufferUniform.value = photoTexture;
      
      composer.render();
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      composer.dispose();
      renderer.dispose();
      photoTexture.dispose();
    };
  }, [imagePath]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* Centered Ticker */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 pointer-events-none z-[8] overflow-hidden whitespace-nowrap mix-blend-difference opacity-100">
        <div className="flex w-max animate-marquee will-change-transform">
          <div className="ticker-text font-black uppercase tracking-widest flex-shrink-0">
            Lahiru Ransara&nbsp;·&nbsp;Lahiru Ransara&nbsp;·&nbsp;Lahiru Ransara&nbsp;·&nbsp;Lahiru Ransara&nbsp;·&nbsp;
          </div>
          <div className="ticker-text font-black uppercase tracking-widest flex-shrink-0">
            Lahiru Ransara&nbsp;·&nbsp;Lahiru Ransara&nbsp;·&nbsp;Lahiru Ransara&nbsp;·&nbsp;Lahiru Ransara&nbsp;·&nbsp;
          </div>
        </div>
      </div>

      {/* Bottom Gradient for Legibility */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none z-[5]" />

      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-8 lg:left-auto lg:right-8 pointer-events-none z-10 text-left lg:text-right flex flex-col items-start lg:items-end">
        <p className="text-white font-mono text-[10px] lg:text-sm tracking-widest uppercase lg:hidden mb-3">
          Based in Idaho, USA
        </p>
        <h1 
          className="font-bold text-white tracking-tighter mix-blend-difference leading-[0.9]"
          style={{ fontSize: 'clamp(28px, 9vw, 48px)' }}
        >
          Creative Designer<br />UX & Design Systems
        </h1>
      </div>
      <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-8 lg:left-8 z-10 pointer-events-none hidden lg:block">
        <p className="text-white font-mono text-sm tracking-widest uppercase">
          Based in Idaho, USA
        </p>
      </div>
    </div>
  );
};
