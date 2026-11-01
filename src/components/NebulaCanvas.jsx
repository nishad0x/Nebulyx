import React, { useEffect, useRef } from 'react';

export default function NebulaCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Multi-tier starfield & celestial dust particles
    const particleCount = Math.min(Math.floor((width * height) / 16000), 75);
    const particles = [];
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 180 };

    for (let i = 0; i < particleCount; i++) {
      const isAccent = Math.random() < 0.22; // 22% carry the Nebulyx cyan glow
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: isAccent ? Math.random() * 1.8 + 1 : Math.random() * 1.2 + 0.5,
        baseAlpha: Math.random() * 0.45 + 0.15,
        alpha: 0,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
        isAccent,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let tick = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      // Smooth mouse damping
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interactive mouse gravity
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let hoverBoost = 0;
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.45;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
          hoverBoost = (1 - dist / mouse.radius) * 0.4;
        }

        // Breathing pulse
        const pulse = Math.sin(tick * p.pulseSpeed + p.pulseOffset) * 0.15;
        p.alpha = Math.min(1, Math.max(0.08, p.baseAlpha + pulse + hoverBoost));

        // Draw particle with gentle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isAccent) {
          ctx.fillStyle = `rgba(0, 200, 255, ${p.alpha})`;
          ctx.shadowColor = 'rgba(0, 200, 255, 0.4)';
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(226, 232, 240, ${p.alpha * 0.75})`;
          ctx.shadowColor = 'transparent';
          ctx.shadowBlur = 0;
        }

        ctx.fill();

        // Connect close particles with synaptic lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist2 / 110) * 0.12 * Math.min(p.alpha, p2.alpha);
            ctx.strokeStyle = p.isAccent || p2.isAccent
              ? `rgba(0, 200, 255, ${lineAlpha * 1.5})`
              : `rgba(148, 163, 184, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Reset shadow for next frame
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}
