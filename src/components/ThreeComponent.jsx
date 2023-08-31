import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {CameraControls} from '@react-three/drei';
function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function ThreeComponent() {
  return (
    <>
      <h2 style={{margin: "0"}}>This is a React-three/fiber component</h2>
      <Canvas style={{border: "1px solid white"}}>
        <ambientLight />
        <CameraControls makeDefault />
        <pointLight position={[1, 0, 1]} />
        <pointLight position={[0, 1, 1]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </>

  )
}