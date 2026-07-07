import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { playSelectSound } from '../hooks/useGameAudio';
import heroColorMap from '../assets/hero_realistic_transparent.png';
import heroDepthMap from '../assets/hero_realistic_depth.png';
import kjSignatureMap from '../assets/kj_signature.png';

// Interactive quotes list
const HERO_QUOTES = [
  "🛡️ Karan: 'Adventure awaits! Scroll to level up.'",
  "⚔️ Karan: 'My tools are geared for production.'",
  "📜 Karan: 'I organize startup bootcamps when I am not writing code.'",
  "✨ Karan: 'Fun fact: I Anchor LNCT Orators club campaigns!'",
  "🔥 Karan: 'Let's recruit this S-tier Software Development hero!'",
  "🧠 Karan: 'TensorFlow, Pandas, and Python are equipped in my inventory.'",
];

interface Hero3DProps {
  className?: string;
  glowColor?: string; // e.g. '#fbbf24' or '#ef4444'
}

export const Hero3D: React.FC<Hero3DProps> = React.memo(({ className = '', glowColor = '#d97706' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [quote, setQuote] = useState<string>('');
  const [showQuote, setShowQuote] = useState(false);
  const quoteTimeoutRef = useRef<any>(null);

  // Mouse coordinates state
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });
  
  // Drag rotation states (user can drag to tilt)
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const dragRotationRef = useRef({ x: 0.05, y: 0.3 }); // starting angled slightly for 3D depth

  const handleClick = () => {
    // Play sound blip
    playSelectSound();

    // Select random speech bubble quote
    const randomQuote = HERO_QUOTES[Math.floor(Math.random() * HERO_QUOTES.length)];
    setQuote(randomQuote);
    setShowQuote(true);

    if (quoteTimeoutRef.current) clearTimeout(quoteTimeoutRef.current);
    quoteTimeoutRef.current = setTimeout(() => {
      setShowQuote(false);
    }, 4500);
  };

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    const width = mountEl.clientWidth || 320;
    const height = mountEl.clientHeight || 320;

    // ─── Scene & Camera Setup ───
    const scene = new THREE.Scene();
    
    // Transparent background
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    mountEl.appendChild(renderer.domElement);

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 8);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Glow highlight point light matching the theme color
    const glowLight = new THREE.PointLight(glowColor, 3.0, 10);
    glowLight.position.set(0, -3, 3);
    scene.add(glowLight);

    // ─── Texture Loading ───
    const textureLoader = new THREE.TextureLoader();
    const colorTex = textureLoader.load(heroColorMap);
    const depthTex = textureLoader.load(heroDepthMap);
    const signatureTex = textureLoader.load(kjSignatureMap);
    
    colorTex.colorSpace = THREE.SRGBColorSpace;
    depthTex.colorSpace = THREE.NoColorSpace;
    signatureTex.colorSpace = THREE.SRGBColorSpace;

    // Card aspect ratio (2:3 typical for trading cards)
    const cardWidth = 5.2;
    const cardHeight = 7.8;

    // ─── WebGL Shader for 3D Holographic Pokémon Card ───
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform sampler2D uDepthMap;
      uniform sampler2D uSignature;
      uniform vec2 uMouse;
      uniform float uThreshold;
      uniform vec3 uGlowColor;

      void main() {
        // 1. Draw Card Gold Frame / Border
        float borderSize = 0.045;
        bool isBorder = (vUv.x < borderSize || vUv.x > 1.0 - borderSize || vUv.y < borderSize || vUv.y > 1.0 - borderSize);
        
        // Inside illustration card frame
        float leftLimit = 0.06;
        float rightLimit = 0.94;
        float bottomLimit = 0.08;
        float topLimit = 0.92;
        
        bool isIllustrationWindow = (vUv.x > leftLimit && vUv.x < rightLimit && vUv.y > bottomLimit && vUv.y < topLimit);

        // Shifting holographic foil color based on mouse position
        vec3 holoBg = vec3(
          0.45 + 0.35 * sin(vUv.x * 6.0 + uMouse.x * 3.0),
          0.35 + 0.35 * cos(vUv.y * 6.0 + uMouse.y * 3.0),
          0.65 + 0.35 * sin(vUv.x * 3.0 + vUv.y * 3.0 + uMouse.x * 2.0)
        );

        vec4 finalColor = vec4(0.0);

        if (isBorder) {
          // Gold border
          vec3 borderGold = vec3(0.85, 0.65, 0.2) + 0.15 * sin(vUv.x * 10.0 + vUv.y * 10.0 + uMouse.x * 4.0);
          finalColor = vec4(borderGold, 1.0);
        } else if (isIllustrationWindow) {
          // 2. Parallax Character sampling inside card window
          // Map card UV coordinates to fit transparent character sprite centered inside
          vec2 characterUv = (vUv - vec2(leftLimit, bottomLimit)) / vec2(rightLimit - leftLimit, topLimit - bottomLimit);
          
          // --- WAIST-UP ASPECT CORRECT FIT ---
          // Map character height from waist (y=0.42) to head (y=1.0) of the texture.
          float scaleY = 0.58; 
          float scaleX = 1.302; // aspectRatio correction factor
          
          vec2 zoomedUv = vec2(
            0.5 + (characterUv.x - 0.5) * scaleX,
            0.42 + characterUv.y * scaleY
          );
          
          // Check if coordinate falls inside the character texture bounds
          bool inTextureBounds = (zoomedUv.x >= 0.0 && zoomedUv.x <= 1.0 && zoomedUv.y >= 0.0 && zoomedUv.y <= 1.0);
          
          vec4 charColor = vec4(0.0);
          if (inTextureBounds) {
            // Apply parallax displacement to zoomed UV coordinates
            float depth = texture2D(uDepthMap, zoomedUv).r;
            vec2 displacedUv = zoomedUv + uMouse * depth * uThreshold;
            displacedUv = clamp(displacedUv, 0.001, 0.999);
            charColor = texture2D(uTexture, displacedUv);
          }

          // Blend character over the moving holographic background
          if (charColor.a > 0.05) {
            vec3 litChar = charColor.rgb * (1.0 + uMouse.y * 0.15);
            finalColor = vec4(mix(holoBg, litChar, charColor.a), 1.0);
          } else {
            finalColor = vec4(holoBg, 1.0);
          }

          // ─── HIGH-QUALITY SMOOTH CURSIVE SIGNATURE (KJ) ───
          // Positioned at top-right inside illustration frame
          if (characterUv.x > 0.74 && characterUv.x < 0.92 && characterUv.y > 0.81 && characterUv.y < 0.90) {
            vec2 suv = (characterUv - vec2(0.74, 0.81)) / vec2(0.18, 0.09); // normalized local signature UVs
            
            // Trim outer edge margins to crop out any black pixel artifacts from the signature asset boundary
            if (suv.x > 0.04 && suv.x < 0.96 && suv.y > 0.04 && suv.y < 0.96) {
              vec4 sigColor = texture2D(uSignature, suv);
              if (sigColor.a > 0.05) {
                // Shifting metallic gold ink color reacting to tilt
                vec3 goldInk = vec3(0.96, 0.80, 0.28) * (1.1 + 0.15 * sin(suv.x * 12.0 + uMouse.x * 3.0));
                finalColor.rgb = mix(finalColor.rgb, goldInk, sigColor.a * 0.95);
              }
            }
          }
        } else {
          // Card inner frame body (dark slate board)
          vec3 cardBase = vec3(0.08, 0.09, 0.12);
          finalColor = vec4(cardBase, 1.0);
        }

        // 3. Shifting Holographic Specular Glint sweeps across card on hover
        float shine = max(0.0, 1.0 - abs(vUv.x + vUv.y - 1.0 - uMouse.x * 0.8) / 0.18);
        vec3 glint = vec3(1.0, 0.95, 0.8) * shine * 0.4;
        
        finalColor.rgb += glint;

        gl_FragColor = finalColor;
      }
    `;

    const parallaxMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: colorTex },
        uDepthMap: { value: depthTex },
        uSignature: { value: signatureTex },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uThreshold: { value: 0.045 }, // displacement scale
        uGlowColor: { value: new THREE.Color(glowColor) },
      },
      transparent: true,
      side: THREE.DoubleSide,
    });

    // Create Card Mesh
    const cardGeo = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const cardMesh = new THREE.Mesh(cardGeo, parallaxMaterial);

    // Bezel backplate to give card thickness when rotated
    const backplateGeo = new THREE.BoxGeometry(cardWidth + 0.05, cardHeight + 0.05, 0.08);
    const backplateMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(glowColor),
      roughness: 0.3,
      metalness: 0.85,
    });
    const backplateMesh = new THREE.Mesh(backplateGeo, backplateMat);
    backplateMesh.position.set(0, 0, -0.05);

    const cardGroup = new THREE.Group();
    cardGroup.add(cardMesh);
    cardGroup.add(backplateMesh);
    
    // Position/Scale to fit the container perfectly
    cardGroup.position.set(0, 0.2, 0);
    scene.add(cardGroup);

    // ─── Glowing Spark Particle System (Rising Legendary Effect) ───
    const particleCount = 35;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 3.5;
      const py = -8 + Math.random() * 15;
      
      particlePositions[i * 3] = Math.cos(theta) * radius;
      particlePositions[i * 3 + 1] = py;
      particlePositions[i * 3 + 2] = Math.sin(theta) * radius;

      particleSpeeds.push(0.04 + Math.random() * 0.08);
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(glowColor),
      size: 0.32,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // ─── Interaction Handlers ───
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      // Calculate normalized mouse coordinates (-0.5 to 0.5)
      const mx = (e.clientX / window.innerWidth) - 0.5;
      const my = (e.clientY / window.innerHeight) - 0.5;
      
      mouseRef.current = { x: -mx, y: my }; // invert X for correct direction

      // Drag update
      if (isDraggingRef.current) {
        const deltaMove = {
          x: e.clientX - previousMousePositionRef.current.x,
          y: e.clientY - previousMousePositionRef.current.y,
        };
        dragRotationRef.current.y += deltaMove.x * 0.01;
        dragRotationRef.current.x = Math.max(-0.4, Math.min(0.4, dragRotationRef.current.x + deltaMove.y * 0.01));
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Mobile touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingRef.current && e.touches.length === 1) {
        const deltaMove = {
          x: e.touches[0].clientX - previousMousePositionRef.current.x,
          y: e.touches[0].clientY - previousMousePositionRef.current.y,
        };
        dragRotationRef.current.y += deltaMove.x * 0.015;
        dragRotationRef.current.x = Math.max(-0.4, Math.min(0.4, dragRotationRef.current.x + deltaMove.y * 0.015));
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMoveGlobal);
    mountEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    mountEl.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // ─── Animation Loop ───
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      
      // Interpolate/Lerp mouse coordinates for smooth weight inertia
      targetMouseRef.current.x += (mouseRef.current.x - targetMouseRef.current.x) * 0.08;
      targetMouseRef.current.y += (mouseRef.current.y - targetMouseRef.current.y) * 0.08;
      
      // Update shader uniforms
      parallaxMaterial.uniforms.uMouse.value.set(
        targetMouseRef.current.x,
        targetMouseRef.current.y
      );

      // Rotate card in 3D based on mouse and drag rotation
      if (!isDraggingRef.current) {
        // Idle breathing float
        cardGroup.position.y = 0.2 + Math.sin(elapsedTime * 2.0) * 0.15;
        
        // Idle tilt drift
        cardGroup.rotation.y = dragRotationRef.current.y + targetMouseRef.current.x * 0.55;
        cardGroup.rotation.x = dragRotationRef.current.x + targetMouseRef.current.y * 0.4;
      } else {
        cardGroup.rotation.y = dragRotationRef.current.y;
        cardGroup.rotation.x = dragRotationRef.current.x;
      }

      // Update Particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleSpeeds[i];
        positions[i * 3] += Math.sin(elapsedTime + i) * 0.015;
        positions[i * 3 + 2] += Math.cos(elapsedTime + i) * 0.015;

        if (positions[i * 3 + 1] > 8) {
          positions[i * 3 + 1] = -8;
          const theta = Math.random() * Math.PI * 2;
          const radius = 2.5 + Math.random() * 3.5;
          positions[i * 3] = Math.cos(theta) * radius;
          positions[i * 3 + 2] = Math.sin(theta) * radius;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountEl) return;
      const w = mountEl.clientWidth;
      const h = mountEl.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      mountEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      mountEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
      
      try {
        mountEl.removeChild(renderer.domElement);
      } catch {}

      cardGeo.dispose();
      parallaxMaterial.dispose();
      colorTex.dispose();
      depthTex.dispose();
      signatureTex.dispose();
      backplateGeo.dispose();
      backplateMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [glowColor]);

  return (
    <div className={`relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}>
      {/* 3D Canvas Mounting point */}
      <div 
        ref={mountRef} 
        onClick={handleClick}
        className="w-full h-full select-none" 
      />

      {/* Retro Pixel Speech Bubble quote overlay */}
      {showQuote && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-[240px] p-3 bg-slate-900 border-2 border-amber-500 rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.6)] text-center animate-[bounce_0.4s_ease-out_infinite_alternate] pointer-events-none select-none">
          <p className="font-pressstart text-[8px] leading-normal text-amber-400">
            {quote}
          </p>
          {/* Arrow pointing down */}
          <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-amber-500" />
          <div className="absolute bottom-[-7px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent border-t-[7px] border-t-slate-900" />
        </div>
      )}
    </div>
  );
});
