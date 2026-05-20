import * as THREE from 'three';

export class World {
    constructor(scene) {
        this.scene = scene;
    }

    generateGridUniverse() {
        // 1. Establish an atmospheric skybox color mesh
        this.scene.background = new THREE.Color(0x0a0a1a);
        this.scene.fog = new THREE.FogExp2(0x0a0a1a, 0.015);

        // 2. Add Ambient & Directional Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
        this.scene.add(ambientLight);

        const neonLight = new THREE.DirectionalLight(0x00ffff, 1.2);
        neonLight.position.set(10, 20, 10);
        this.scene.add(neonLight);

        // 3. Build Infinite Grid Horizon / Floor plate
        const floorGeo = new THREE.PlaneGeometry(1000, 1000);
        const floorMat = new THREE.MeshStandardMaterial({ 
            color: 0x111122, 
            roughness: 0.8,
            metalness: 0.2
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        this.scene.add(floor);

        const gridHelper = new THREE.GridHelper(1000, 100, 0x00ffcc, 0x444466);
        gridHelper.position.y = 0.01;
        this.scene.add(gridHelper);

        // 4. Generate Neon Architectural Cyber-Structures
        this._buildStructures();
    }

    _buildStructures() {
        const boxGeo = new THREE.BoxGeometry(4, 25, 4);
        
        for (let i = 0; i < 40; i++) {
            const boxMat = new THREE.MeshStandardMaterial({
                color: 0x110033,
                emissive: new THREE.Color(Math.random() * 0x330066),
                wireframe: false
            });
            const building = new THREE.Mesh(boxGeo, boxMat);
            
            // Randomly scatter spatial structures across the plain fields
            building.position.x = (Math.random() - 0.5) * 150;
            building.position.z = (Math.random() - 0.5) * 150;
            building.position.y = 12.5; // Sit directly on top of floor plate
            
            this.scene.add(building);
        }
    }
}