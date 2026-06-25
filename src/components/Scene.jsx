import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, MeshTransmissionMaterial } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function TorusKnot() {
  const meshRef = useRef(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <MeshTransmissionMaterial
          backside
          thickness={0.5}
          roughness={0.1}
          transmission={0.95}
          ior={1.5}
          chromaticAberration={0.06}
          color="#ffffff"
        />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <TorusKnot />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
