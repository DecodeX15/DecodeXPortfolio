"use client"

import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/*  Torus-knot particle field – ~800 points that shimmer & react to   */
/*  mouse movement                                                     */
/* ------------------------------------------------------------------ */
function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!)
  const mouseRef = useRef(new THREE.Vector2(0, 0))
  const { viewport } = useThree()

  // Track normalised mouse position mapped to world-ish coords
  const onPointerMove = useCallback(
    (e: THREE.Event) => {
      // not used directly – we read the Three state instead
    },
    []
  )

  // Generate torus-knot sample positions + random offsets
  const { positions, basePositions, colors, sizes } = useMemo(() => {
    const count = 800
    const pos = new Float32Array(count * 3)
    const base = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const siz = new Float32Array(count)

    const palette = [
      new THREE.Color('#8b5cf6'), // purple
      new THREE.Color('#3b82f6'), // blue
      new THREE.Color('#ec4899'), // pink
    ]

    // Torus knot parametric: p=2, q=3, R=2, r=0.6
    const p = 2
    const q = 3
    const R = 2
    const r = 0.6

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2 * p
      // Torus-knot base curve
      const cr = R + r * Math.cos(q * t / p)
      const x = cr * Math.cos(t)
      const y = cr * Math.sin(t)
      const z = r * Math.sin(q * t / p)

      // Add gentle scatter so it feels organic
      const scatter = 0.25
      const bx = x + (Math.random() - 0.5) * scatter
      const by = y + (Math.random() - 0.5) * scatter
      const bz = z + (Math.random() - 0.5) * scatter

      base[i * 3] = bx
      base[i * 3 + 1] = by
      base[i * 3 + 2] = bz

      pos[i * 3] = bx
      pos[i * 3 + 1] = by
      pos[i * 3 + 2] = bz

      // Colour – pick from palette with slight random blend
      const c = palette[i % palette.length].clone()
      c.lerp(palette[(i + 1) % palette.length], Math.random() * 0.4)
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b

      siz[i] = 0.03 + Math.random() * 0.04
    }

    return { positions: pos, basePositions: base, colors: col, sizes: siz }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()

    // Mouse in world-space (approximate)
    const mx = (state.pointer.x * viewport.width) / 2
    const my = (state.pointer.y * viewport.height) / 2

    // Slow global rotation
    pointsRef.current.rotation.y = time * 0.08
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.15

    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array

    const count = arr.length / 3
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Base position with gentle floating sine offset
      const bx = basePositions[i3]
      const by = basePositions[i3 + 1]
      const bz = basePositions[i3 + 2]

      let fx = bx + Math.sin(time * 0.6 + i * 0.3) * 0.04
      let fy = by + Math.cos(time * 0.5 + i * 0.2) * 0.04
      let fz = bz + Math.sin(time * 0.4 + i * 0.1) * 0.04

      // Mouse repulsion (in rotated local space → approx world for effect)
      const dx = fx - mx
      const dy = fy - my
      const dist = Math.sqrt(dx * dx + dy * dy)
      const repulseRadius = 1.8
      if (dist < repulseRadius) {
        const force = (1 - dist / repulseRadius) * 0.45
        fx += dx * force
        fy += dy * force
      }

      arr[i3] = fx
      arr[i3 + 1] = fy
      arr[i3 + 2] = fz
    }

    posAttr.needsUpdate = true

    // Shimmer: modulate material opacity & size attenuation
    const mat = pointsRef.current.material as THREE.PointsMaterial
    mat.opacity = 0.75 + Math.sin(time * 1.5) * 0.15
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating geometric shapes (tiny octahedrons & tetrahedrons)        */
/* ------------------------------------------------------------------ */
function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null!)

  // Pre-generate random transforms
  const shapes = useMemo(() => {
    const arr: {
      position: [number, number, number]
      rotation: [number, number, number]
      scale: number
      speed: number
      type: 'octa' | 'tetra'
      color: string
    }[] = []

    const colors = ['#8b5cf6', '#3b82f6', '#ec4899']

    for (let i = 0; i < 18; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 2,
        ],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ],
        scale: 0.06 + Math.random() * 0.1,
        speed: 0.2 + Math.random() * 0.5,
        type: Math.random() > 0.5 ? 'octa' : 'tetra',
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    groupRef.current.children.forEach((child, i) => {
      const s = shapes[i]
      if (!s) return
      child.rotation.x = s.rotation[0] + t * s.speed * 0.4
      child.rotation.y = s.rotation[1] + t * s.speed * 0.6
      child.position.y = s.position[1] + Math.sin(t * s.speed + i) * 0.3
    })
  })

  return (
    <group ref={groupRef}>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} floatIntensity={0.3} rotationIntensity={0.2}>
          <mesh position={s.position} scale={s.scale}>
            {s.type === 'octa' ? (
              <octahedronGeometry args={[1, 0]} />
            ) : (
              <tetrahedronGeometry args={[1, 0]} />
            )}
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={0.6}
              transparent
              opacity={0.35}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */
export default function Hero3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.7 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ pointerEvents: 'auto' }}>
        <fog attach="fog" args={['#111827', 5, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.3} color="#8b5cf6" />
        <pointLight position={[-5, -3, 3]} intensity={0.2} color="#3b82f6" />

        <ParticleField />
        <FloatingShapes />

        <Stars
          radius={80}
          depth={60}
          count={1500}
          factor={3}
          saturation={0.4}
          fade
          speed={0.8}
        />
      </Canvas>
    </div>
  )
}
