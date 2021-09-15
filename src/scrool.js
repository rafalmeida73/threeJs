import React, { Suspense } from "react";
import "./styles.css";
//Components
import { Canvas, useLoader } from "react-three-fiber";
import { OrbitControls } from 'drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from "three";

function Model({ modelPath }) {
  const gltf = useLoader(GLTFLoader, modelPath)
  return <primitive object={gltf.scene} position={[0, 0, 0]} />
}

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" transparent opacity={0.5} />
    </mesh>
  )
}

function App() {
  return (
    <>
      <Canvas shadowMap invalidateFrameloop camera={{ position: [0, 0, 17], far: 50 }}>
        <OrbitControls
          target={[0, 0, 0]}
          autoRotate={true}
          autoRotateSpeed={3.0}
          enableZoom={false}
          minDistance={0}
          maxDistance={10}
        />
        <ambientLight intensity={1} />
        <spotLight
          intensity={2}
          position={[20, 20, 20]}
          shadow-bias={-0.00005}
          angle={Math.PI / 6}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        <primitive object={new THREE.AxesHelper(10)} />
        <Suspense fallback={<Box />}>
          <mesh position={[0, 0, 0]} scale={[1, 1, 1]}>
            <Model modelPath="/scene.gltf" />
          </mesh>
        </Suspense>
      </Canvas>
    </>
  )
}

export default App;
