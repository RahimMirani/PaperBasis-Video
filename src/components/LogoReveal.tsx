import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Icon flies in from top with rotation
  const iconEntry = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  });

  const iconY = interpolate(iconEntry, [0, 1], [-400, 0]);
  const iconRotation = interpolate(iconEntry, [0, 1], [-45, 0]);
  const iconScale = interpolate(iconEntry, [0, 1], [0.5, 1]);

  // Icon pulse effect
  const pulseFrame = frame - 30;
  const pulse =
    pulseFrame > 0
      ? spring({
          frame: pulseFrame,
          fps,
          config: { damping: 8, stiffness: 200 },
        })
      : 0;
  const pulseScale = interpolate(pulse, [0, 0.5, 1], [1, 1.15, 1]);

  // Logo text fades in after icon settles
  const textDelay = 35;
  const textEntry = spring({
    frame: frame - textDelay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const textOpacity = interpolate(textEntry, [0, 1], [0, 1]);
  const textX = interpolate(textEntry, [0, 1], [60, 0]);

  // Subtle glow effect behind icon
  const glowOpacity = interpolate(frame, [20, 50], [0, 0.4], {
    extrapolateRight: "clamp",
  });

  // Exit animation - everything scales up and fades
  const exitStart = 75;
  const exitProgress = interpolate(frame, [exitStart, 90], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 1.2]);
  const exitOpacity = interpolate(exitProgress, [0, 0.5, 1], [1, 1, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFBF5",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 40,
          transform: `scale(${exitScale})`,
          opacity: exitOpacity,
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            background:
              "radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)",
            opacity: glowOpacity,
            left: -50,
            top: -80,
          }}
        />

        {/* Paper airplane icon */}
        <div
          style={{
            transform: `translateY(${iconY}px) rotate(${iconRotation}deg) scale(${iconScale * pulseScale})`,
          }}
        >
          <Img
            src={staticFile("PaperBasis-Icon.png")}
            style={{
              width: 180,
              height: "auto",
            }}
          />
        </div>

        {/* Logo text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
          }}
        >
          <span
            style={{
              fontSize: 120,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            PaperBasis
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
