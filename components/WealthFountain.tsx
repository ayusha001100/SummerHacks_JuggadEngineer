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
        const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        const coins: any[] = [];
        const coinGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
        const coinMat = new THREE.MeshStandardMaterial({ 
            color: 0xC5A55A, 
            metalness: 0.9, 
            roughness: 0.1, 
            emissive: 0xC5A55A, 
            emissiveIntensity: 0.2 
        });

        const initCoin = (coin: any) => {
            coin.position.set((Math.random() - 0.5) * 1.5, -6, (Math.random() - 0.5) * 1.5);
            coin.velocity = { 
                x: (Math.random() - 0.5) * 0.08, 
                y: 0.15 + Math.random() * 0.15, 
                z: (Math.random() - 0.5) * 0.08 
            };
            coin.rotationV = { x: Math.random() * 0.1, y: Math.random() * 0.1 };
        };

        for (let i = 0; i < 35; i++) {
            const coin = new THREE.Mesh(coinGeo, coinMat);
            initCoin(coin);
            coin.position.y = -10;
            scene.add(coin);
            coins.push(coin);
        }

        const ambient = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambient);
        const point = new THREE.PointLight(0xC5A55A, 5, 20);
        point.position.set(0, -4, 5);
        scene.add(point);

        camera.position.z = 15;
        camera.position.y = 2;

        let frameId: number;
        let wealthAccumulator = 0;

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            coins.forEach(coin => {
                coin.position.x += coin.velocity.x;
                coin.position.y += coin.velocity.y;
                coin.position.z += coin.velocity.z;
                coin.velocity.y -= 0.005;
                coin.rotation.x += coin.rotationV.x;
                coin.rotation.y += coin.rotationV.y;

                if (coin.position.y < -7) {
                    initCoin(coin);
                    wealthAccumulator += 28400;
                    if (wealthAccumulator > 1420000) wealthAccumulator = 1420000;
                    setWealth(wealthAccumulator);
                }
            });
            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId);
            renderer.dispose();
        };
    }, []);

    return (
        <div className="relative w-full h-full bg-black">
            <div ref={containerRef} className="w-full h-full" />
            <div className="absolute bottom-20 w-full text-center pointer-events-none">
                <div className="font-serif text-[80px] text-white leading-none">
                    ₹{wealth.toLocaleString()}
                </div>
                <div className="text-[10px] font-black text-[#C5A55A] tracking-[5px] uppercase mt-2 opacity-60">
                    Estimated Asset Reclaim
                </div>
            </div>
        </div>
    );
};

export default WealthFountain;
