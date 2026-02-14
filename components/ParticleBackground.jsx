'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 1200 }) {
    const meshRef = useRef();

    const { positions, colors, sizes } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 25;
            positions[i3 + 1] = (Math.random() - 0.5) * 25;
            positions[i3 + 2] = (Math.random() - 0.5) * 15;

            // Forest greens palette
            const t = Math.random();
            colors[i3] = t * 0.18 + (1 - t) * 0.04;       // R — green tones
            colors[i3 + 1] = t * 0.68 + (1 - t) * 0.24;   // G
            colors[i3 + 2] = t * 0.41 + (1 - t) * 0.18;   // B

            sizes[i] = Math.random() * 2.5 + 0.5;
        }
        return { positions, colors, sizes };
    }, [count]);

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 },
            },
            vertexShader: `
        uniform float uTime;
        uniform float uPixelRatio;
        attribute float aSize;
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec3 pos = position;
          // Gentle organic sway
          pos.x += sin(uTime * 0.15 + position.y * 0.3) * 0.4;
          pos.y += cos(uTime * 0.12 + position.x * 0.25) * 0.35;
          pos.z += sin(uTime * 0.08 + position.x * 0.2) * 0.2;

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPos;

          float size = aSize * uPixelRatio * (180.0 / -mvPos.z);
          gl_PointSize = max(size, 1.0);

          vColor = color;
          float dist = length(mvPos.xyz);
          vAlpha = smoothstep(18.0, 4.0, dist) * 0.6;
        }
      `,
            fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;

          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 2.0);

          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
            transparent: true,
            depthWrite: false,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
        }
        // Very slow, gentle camera drift
        state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.03) * 1.5;
        state.camera.position.y = Math.cos(state.clock.elapsedTime * 0.02) * 0.8;
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <points ref={meshRef} material={shaderMaterial}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
                <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
            </bufferGeometry>
        </points>
    );
}

// Gentle floating leaf-like shapes
function FloatingLeaves() {
    const groupRef = useRef();
    const leaves = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            position: [
                (Math.random() - 0.5) * 14,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 6 - 3,
            ],
            scale: Math.random() * 0.25 + 0.08,
            speed: Math.random() * 0.3 + 0.1,
        }));
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.children.forEach((child, i) => {
                const leaf = leaves[i];
                child.position.y += Math.sin(state.clock.elapsedTime * leaf.speed + i) * 0.002;
                child.rotation.x = state.clock.elapsedTime * 0.1 * leaf.speed;
                child.rotation.z = state.clock.elapsedTime * 0.08 * leaf.speed;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {leaves.map((leaf, i) => (
                <mesh key={i} position={leaf.position} scale={leaf.scale}>
                    <icosahedronGeometry args={[1, 0]} />
                    <meshBasicMaterial
                        color="#4DAA6A"
                        wireframe
                        transparent
                        opacity={0.12}
                    />
                </mesh>
            ))}
        </group>
    );
}

export default function ParticleBackground() {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}
            >
                <Particles />
                <FloatingLeaves />
                <ambientLight intensity={0.08} />
            </Canvas>
            {/* Forest gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-forest-700/40 via-transparent to-forest-700 pointer-events-none" />
        </div>
    );
}
