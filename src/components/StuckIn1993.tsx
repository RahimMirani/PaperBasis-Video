import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const StuckIn1993: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Year counter animation - counting from 1993 to 2026
  const counterProgress = interpolate(frame, [15, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentYear = Math.floor(1993 + counterProgress * 33);

  // Main text animations
  const line1Progress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const yearProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 8, stiffness: 50 },
  });

  const line2Progress = spring({
    frame: frame - 75,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Glitch effect on year when it reaches 2026
  const isGlitching = frame > 65 && frame < 80;
  const glitchOffset = isGlitching ? Math.sin(frame * 3) * 8 : 0;

  // Pulsing glow when year stops
  const glowPulse = frame > 70 ? Math.sin((frame - 70) * 0.15) * 0.3 + 0.7 : 0;

  // Exit animation
  const exitStart = 95;
  const exitOpacity = interpolate(frame, [exitStart, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 120], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Retro scanlines */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0,0,0,0.15) 3px,
            rgba(0,0,0,0.15) 6px
          )`,
          pointerEvents: "none",
          opacity: 0.4,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
        }}
      >
        {/* Small label */}
        <div
          style={{
            opacity: interpolate(line1Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line1Progress, [0, 1], [40, 0])}px)`,
          }}
        >
          <span
            style={{
              fontSize: 42,
              fontWeight: 500,
              color: "#525252",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Reading research papers since
          </span>
        </div>

        {/* BIG year counter */}
        <div
          style={{
            position: "relative",
            opacity: interpolate(yearProgress, [0, 1], [0, 1]),
            transform: `translateX(${glitchOffset}px) scale(${interpolate(yearProgress, [0, 1], [0.6, 1])})`,
          }}
        >
          {/* Glitch color layers */}
          {isGlitching && (
            <>
              <span
                style={{
                  position: "absolute",
                  fontSize: 380,
                  fontWeight: 900,
                  color: "#ef4444",
                  opacity: 0.7,
                  transform: "translateX(-12px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {currentYear}
              </span>
              <span
                style={{
                  position: "absolute",
                  fontSize: 380,
                  fontWeight: 900,
                  color: "#22c55e",
                  opacity: 0.7,
                  transform: "translateX(12px)",
                  letterSpacing: "-0.02em",
                }}
              >
                {currentYear}
              </span>
            </>
          )}
          <span
            style={{
              fontSize: 380,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              textShadow: glowPulse > 0 ? `0 0 ${glowPulse * 60}px rgba(245,158,11,0.5)` : "none",
            }}
          >
            {currentYear}
          </span>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            opacity: interpolate(line2Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line2Progress, [0, 1], [40, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 30,
          }}
        >
          <div
            style={{
              width: 80,
              height: 4,
              backgroundColor: "#f59e0b",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              fontSize: 56,
              fontWeight: 500,
              color: "#a3a3a3",
            }}
          >
            Nothing has changed.
          </span>
          <div
            style={{
              width: 80,
              height: 4,
              backgroundColor: "#f59e0b",
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
