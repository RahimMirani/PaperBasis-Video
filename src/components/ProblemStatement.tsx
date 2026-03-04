import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FloatingShapes, GridPattern } from "./MotionGraphics";

export const ProblemStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background transition from dark to reveal
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Three powerful problem statements
  const problems = [
    { text: "Research papers are", highlight: "dense.", delay: 5, color: "#ef4444" },
    { text: "Citations lead", highlight: "nowhere.", delay: 25, color: "#f97316" },
    { text: "Implementation feels", highlight: "impossible.", delay: 45, color: "#f59e0b" },
  ];

  // Exit animation
  const exitStart = 100;
  const exitOpacity = interpolate(frame, [exitStart, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFBF5",
        justifyContent: "center",
        alignItems: "center",
        opacity: bgOpacity,
      }}
    >
      <GridPattern />
      <FloatingShapes colors={["#fecaca", "#fed7aa", "#fef3c7"]} count={6} speed={0.5} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
          opacity: exitOpacity,
        }}
      >
        {problems.map((problem, index) => {
          const entryProgress = spring({
            frame: frame - problem.delay,
            fps,
            config: { damping: 12, stiffness: 80 },
          });

          const opacity = interpolate(entryProgress, [0, 1], [0, 1]);
          const x = interpolate(entryProgress, [0, 1], [index % 2 === 0 ? -150 : 150, 0]);
          const scale = interpolate(entryProgress, [0, 1], [0.85, 1]);

          // Highlight animation
          const highlightDelay = problem.delay + 15;
          const highlightProgress = spring({
            frame: frame - highlightDelay,
            fps,
            config: { damping: 15, stiffness: 120 },
          });
          const highlightScale = interpolate(highlightProgress, [0, 0.5, 1], [1, 1.1, 1]);
          const highlightGlow = interpolate(highlightProgress, [0, 0.5, 1], [0, 0.5, 0.2]);

          return (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 24,
                opacity,
                transform: `translateX(${x}px) scale(${scale})`,
              }}
            >
              <span
                style={{
                  fontSize: 80,
                  fontWeight: 400,
                  color: "#374151",
                  letterSpacing: "-0.01em",
                }}
              >
                {problem.text}
              </span>
              <span
                style={{
                  fontSize: 80,
                  fontWeight: 700,
                  color: problem.color,
                  letterSpacing: "-0.01em",
                  transform: `scale(${highlightScale})`,
                  display: "inline-block",
                  textShadow: `0 0 ${highlightGlow * 40}px ${problem.color}`,
                }}
              >
                {problem.highlight}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
