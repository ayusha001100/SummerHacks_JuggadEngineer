'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const WealthFountain = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [wealth, setWealth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const scene = new THREE.Scene();
        // Set a very dark grey background to ensure visibility against the black div
        scene.background = new THREE.Color(0x050505);

        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight || 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // CREATE COINS
        const coins: any[] = [];
        const coinGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
        const coinMat = new THREE.MeshPhongMaterial({ 
            color: 0xD4AF37, 
            emissive: 0x221100, 
            specular: 0xffffff,
            shininess: 100
        });

        const initCoin = (coin: any) => {
            // Start coins at the bottom of the visible area
            coin.position.set((Math.random() - 0.5) * 4, -8, (Math.random() - 0.5) * 2);
            coin.velocity = { 
                x: (Math.random() - 0.5) * 0.1, 
                y: 0.4 + Math.random() * 0.4, 
                z: (Math.random() - 0.5) * 0.1 
            };
            coin.rotationV = { 
                x: Math.random() * 0.1, 
                y: Math.random() * 0.1,
                z: Math.random() * 0.1
            };
        };

        for (let i = 0; i < 60; i++) {
            const coin = new THREE.Mesh(coinGeo, coinMat);
            initCoin(coin);
            // Stagger them vertically so they don't all jump at once
            coin.position.y = -10 - (Math.random() * 30);
            scene.add(coin);
            coins.push(coin);
        }

        // LIGHTING
        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambient);
        
        const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
        sunLight.position.set(5, 5, 10);
        scene.add(sunLight);

        const fillLight = new THREE.PointLight(0xC5A55A, 10, 50);
        fillLight.position.set(-5, -2, 5);
        scene.add(fillLight);

        camera.position.z = 12;
        camera.position.y = 0;

        let frameId: number;
        let wealthAccumulator = 0;

        const updateSize = () => {
            if (!container) return;
            const width = container.clientWidth;
            const height = container.clientHeight;
            if (width > 0 && height > 0) {
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        };

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            
            // Ensure size is correct (handles initial layout delays)
            if (renderer.domElement.width === 0) {
                updateSize();
            }

            coins.forEach(coin => {
                coin.position.x += coin.velocity.x;
                coin.position.y += coin.velocity.y;
                coin.position.z += coin.velocity.z;
                
                coin.velocity.y -= 0.012; // Gravity
                
                coin.rotation.x += coin.rotationV.x;
                coin.rotation.y += coin.rotationV.y;
                coin.rotation.z += coin.rotationV.z;

                // Reset if they fall below the view
                if (coin.position.y < -12) {
                    initCoin(coin);
                    // Update wealth counter
                    wealthAccumulator += 1250;
                    if (wealthAccumulator > 1420000) wealthAccumulator = 1420000;
                    setWealth(wealthAccumulator);
                }
            });

            renderer.render(scene, camera);
        };

        updateSize();
        animate();

        const handleResize = () => updateSize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div className="relative w-full h-full bg-[#050505]">
            <div ref={containerRef} className="w-full h-full" />
            
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

            <div className="absolute bottom-20 w-full text-center pointer-events-none z-20">
                <div className="font-serif text-[80px] text-white leading-none tracking-tighter">
                    ₹{wealth.toLocaleString()}
                </div>
                <div className="text-[10px] font-black text-[#C5A55A] tracking-[5px] uppercase mt-4 opacity-60">
                    Estimated Asset Reclaim
                </div>
            </div>
        </div>
    );
};

export default WealthFountain;
