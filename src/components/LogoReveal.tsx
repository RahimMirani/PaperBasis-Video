import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { GradientOrbs, ParticleBurst } from "./MotionGraphics";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Icon flies in with dramatic entrance
  const iconEntry = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 60, mass: 1 },
  });

  const iconY = interpolate(iconEntry, [0, 1], [-600, 0]);
  const iconRotation = interpolate(iconEntry, [0, 1], [-60, 0]);
  const iconScale = interpolate(iconEntry, [0, 1], [0.3, 1]);

  // Trail effect behind icon
  const trailOpacity = interpolate(frame, [0, 20, 40], [0, 0.6, 0], {
    extrapolateRight: "clamp",
  });

  // Icon pulse effect with color
  const pulseFrame = frame - 25;
  const pulse = pulseFrame > 0
    ? spring({
        frame: pulseFrame,
        fps,
        config: { damping: 6, stiffness: 180 },
      })
    : 0;
  const pulseScale = interpolate(pulse, [0, 0.5, 1], [1, 1.2, 1]);
  const glowIntensity = interpolate(pulse, [0, 0.5, 1], [0, 1, 0.3]);

  // Logo text with stagger
  const textDelay = 30;
  const textEntry = spring({
    frame: frame - textDelay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const textOpacity = interpolate(textEntry, [0, 1], [0, 1]);
  const textX = interpolate(textEntry, [0, 1], [80, 0]);
  const textScale = interpolate(textEntry, [0, 1], [0.9, 1]);

  // Accent line under logo
  const lineProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 500]);

  // Exit animation
  const exitStart = 70;
  const exitProgress = interpolate(frame, [exitStart, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.3]);
  const exitOpacity = interpolate(exitProgress, [0, 0.6, 1], [1, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated gradient orbs */}
      <GradientOrbs dark />

      {/* Particle burst on impact */}
      <ParticleBurst startFrame={25} x={1720} y={1080} color="#f59e0b" />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 50,
          transform: `scale(${exitScale})`,
          opacity: exitOpacity,
        }}
      >
        {/* Paper airplane icon with glow */}
        <div
          style={{
            position: "relative",
            transform: `translateY(${iconY}px) rotate(${iconRotation}deg) scale(${iconScale * pulseScale})`,
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(245,158,11,0.6) 0%, transparent 60%)",
              opacity: glowIntensity,
              filter: "blur(20px)",
            }}
          />
          {/* Trail */}
          <div
            style={{
              position: "absolute",
              width: 4,
              height: 400,
              left: "50%",
              bottom: "100%",
              background: "linear-gradient(to top, #f59e0b, transparent)",
              opacity: trailOpacity,
              transform: "translateX(-50%)",
            }}
          />
          <Img
            src={staticFile("PaperBasis-Icon.png")}
            style={{
              width: 200,
              height: "auto",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* Logo text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px) scale(${textScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontSize: 140,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            PaperBasis
          </span>
          {/* Animated accent line */}
          <div
            style={{
              width: lineWidth,
              height: 6,
              background: "linear-gradient(90deg, #f59e0b, #10b981)",
              borderRadius: 3,
              marginTop: 10,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
