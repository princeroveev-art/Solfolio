"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Dual-tone particles for premium neon depth (subtle + performant)
    const particles: Array<{
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
    }> = [];

    for (let i = 0; i < 38; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.2 + 0.4,
        opacity: Math.random() * 0.25 + 0.05,
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        const hue = i % 2 === 0 ? "a78bfa" : "60a5fa";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `#${hue}${alpha}`;
        ctx.fill();

        // Connect nearby — single color lines
        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = i % 2 === 0
              ? `rgba(167,139,250,${0.035 * (1 - dist / 110)})`
              : `rgba(96,165,250,${0.03 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}
      aria-hidden="true"
    >
      {/* Base canvas bg — handled by body in globals.css */}

      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.014,
          backgroundImage:
            "linear-gradient(rgba(167,139,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Soft cinematic glows */}
      <div
        style={{
          position: "absolute",
          top: "-170px",
          left: "40%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "560px",
          opacity: 0.16,
          background: "radial-gradient(ellipse, rgba(168,85,247,0.65) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-120px",
          right: "-180px",
          width: "620px",
          height: "460px",
          opacity: 0.13,
          background: "radial-gradient(ellipse, rgba(59,130,246,0.65) 0%, transparent 68%)",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, opacity: 0.7 }}
      />
    </div>
  );
}
