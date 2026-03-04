import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

export const FeatureCitations: React.FC = () => {
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

  // Screenshot animation - slides up with device frame
  const screenProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const screenOpacity = interpolate(screenProgress, [0, 1], [0, 1]);
  const screenY = interpolate(screenProgress, [0, 1], [150, 0]);
  const screenScale = interpolate(screenProgress, [0, 1], [0.9, 1]);

  // Highlight pulse on the citation popup
  const highlightStart = 80;
  const highlightPulse = spring({
    frame: frame - highlightStart,
    fps,
    config: { damping: 8, stiffness: 150 },
  });
  const highlightScale = frame > highlightStart
    ? interpolate(highlightPulse, [0, 0.5, 1], [1, 1.02, 1])
    : 1;

  // Glow effect behind screenshot
  const glowOpacity = interpolate(frame, [40, 70], [0, 0.3], {
    extrapolateRight: "clamp",
  });

  // Exit animation
  const exitStart = 160;
  const exitOpacity = interpolate(frame, [exitStart, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [exitStart, 180], [0, -80], {
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
        transform: `translateY(${exitY}px)`,
      }}
    >
      {/* Left side - Text content */}
      <div
        style={{
          position: "absolute",
          left: 180,
          top: "50%",
          transform: "translateY(-50%)",
          maxWidth: 900,
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
              color: "#f59e0b",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Contextual Citations
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
            Citations that
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>
              actually explain
            </span>
          </h2>
          <p
            style={{
              fontSize: 32,
              color: "#64748b",
              marginTop: 32,
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            Click any reference to see abstracts, key findings,
            and why it matters — without leaving your paper.
          </p>
        </div>
      </div>

      {/* Right side - Screenshot */}
      <div
        style={{
          position: "absolute",
          right: 100,
          top: "50%",
          transform: `translateY(-50%) translateY(${screenY}px) scale(${screenScale * highlightScale})`,
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
              "radial-gradient(ellipse, rgba(245, 158, 11, 0.15) 0%, transparent 70%)",
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
            src={staticFile("citations.png")}
            style={{
              width: 1400,
              height: "auto",
              display: "block",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
