import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, Edges, Icosahedron, Box } from '@react-three/drei';
import * as THREE from 'three';

function ArchitecturalStructure() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef}>
        {/* 外层虚幻框架 */}
        <Icosahedron args={[2.2, 1]} >
          <meshBasicMaterial color="#4F46E5" wireframe transparent opacity={0.15} />
        </Icosahedron>
        
        {/* 内层稳固核心 */}
        <Box args={[1.5, 1.5, 1.5]}>
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.5} transparent opacity={0.9} />
          <Edges scale={1} threshold={15} color="#4F46E5" />
        </Box>
        
        {/* 悬浮节点 */}
        <mesh position={[1.8, 1.2, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#F59E0B" />
        </mesh>
        <mesh position={[-1.5, -1, 1.2]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
      </group>
    </Float>
  );
}

export function Scene3D() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#F59E0B" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#4F46E5" />
        <ArchitecturalStructure />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
