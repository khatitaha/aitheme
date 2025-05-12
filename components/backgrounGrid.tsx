import React, { useEffect, useRef } from "react";

const BackgroundGrid = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        let animationFrameId: number;

        // Grid properties
        const gridSize = 40;
        const dotSize = 1;

        // Animation variables
        let time = 0;
        const animate = () => {
            time += 0.5;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            for (let x = 0; x < canvas.width; x += gridSize) {
                for (let y = 0; y < canvas.height; y += gridSize) {
                    // Calculate dot displacement based on sine wave
                    const displacement = Math.sin((x + y) / 300 + time / 30) * 5;

                    // Fade dots based on position (for gradient effect)
                    const opacity = (1 - y / canvas.height) * 0.4;

                    ctx.fillStyle = `rgba(100, 195, 255, ${opacity})`;
                    ctx.beginPath();
                    ctx.arc(x + displacement, y + displacement, dotSize, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            animationFrameId = window.requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default BackgroundGrid;
