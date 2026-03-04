import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GradientOrbs, AnimatedLines } from "./MotionGraphics";

export const SolutionIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dramatic zoom in effect
  const zoomProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 40 },
  });
  const bgScale = interpolate(zoomProgress, [0, 1], [1.3, 1]);

  // Main text animations with character-level stagger
  const line1 = "A New Interface,";
  const line2 = "for Research";

  // Line 1 word animation
  const line1Progress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 70 },
  });

  // Line 2 word animation
  const line2Progress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 70 },
  });

  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [80, 0]);

  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [80, 0]);

  // Accent elements
  const accentProgress = spring({
    frame: frame - 55,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const lineWidth = interpolate(accentProgress, [0, 1], [0, 600]);
  const dotScale = interpolate(accentProgress, [0, 1], [0, 1]);

  // Subtle rotation for dynamism
  const rotation = Math.sin(frame * 0.02) * 0.5;

  // Exit animation
  const exitStart = 100;
  const exitOpacity = interpolate(frame, [exitStart, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 120], [1, 0.9], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${bgScale})`,
      }}
    >
      <GradientOrbs dark />
      <AnimatedLines variant="diagonal" />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          opacity: exitOpacity,
          transform: `scale(${exitScale}) rotate(${rotation}deg)`,
        }}
      >
        {/* Accent dots */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: i === 0 ? "#f59e0b" : i === 1 ? "#10b981" : "#f97316",
                transform: `scale(${dotScale})`,
                transitionDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>

        {/* Line 1 */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
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
            {line1}
          </span>
        </div>

        {/* Line 2 - Italic with gradient */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 140,
              fontWeight: 400,
              fontStyle: "italic",
              background: "linear-gradient(135deg, #f59e0b 0%, #10b981 50%, #f97316 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            {line2}
          </span>
        </div>

        {/* Animated line */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            background: "linear-gradient(90deg, #f59e0b, #10b981, #f97316)",
            borderRadius: 2,
            marginTop: 30,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
