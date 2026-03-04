import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const ProblemStatement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background fade in
  const bgOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Three problem statements with staggered entry
  const problems = [
    { text: "Research papers are dense.", delay: 0 },
    { text: "Citations lead nowhere.", delay: 25 },
    { text: "Implementation feels impossible.", delay: 50 },
  ];

  // Exit animation
  const exitStart = 95;
  const exitOpacity = interpolate(frame, [exitStart, 115], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitY = interpolate(frame, [exitStart, 115], [0, -60], {
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
          opacity: exitOpacity,
          transform: `translateY(${exitY}px)`,
        }}
      >
        {problems.map((problem, index) => {
          const lineProgress = spring({
            frame: frame - problem.delay,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          const lineOpacity = interpolate(lineProgress, [0, 1], [0, 1]);
          const lineY = interpolate(lineProgress, [0, 1], [40, 0]);
          const lineScale = interpolate(lineProgress, [0, 1], [0.95, 1]);

          // Strike through animation for each line (happens after text appears)
          const strikeDelay = problem.delay + 20;
          const strikeProgress = spring({
            frame: frame - strikeDelay,
            fps,
            config: { damping: 20, stiffness: 150 },
          });
          const strikeWidth = interpolate(strikeProgress, [0, 1], [0, 100]);

          // Fade text when struck
          const textFade = interpolate(
            strikeProgress,
            [0.3, 0.8],
            [1, 0.35],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div
              key={index}
              style={{
                position: "relative",
                opacity: lineOpacity,
                transform: `translateY(${lineY}px) scale(${lineScale})`,
              }}
            >
              <span
                style={{
                  fontSize: 72,
                  fontWeight: 500,
                  color: "#1a1a1a",
                  letterSpacing: "-0.01em",
                  opacity: textFade,
                }}
              >
                {problem.text}
              </span>
              {/* Strike through line */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  height: 4,
                  width: `${strikeWidth}%`,
                  backgroundColor: "#ef4444",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
