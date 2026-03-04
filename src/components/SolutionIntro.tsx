import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const SolutionIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main text animations
  const line1Progress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const line2Progress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // "A New Interface," - comes from left
  const line1X = interpolate(line1Progress, [0, 1], [-200, 0]);
  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);

  // "for Research" - comes from right, italic
  const line2X = interpolate(line2Progress, [0, 1], [200, 0]);
  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);

  // Subtle scale pulse when both are visible
  const pulseStart = 60;
  const pulse = spring({
    frame: frame - pulseStart,
    fps,
    config: { damping: 10, stiffness: 200 },
  });
  const pulseScale = frame > pulseStart
    ? interpolate(pulse, [0, 0.5, 1], [1, 1.03, 1])
    : 1;

  // Exit animation
  const exitStart = 100;
  const exitProgress = interpolate(frame, [exitStart, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(exitProgress, [0, 1], [1, 0.95]);
  const exitOpacity = interpolate(exitProgress, [0, 1], [1, 0]);

  // Decorative line animation
  const lineProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const decorLineWidth = interpolate(lineProgress, [0, 1], [0, 400]);

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
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          transform: `scale(${pulseScale * exitScale})`,
          opacity: exitOpacity,
        }}
      >
        {/* Line 1: A New Interface, */}
        <div
          style={{
            transform: `translateX(${line1X}px)`,
            opacity: line1Opacity,
          }}
        >
          <span
            style={{
              fontSize: 130,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.03em",
            }}
          >
            A New Interface,
          </span>
        </div>

        {/* Line 2: for Research (italic) */}
        <div
          style={{
            transform: `translateX(${line2X}px)`,
            opacity: line2Opacity,
          }}
        >
          <span
            style={{
              fontSize: 130,
              fontWeight: 400,
              fontStyle: "italic",
              color: "#1a1a1a",
              letterSpacing: "-0.02em",
            }}
          >
            for Research
          </span>
        </div>

        {/* Decorative line below */}
        <div
          style={{
            width: decorLineWidth,
            height: 4,
            backgroundColor: "#1a1a1a",
            marginTop: 40,
            borderRadius: 2,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
