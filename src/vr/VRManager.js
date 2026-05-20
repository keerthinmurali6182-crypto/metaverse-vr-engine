import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

export class VRManager {
    constructor(renderer) {
        this.renderer = renderer;
    }

    enableWebXRAccess() {
        // Enforce native internal rendering frameworks to accept XR pipelines
        this.renderer.xr.enabled = true;
        
        // Append the standard immersive hardware-check trigger button element interface to DOM
        const vrButtonElement = VRButton.createButton(this.renderer);
        document.body.appendChild(vrButtonElement);
    }
}