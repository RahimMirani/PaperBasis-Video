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

  // Background gradient animation
  const gradientAngle = frame * 0.3;

  // Three problem cards with icons and colors
  const problems = [
    {
      icon: "📄",
      text: "Dense papers",
      subtext: "Walls of text, no clarity",
      color: "#ef4444",
      bgColor: "#fef2f2",
      delay: 5,
    },
    {
      icon: "🔗",
      text: "Dead-end citations",
      subtext: "References that go nowhere",
      color: "#f97316",
      bgColor: "#fff7ed",
      delay: 25,
    },
    {
      icon: "💻",
      text: "No implementation",
      subtext: "Theory without practice",
      color: "#eab308",
      bgColor: "#fefce8",
      delay: 45,
    },
  ];

  // Floating particles
  const particles = Array.from({ length: 15 }, (_, i) => {
    const x = (i * 270 + 100) % 3840;
    const y = (i * 180 + 80) % 2160;
    const size = 8 + (i % 4) * 6;
    const colors = ["#fecaca", "#fed7aa", "#fef08a", "#d1fae5", "#e0e7ff"];
    const color = colors[i % colors.length];
    const floatX = Math.sin(frame * 0.02 + i) * 30;
    const floatY = Math.cos(frame * 0.025 + i * 0.5) * 25;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x + floatX,
          top: y + floatY,
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: "50%",
          opacity: 0.6,
        }}
      />
    );
  });

  // Exit animation
  const exitStart = 95;
  const exitOpacity = interpolate(frame, [exitStart, 115], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [exitStart, 115], [0, -50], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, #fffbeb 0%, #fef3c7 25%, #ffedd5 50%, #fee2e2 75%, #fce7f3 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated particles */}
      {particles}

      {/* Large decorative shapes */}
      <div
        style={{
          position: "absolute",
          top: 150,
          right: 200,
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "3px solid rgba(239,68,68,0.2)",
          transform: `rotate(${frame * 0.2}deg)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 150,
          width: 300,
          height: 300,
          borderRadius: "30%",
          border: "3px solid rgba(249,115,22,0.2)",
          transform: `rotate(${-frame * 0.15}deg)`,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
          opacity: exitOpacity,
          transform: `translateY(${exitY}px)`,
        }}
      >
        {/* Header */}
        <div
          style={{
            opacity: interpolate(
              spring({ frame, fps, config: { damping: 15, stiffness: 80 } }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#9ca3af",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            The Problem
          </span>
        </div>

        {/* Problem cards in a row */}
        <div
          style={{
            display: "flex",
            gap: 60,
            alignItems: "stretch",
          }}
        >
          {problems.map((problem, index) => {
            const cardProgress = spring({
              frame: frame - problem.delay,
              fps,
              config: { damping: 12, stiffness: 70 },
            });

            const cardOpacity = interpolate(cardProgress, [0, 1], [0, 1]);
            const cardY = interpolate(cardProgress, [0, 1], [80, 0]);
            const cardScale = interpolate(cardProgress, [0, 1], [0.8, 1]);
            const cardRotation = interpolate(cardProgress, [0, 1], [10, 0]);

            // Hover-like pulse effect
            const pulseDelay = problem.delay + 30;
            const pulse =
              frame > pulseDelay
                ? Math.sin((frame - pulseDelay) * 0.08) * 0.02 + 1
                : 1;

            return (
              <div
                key={index}
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px) scale(${cardScale * pulse}) rotate(${cardRotation}deg)`,
                }}
              >
                <div
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: 32,
                    padding: "50px 60px",
                    boxShadow: `0 25px 80px -20px ${problem.color}40, 0 10px 30px -10px rgba(0,0,0,0.1)`,
                    border: `2px solid ${problem.color}20`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 24,
                    minWidth: 380,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Colored accent bar at top */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 6,
                      background: `linear-gradient(90deg, ${problem.color}, ${problem.color}80)`,
                    }}
                  />

                  {/* Icon with colored background */}
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 24,
                      backgroundColor: problem.bgColor,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 48,
                    }}
                  >
                    {problem.icon}
                  </div>

                  {/* Text */}
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 42,
                        fontWeight: 700,
                        color: problem.color,
                        marginBottom: 8,
                      }}
                    >
                      {problem.text}
                    </div>
                    <div
                      style={{
                        fontSize: 26,
                        color: "#6b7280",
                        fontWeight: 400,
                      }}
                    >
                      {problem.subtext}
                    </div>
                  </div>

                  {/* X mark */}
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      backgroundColor: `${problem.color}15`,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: problem.color,
                      fontSize: 28,
                      fontWeight: 700,
                    }}
                  >
                    ✕
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
