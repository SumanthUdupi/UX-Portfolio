import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarField = () => {
  const containerRef = useRef(null);
  const animationRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const starCount = 1500;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }

    const starsGeometry = new THREE.BufferGeometry();
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const starsMaterial = new THREE.PointsMaterial({
      color: 0x9f7aea,
      size: 0.06,
      transparent: true,
      opacity: 0.9,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    const resize = () => {
      if (!container) {
        return;
      }
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resize);

    const animate = () => {
      stars.rotation.y += 0.0008;
      stars.rotation.x += 0.0003;
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);

  return <div ref={containerRef} className="starfield-container" />;
};

export default StarField;
