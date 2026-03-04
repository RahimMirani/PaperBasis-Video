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

  // Year counter animation - counting from 1993 to 2025
  const counterProgress = interpolate(frame, [20, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentYear = Math.floor(1993 + counterProgress * 32);

  // Main text animations
  const line1Progress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const line2Progress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const yearProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 60 },
  });

  // Glitch effect on year
  const glitchOffset = frame > 70 && frame < 85
    ? Math.sin(frame * 2) * 5
    : 0;

  // Old paper visual elements
  const paperProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const paperOpacity = interpolate(paperProgress, [0, 1], [0, 1]);
  const paperScale = interpolate(paperProgress, [0, 1], [0.8, 1]);

  // Exit animation
  const exitStart = 85;
  const exitOpacity = interpolate(frame, [exitStart, 105], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 105], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#1a1a1a",
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
            transparent 2px,
            rgba(0,0,0,0.1) 2px,
            rgba(0,0,0,0.1) 4px
          )`,
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />

      {/* Vignette effect */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Small label */}
        <div
          style={{
            opacity: interpolate(line1Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line1Progress, [0, 1], [30, 0])}px)`,
          }}
        >
          <span
            style={{
              fontSize: 32,
              fontWeight: 500,
              color: "#737373",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Research papers since
          </span>
        </div>

        {/* Big year with retro styling */}
        <div
          style={{
            position: "relative",
            opacity: interpolate(yearProgress, [0, 1], [0, 1]),
            transform: `translateX(${glitchOffset}px) scale(${interpolate(yearProgress, [0, 1], [0.5, 1])})`,
          }}
        >
          {/* Glitch layers */}
          <span
            style={{
              position: "absolute",
              fontSize: 280,
              fontWeight: 800,
              color: "#ef4444",
              opacity: frame > 70 && frame < 85 ? 0.5 : 0,
              transform: "translateX(-8px)",
              letterSpacing: "-0.02em",
            }}
          >
            {currentYear}
          </span>
          <span
            style={{
              position: "absolute",
              fontSize: 280,
              fontWeight: 800,
              color: "#22c55e",
              opacity: frame > 70 && frame < 85 ? 0.5 : 0,
              transform: "translateX(8px)",
              letterSpacing: "-0.02em",
            }}
          >
            {currentYear}
          </span>
          <span
            style={{
              fontSize: 280,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              position: "relative",
            }}
          >
            {currentYear}
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: interpolate(line2Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line2Progress, [0, 1], [30, 0])}px)`,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 60,
              height: 3,
              backgroundColor: "#f59e0b",
            }}
          />
          <span
            style={{
              fontSize: 48,
              fontWeight: 500,
              color: "#a3a3a3",
            }}
          >
            Nothing has changed.
          </span>
          <div
            style={{
              width: 60,
              height: 3,
              backgroundColor: "#f59e0b",
            }}
          />
        </div>

        {/* Old paper mockup */}
        <div
          style={{
            position: "absolute",
            bottom: 200,
            display: "flex",
            gap: 40,
            opacity: paperOpacity,
            transform: `scale(${paperScale})`,
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 200,
                height: 280,
                backgroundColor: "#f5f5dc",
                borderRadius: 4,
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                padding: 20,
                transform: `rotate(${(i - 1) * 5}deg)`,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {/* Fake text lines */}
              {Array.from({ length: 12 }).map((_, j) => (
                <div
                  key={j}
                  style={{
                    height: 8,
                    backgroundColor: "#d4d4d4",
                    borderRadius: 2,
                    width: j === 0 ? "60%" : j === 11 ? "40%" : "100%",
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
