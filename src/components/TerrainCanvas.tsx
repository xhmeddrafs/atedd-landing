import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TerrainCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#050505');

    // Camera - orthographic for isometric feel
    const aspect = width / height;
    const frustumSize = 50;
    const camera = new THREE.OrthographicCamera(
      frustumSize * aspect / -2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      frustumSize / -2,
      1,
      2000
    );
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Mouse tracking
    const mouse = { x: 0, y: 0, worldX: 0, worldY: 0 };

    // Terrain geometry
    const planeSize = 120;
    const segments = 40;
    const geometry = new THREE.PlaneGeometry(planeSize, planeSize, segments, segments);
    geometry.rotateX(-Math.PI / 2);

    // Store original positions
    const positions = geometry.attributes.position;
    const originalPositions = new Float32Array(positions.count * 3);
    for (let i = 0; i < positions.count; i++) {
      originalPositions[i * 3] = positions.getX(i);
      originalPositions[i * 3 + 1] = positions.getY(i);
      originalPositions[i * 3 + 2] = positions.getZ(i);
    }

    // Wireframe with thick lines using LineSegments
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: '#CCFF00',
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    scene.add(wireframe);

    // Also add a secondary grid for depth
    const gridHelper = new THREE.GridHelper(planeSize, segments, '#CCFF00', '#1a1a00');
    gridHelper.position.y = -0.5;
    gridHelper.material.opacity = 0.15;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Animation state
    let time = 0;
    const speed = 0.8;
    const clock = new THREE.Clock();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Convert to approximate world space
      mouse.worldX = mouse.x * planeSize * 0.4;
      mouse.worldY = mouse.y * planeSize * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const delta = clock.getDelta();
      time += speed * delta;

      // Camera sway
      camera.position.x = Math.sin(time * 0.2) * 10 + 50;
      camera.position.z = Math.cos(time * 0.2) * 10 + 50;
      camera.lookAt(0, 0, 0);

      // Infinite drift - move terrain instead of camera for endless feel
      const driftZ = (time * 8) % (planeSize / segments * 2);
      wireframe.position.z = driftZ;
      gridHelper.position.z = driftZ;

      // Vertex displacement based on mouse
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const vx = originalPositions[i * 3];
        const vz = originalPositions[i * 3 + 2] + driftZ;
        
        // Distance from mouse influence
        const dx = vx - mouse.worldX;
        const dz = vz - mouse.worldY;
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        let targetY = originalPositions[i * 3 + 1];
        
        if (dist < 25) {
          const normalizedDist = 1 - (dist / 25);
          const displace = Math.pow(normalizedDist, 1.5) * -8;
          targetY = displace;
        }

        // Smooth interpolation
        const currentY = posAttr.getY(i);
        posAttr.setY(i, currentY + (targetY - currentY) * delta * 5);
      }
      posAttr.needsUpdate = true;

      // Update edges geometry after vertex displacement
      wireframe.geometry.dispose();
      wireframe.geometry = new THREE.EdgesGeometry(geometry);

      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.offsetWidth || window.innerWidth;
      const h = container.offsetHeight || window.innerHeight;
      const a = w / h;
      
      camera.left = frustumSize * a / -2;
      camera.right = frustumSize * a / 2;
      camera.top = frustumSize / 2;
      camera.bottom = frustumSize / -2;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      geometry.dispose();
      edges.dispose();
      lineMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={canvasRef} 
      className="absolute inset-0 z-0"
      style={{ background: '#050505' }}
    />
  );
};

export default TerrainCanvas;
