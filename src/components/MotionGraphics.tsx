import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  spring,
} from "remotion";
import React from "react";

// Floating animated shapes for background energy
export const FloatingShapes: React.FC<{
  count?: number;
  colors?: string[];
  speed?: number;
}> = ({
  count = 8,
  colors = ["#f59e0b", "#10b981", "#f97316", "#ec4899", "#8b5cf6"],
  speed = 1,
}) => {
  const frame = useCurrentFrame();

  const shapes = Array.from({ length: count }, (_, i) => {
    const baseX = (i * 400 + 100) % 3840;
    const baseY = (i * 300 + 150) % 2160;
    const size = 40 + (i % 4) * 30;
    const color = colors[i % colors.length];
    const phase = i * 0.7;

    const x = baseX + Math.sin(frame * 0.02 * speed + phase) * 80;
    const y = baseY + Math.cos(frame * 0.015 * speed + phase) * 60;
    const rotation = frame * (0.5 + i * 0.1) * speed;
    const scale = 0.8 + Math.sin(frame * 0.03 + phase) * 0.2;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: i % 2 === 0 ? "50%" : i % 3 === 0 ? "30%" : "10%",
          transform: `rotate(${rotation}deg) scale(${scale})`,
          opacity: 0.15,
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {shapes}
    </AbsoluteFill>
  );
};

// Animated gradient orbs
export const GradientOrbs: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  const frame = useCurrentFrame();

  const orb1X = 800 + Math.sin(frame * 0.02) * 200;
  const orb1Y = 400 + Math.cos(frame * 0.015) * 150;
  const orb2X = 2800 + Math.cos(frame * 0.018) * 250;
  const orb2Y = 1600 + Math.sin(frame * 0.022) * 180;
  const orb3X = 1900 + Math.sin(frame * 0.025) * 300;
  const orb3Y = 1000 + Math.cos(frame * 0.02) * 200;

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {/* Orb 1 - Amber/Orange */}
      <div
        style={{
          position: "absolute",
          left: orb1X,
          top: orb1Y,
          width: 800,
          height: 800,
          background: dark
            ? "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Orb 2 - Emerald */}
      <div
        style={{
          position: "absolute",
          left: orb2X,
          top: orb2Y,
          width: 900,
          height: 900,
          background: dark
            ? "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
      {/* Orb 3 - Coral/Pink */}
      <div
        style={{
          position: "absolute",
          left: orb3X,
          top: orb3Y,
          width: 700,
          height: 700,
          background: dark
            ? "radial-gradient(circle, rgba(249,115,22,0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </AbsoluteFill>
  );
};

// Animated lines/paths
export const AnimatedLines: React.FC<{ variant?: "horizontal" | "diagonal" }> = ({
  variant = "horizontal",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lines = Array.from({ length: 5 }, (_, i) => {
    const delay = i * 8;
    const progress = spring({
      frame: frame - delay,
      fps,
      config: { damping: 25, stiffness: 100 },
    });
    const width = interpolate(progress, [0, 1], [0, 100]);
    const opacity = interpolate(progress, [0, 0.3, 1], [0, 0.6, 0.3]);

    if (variant === "diagonal") {
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${10 + i * 20}%`,
            top: 0,
            width: 3,
            height: `${width}%`,
            background: `linear-gradient(to bottom, transparent, rgba(245,158,11,${opacity}), transparent)`,
            transform: "rotate(45deg)",
            transformOrigin: "top left",
          }}
        />
      );
    }

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: 0,
          top: `${20 + i * 15}%`,
          width: `${width}%`,
          height: 2,
          background: `linear-gradient(to right, transparent, rgba(245,158,11,${opacity}), transparent)`,
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {lines}
    </AbsoluteFill>
  );
};

// Particle burst effect
export const ParticleBurst: React.FC<{
  startFrame?: number;
  x?: number;
  y?: number;
  color?: string;
}> = ({
  startFrame = 0,
  x = 1920,
  y = 1080,
  color = "#f59e0b",
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = frame - startFrame;

  if (adjustedFrame < 0) return null;

  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = adjustedFrame * 8;
    const particleX = x + Math.cos(angle) * distance;
    const particleY = y + Math.sin(angle) * distance;
    const opacity = interpolate(adjustedFrame, [0, 30], [1, 0], {
      extrapolateRight: "clamp",
    });
    const scale = interpolate(adjustedFrame, [0, 20], [1, 0.3], {
      extrapolateRight: "clamp",
    });

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: particleX,
          top: particleY,
          width: 16,
          height: 16,
          backgroundColor: color,
          borderRadius: "50%",
          opacity,
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      {particles}
    </AbsoluteFill>
  );
};

// Grid pattern background
export const GridPattern: React.FC<{ dark?: boolean; animated?: boolean }> = ({
  dark = false,
  animated = true,
}) => {
  const frame = useCurrentFrame();
  const offset = animated ? frame * 0.5 : 0;

  return (
    <AbsoluteFill
      style={{
        backgroundImage: `
          linear-gradient(${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px),
          linear-gradient(90deg, ${dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        backgroundPosition: `${offset}px ${offset}px`,
        pointerEvents: "none",
      }}
    />
  );
};
