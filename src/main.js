import * as THREE from 'three';
import { World } from './env/World.js';
import { VRManager } from './vr/VRManager.js';
import { GestureEngine } from './interaction/GestureEngine.js';

class MetaverseEngine {
    constructor() {
        this.container = document.getElementById('canvas-container');
        this.scene = new THREE.Scene();
        
        // Setup Perspective Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1.6, 5); // 1.6 meters matches the baseline human eye height metric in VR

        // Configure WebGL WebXR Compliant Renderer Core
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // Bind Infrastructure Addons
        this.world = new World(this.scene);
        this.vrManager = new VRManager(this.renderer);
        this.gestureEngine = new GestureEngine();

        this.init();
    }

    init() {
        this.world.generateGridUniverse();
        this.vrManager.enableWebXRAccess();
        
        // Standard Window Resize Listener Hook
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Configure WebXR Controller tracking attachments
        this.controller1 = this.renderer.xr.getController(0);
        this.scene.add(this.controller1);

        // Launch Thread loop engine execution cycle
        this.renderer.setAnimationLoop((time, frame) => this.renderCycleLoop(time, frame));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    renderCycleLoop(time, frame) {
        // Process Gesture evaluation metrics frame-by-frame
        if (frame) {
            const session = this.renderer.xr.getSession();
            const motionInsight = this.gestureEngine.analyzeControllerMetrics(this.controller1, frame);
            
            if (motionInsight && motionInsight.gestureType === "GAIT_LOCOMOTION_DETECTED") {
                // Fire a subtle haptic signal when physical hand gestures or steps cross threshold limits
                this.gestureEngine.triggerHapticFeedback(session, this.controller1);
            }
        }

        // Render Frame output to screen/VR displays
        this.renderer.render(this.scene, this.camera);
    }
}

// Instantiate App Engine instance on layout initialization
window.addEventListener('DOMContentLoaded', () => {
    new MetaverseEngine();
});