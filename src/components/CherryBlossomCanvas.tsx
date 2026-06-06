import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spinSpeed: number;
  opacity: number;
  swayAmplitude: number;
  swaySpeed: number;
  swayOffset: number;
}

export default function CherryBlossomCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let petals: Petal[] = [];
    const maxPetals = 45;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Helper to generate a petal
    const createPetal = (isOnStart = false): Petal => {
      const size = Math.random() * 8 + 4;
      return {
        x: Math.random() * canvas.width,
        y: isOnStart ? Math.random() * canvas.height : -20,
        size,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 0.5 - 0.25 - 0.5, // Drift slightly to the left
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() * 0.02 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        opacity: Math.random() * 0.4 + 0.3,
        swayAmplitude: Math.random() * 1.5 + 0.5,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    // Initialize petals array
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(true));
    }

    const drawPetal = (p: Petal) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      
      // Draw a cherry blossom blossom drop using bezier curves
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size, -p.size, -p.size * 1.5, p.size / 2, 0, p.size);
      ctx.bezierCurveTo(p.size * 1.5, p.size / 2, p.size, -p.size, 0, 0);
      
      // Soft translucent cinematic pink tones
      ctx.fillStyle = `rgba(255, 183, 197, ${p.opacity})`;
      ctx.fill();
      
      // Add a tiny delicate accent lines on the petal
      ctx.beginPath();
      ctx.moveTo(0, p.size * 0.2);
      ctx.lineTo(0, p.size * 0.8);
      ctx.strokeStyle = `rgba(240, 120, 140, ${p.opacity * 0.8})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.restore();
    };

    const updateAndDraw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Apply movement including a cyclic horizontal sway
        p.y += p.speedY;
        p.swayOffset += p.swaySpeed;
        const sway = Math.sin(p.swayOffset) * p.swayAmplitude;
        p.x += p.speedX + sway;
        p.angle += p.spinSpeed;

        // Draw it
        drawPetal(p);

        // Recycle petal if it falls below screen or wanders way off sides
        if (p.y > canvas.height + 20 || p.x < -20 || p.x > canvas.width + 20) {
          petals[i] = createPetal();
        }
      }

      animationFrameId = requestAnimationFrame(updateAndDraw);
    };

    updateAndDraw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="sakura-canvas"
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 block"
    />
  );
}
