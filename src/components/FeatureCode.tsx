import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

export const FeatureCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Feature label animation
  const labelProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const labelOpacity = interpolate(labelProgress, [0, 1], [0, 1]);
  const labelY = interpolate(labelProgress, [0, 1], [-30, 0]);

  // Title animation
  const titleProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);
  const titleY = interpolate(titleProgress, [0, 1], [40, 0]);

  // Screenshot animation - slides in from right
  const screenProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const screenOpacity = interpolate(screenProgress, [0, 1], [0, 1]);
  const screenX = interpolate(screenProgress, [0, 1], [200, 0]);
  const screenScale = interpolate(screenProgress, [0, 1], [0.85, 1]);

  // Floating code elements animation
  const floatY = Math.sin(frame * 0.05) * 8;

  // Glow effect
  const glowOpacity = interpolate(frame, [40, 70], [0, 0.4], {
    extrapolateRight: "clamp",
  });

  // Exit animation
  const exitStart = 160;
  const exitOpacity = interpolate(frame, [exitStart, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 180], [1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFBF5",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Right side - Text content (flipped layout) */}
      <div
        style={{
          position: "absolute",
          right: 180,
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 900,
          textAlign: "right",
        }}
      >
        {/* Feature label */}
        <div
          style={{
            opacity: labelOpacity,
            transform: `translateY(${labelY}px)`,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#10b981",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Implementation Ready
          </span>
        </div>

        {/* Main title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <h2
            style={{
              fontSize: 80,
              fontWeight: 600,
              color: "#1a1a1a",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            From paper
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>
              to production
            </span>
          </h2>
          <p
            style={{
              fontSize: 32,
              color: "#64748b",
              marginTop: 32,
              lineHeight: 1.5,
              maxWidth: 700,
              marginLeft: "auto",
            }}
          >
            Method sections transform into executable code.
            Copy, run, and build on research — instantly.
          </p>
        </div>
      </div>

      {/* Left side - Screenshot */}
      <div
        style={{
          position: "absolute",
          left: 80,
          top: "50%",
          transform: `translateY(-50%) translateX(${screenX}px) translateY(${floatY}px) scale(${screenScale})`,
          opacity: screenOpacity,
        }}
      >
        {/* Glow effect */}
        <div
          style={{
            position: "absolute",
            width: "120%",
            height: "120%",
            left: "-10%",
            top: "-10%",
            background:
              "radial-gradient(ellipse, rgba(16, 185, 129, 0.12) 0%, transparent 70%)",
            opacity: glowOpacity,
            zIndex: -1,
          }}
        />

        {/* Browser chrome frame */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 50px 100px -20px rgba(0,0,0,0.15), 0 30px 60px -30px rgba(0,0,0,0.2)",
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Browser top bar */}
          <div
            style={{
              height: 52,
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#ef4444",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
              }}
            />
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: "#22c55e",
              }}
            />
          </div>

          {/* Screenshot */}
          <Img
            src={staticFile("dashboard-code.png")}
            style={{
              width: 1500,
              height: "auto",
              display: "block",
            }}
          />
        </div>

        {/* Floating code badge */}
        <div
          style={{
            position: "absolute",
            bottom: -30,
            right: -30,
            backgroundColor: "#1e293b",
            color: "#22c55e",
            padding: "16px 28px",
            borderRadius: 16,
            fontSize: 24,
            fontFamily: "monospace",
            fontWeight: 600,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            transform: `translateY(${-floatY}px)`,
          }}
        >
          {"<Code />"}
        </div>
      </div>
    </AbsoluteFill>
  );
};
