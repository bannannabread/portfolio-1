import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, Line } from '@react-three/drei'
import * as THREE from 'three'

// ── Node positions — hand-tuned for visual balance ──
const NODES = [
  // Design cluster — left side
  { id: 'Figma',             pos: [-2.5,  1.2,  0.3], category: 'design' },
  { id: 'Prototyping',       pos: [-3.0, -0.5,  0.8], category: 'design' },
  { id: 'User Research',     pos: [-1.8,  2.0, -0.5], category: 'design' },
  { id: 'Usability Testing', pos: [-3.2,  0.8, -0.6], category: 'design' },
  { id: 'Design Systems',    pos: [-1.5, -1.2,  0.2], category: 'design' },
  { id: 'Accessibility',     pos: [-2.0,  0.2,  1.5], category: 'design' },

  // Dev cluster — right side
  { id: 'React.js',          pos: [ 2.8,  1.0,  0.2], category: 'dev' },
  { id: 'TypeScript',        pos: [ 3.2, -0.3,  0.7], category: 'dev' },
  { id: 'Python',            pos: [ 1.8,  2.2, -0.3], category: 'dev' },
  { id: 'C++',               pos: [ 3.0,  0.5, -1.0], category: 'dev' },
  { id: 'React Native',      pos: [ 2.2, -1.5,  0.5], category: 'dev' },
  { id: 'Node.js',           pos: [ 1.5,  0.8,  1.8], category: 'dev' },
  { id: 'FastAPI',           pos: [ 2.0, -0.5,  1.5], category: 'dev' },
  { id: 'REST APIs',         pos: [ 2.5,  2.0,  1.0], category: 'dev' },

  // Tools — center/front
  { id: 'Git & GitHub',      pos: [ 0.2,  2.5,  0.5], category: 'tools' },
  { id: 'VS Code',           pos: [-0.5, -2.0,  0.8], category: 'tools' },
  { id: 'Docker',            pos: [ 0.8, -1.8, -0.5], category: 'tools' },
  { id: 'Figma (Proto)',     pos: [-0.3,  0.5,  2.5], category: 'tools' },
  { id: 'Jupyter',           pos: [ 0.5,  1.5, -2.2], category: 'tools' },
]

// Edges — pairs of node IDs to connect with lines
const EDGES = [
  ['Figma', 'Prototyping'], ['Figma', 'Design Systems'],
  ['User Research', 'Usability Testing'], ['Usability Testing', 'Figma'],
  ['React.js', 'TypeScript'], ['React.js', 'React Native'],
  ['React.js', 'Node.js'], ['TypeScript', 'C++'],
  ['Git & GitHub', 'React.js'], ['Git & GitHub', 'Figma'],
  ['Figma', 'User Research'], ['Python', 'Jupyter'],
  ['Docker', 'VS Code'], ['Design Systems', 'Accessibility'],
  ['FastAPI', 'Python'], ['REST APIs', 'FastAPI'], ['React.js', 'REST APIs'],
]

const CATEGORY_COLORS = {
  design: '#FF6B9D',
  dev:    '#FF8C69',
  tools:  '#FFD166',
}

// ── Single node sphere ──────────────────────────────
function SkillNode({ node, onHover, hoveredId }) {
  const meshRef  = useRef(null)
  const isHovered = hoveredId === node.id
  const color    = CATEGORY_COLORS[node.category]

  useFrame((state) => {
    if (!meshRef.current) return
    // Pulse scale — gentle breathing animation
    const t = state.clock.elapsedTime
    const pulse = 1 + Math.sin(t * 1.5 + node.pos[0]) * 0.04
    meshRef.current.scale.setScalar(isHovered ? 1.5 : pulse)
  })

  return (
    <group position={node.pos}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => onHover(node.id)}
        onPointerLeave={() => onHover(null)}
      >
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 1.5 : 0.6}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={isHovered ? 0.25 : 0.08}
          roughness={1}
        />
      </mesh>

      {/* Label — shows on hover */}
      {isHovered && (
        <Html
          center
          distanceFactor={6}
          style={{ pointerEvents: 'none' }}
        >
          <div className="constellation-label">
            {node.id}
          </div>
        </Html>
      )}
    </group>
  )
}

// ── Edge lines ────────────────────────────────────
function ConstellationEdges({ nodes }) {
  const nodeMap = useMemo(() => {
    const m = {}
    nodes.forEach(n => { m[n.id] = n.pos })
    return m
  }, [nodes])

  return (
    <>
      {EDGES.map(([a, b], i) => {
        if (!nodeMap[a] || !nodeMap[b]) return null
        return (
          <Line
            key={i}
            points={[nodeMap[a], nodeMap[b]]}
            color="#FF6B9D"
            lineWidth={0.4}
            transparent
            opacity={0.15}
          />
        )
      })}
    </>
  )
}

// ── Scene ─────────────────────────────────────────
function ConstellationScene() {
  const [hoveredId, setHoveredId] = useState(null)

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]}   intensity={1.2} color="#FF6B9D" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#FFD166" />

      {/* Edges */}
      <ConstellationEdges nodes={NODES} />

      {/* Nodes */}
      {NODES.map(node => (
        <SkillNode
          key={node.id}
          node={node}
          onHover={setHoveredId}
          hoveredId={hoveredId}
        />
      ))}

      {/* Orbit — auto-rotate, user can drag to orbit */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.4}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 3 / 4}
      />
    </>
  )
}

// ── Main export ───────────────────────────────────
export default function SkillConstellation() {
  return (
    <div className="constellation-canvas-wrap">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        style={{ background: 'transparent' }}
        gl={{ antialias: true, alpha: true }}
      >
        <ConstellationScene />
      </Canvas>
      <p className="constellation-hint">drag to explore · hover nodes for details</p>
    </div>
  )
}
