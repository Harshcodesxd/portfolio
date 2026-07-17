"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  originX: number;
  originY: number;
  size: number;
  alpha: number;
  speed: number;
}

export default function BackgroundMesh() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const count = 120;

    const initCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Populate interactive star nodes
      stars = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        stars.push({
          x,
          y,
          originX: x,
          originY: y,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.1,
          speed: Math.random() * 0.05 + 0.01,
        });
      }
    };

    initCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      stars.forEach((star) => {
        // Soft pulsing alpha
        star.alpha += star.speed;
        if (star.alpha > 0.7 || star.alpha < 0.1) {
          star.speed = -star.speed;
        }

        // Distance calculations to mouse
        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const limit = 120; // magnetic hover radius

        let drawX = star.x;
        let drawY = star.y;

        if (dist < limit) {
          // Push points away slightly
          const force = (limit - dist) / limit;
          const angle = Math.atan2(dy, dx);
          
          // Displace the star
          drawX -= Math.cos(angle) * force * 15;
          drawY -= Math.sin(angle) * force * 15;
          
          // Make it glow brighter near cursor
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(star.alpha + force * 0.5, 1.0)})`;
        } else {
          // Return to original spot
          star.x += (star.originX - star.x) * 0.05;
          star.y += (star.originY - star.y) * 0.05;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
      {/* Cinematic Film Grain Overlay */}
      <div className="noise-overlay" />

      {/* Floating Animated CSS Blobs (Vercel/Stripe style) */}
      <div className="absolute inset-0 z-0 opacity-40">
        {/* Electric Blue Blob */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-electricBlue/10 filter blur-[150px] animate-pulse-slow" />
        
        {/* Royal Purple Blob */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-royalPurple/10 filter blur-[160px] animate-pulse-slow" />
        
        {/* Soft Cyan Blob */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] rounded-full bg-softCyan/5 filter blur-[130px] animate-pulse-slow" />
      </div>

      {/* Grid line effect (Stripe/Linear style) */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

      {/* Interactive canvas starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 block opacity-60" />
    </div>
  );
}
