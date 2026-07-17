"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<{ text?: string; type?: string } | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Soft spring for the outer trailing glow ring
  const springConfig = { damping: 30, stiffness: 250, mass: 0.6 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], .interactive-item");
      
      if (interactive) {
        const text = interactive.getAttribute("data-cursor-text") || undefined;
        const type = interactive.getAttribute("data-cursor-type") || "expand";
        setHoveredEl({ text, type });
      } else {
        setHoveredEl(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Hide real cursor by adding class to body
    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  const isHovered = hoveredEl !== null;
  const hasText = !!hoveredEl?.text;

  return (
    <>
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer trailing glow ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] border border-white/20 flex items-center justify-center overflow-hidden"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? (hasText ? 80 : 50) : 24,
          height: isHovered ? (hasText ? 80 : 50) : 24,
          backgroundColor: isHovered
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(255, 255, 255, 0)",
          boxShadow: isHovered
            ? "0 0 20px rgba(255, 255, 255, 0.15)"
            : "0 0 0px rgba(255, 255, 255, 0)",
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {hasText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[10px] text-white font-display uppercase tracking-widest font-semibold"
          >
            {hoveredEl.text}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
