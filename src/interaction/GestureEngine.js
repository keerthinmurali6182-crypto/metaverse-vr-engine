export class GestureEngine {
    constructor() {
        this.previousPosition = { x: 0, y: 0, z: 0 };
        this.gaitVelocityThreshold = 1.8; // Trigger barrier for stride calculations
    }

    analyzeControllerMetrics(controller, frame) {
        if (!controller) return null;

        const currentPosition = controller.position;
        
        // Calculate Euclidean distance delta change across spatial structures
        const dx = currentPosition.x - this.previousPosition.x;
        const dy = currentPosition.y - this.previousPosition.y;
        const dz = currentPosition.z - this.previousPosition.z;
        
        const velocity = Math.sqrt(dx*dx + dy*dy + dz*dz) * 60; // Approximate velocity scaled to frame refresh rates

        // Update step tracking cache
        this.previousPosition.copy(currentPosition);

        // Classify Gesture outputs based on physical mechanics
        if (velocity > this.gaitVelocityThreshold) {
            return {
                gestureType: "GAIT_LOCOMOTION_DETECTED",
                intensity: velocity,
                hapticFeedbackSignal: true
            };
        }
        return null;
    }

    triggerHapticFeedback(session, controller, duration = 15, intensity = 0.6) {
        // Verifies WebXR input source configuration capabilities support game-pad haptic feedback gloves
        const gamepad = controller.inputSource ? controller.inputSource.gamepad : null;
        if (gamepad && gamepad.hapticActuators && gamepad.hapticActuators.length > 0) {
            gamepad.hapticActuators[0].pulse(intensity, duration);
            console.log("⚡ Haptic pulse dispatched to physical gloves.");
        }
    }
}