import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { GradientOrbs } from "./MotionGraphics";

export const SolutionIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background pulse
  const bgPulse = Math.sin(frame * 0.03) * 0.08 + 1;

  // Main text animations
  const line1Progress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 70 },
  });

  const line2Progress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 12, stiffness: 70 },
  });

  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [80, 0]);

  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [80, 0]);

  // Dashboard preview floating in background
  const dashboardProgress = spring({
    frame: frame - 45,
    fps,
    config: { damping: 15, stiffness: 50 },
  });
  const dashboardOpacity = interpolate(dashboardProgress, [0, 1], [0, 0.2]);
  const dashboardScale = interpolate(dashboardProgress, [0, 1], [0.85, 1]);
  const dashboardY = Math.sin(frame * 0.02) * 12;

  // Accent elements
  const accentProgress = spring({
    frame: frame - 55,
    fps,
    config: { damping: 20, stiffness: 100 },
  });

  // Colorful dots
  const dots = [
    { color: "#f59e0b", delay: 0 },
    { color: "#10b981", delay: 3 },
    { color: "#f97316", delay: 6 },
    { color: "#ec4899", delay: 9 },
    { color: "#8b5cf6", delay: 12 },
  ];

  // Exit animation
  const exitStart = 100;
  const exitOpacity = interpolate(frame, [exitStart, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 120], [1, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        transform: `scale(${bgPulse})`,
      }}
    >
      <GradientOrbs dark />

      {/* Dashboard preview in background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: dashboardOpacity,
          transform: `scale(${dashboardScale}) translateY(${dashboardY}px)`,
        }}
      >
        <div
          style={{
            position: "relative",
            transform: "perspective(2000px) rotateX(8deg) rotateY(-4deg)",
          }}
        >
          <Img
            src={staticFile("dashboard-code.png")}
            style={{
              width: 2400,
              height: "auto",
              borderRadius: 24,
              filter: "blur(3px)",
            }}
          />
          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "radial-gradient(ellipse at center, transparent 15%, #0f0f0f 75%)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 35,
          opacity: exitOpacity,
          transform: `scale(${exitScale})`,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Colorful dots row */}
        <div style={{ display: "flex", gap: 24, marginBottom: 40 }}>
          {dots.map((dot, i) => {
            const dotProgress = spring({
              frame: frame - 5 - dot.delay,
              fps,
              config: { damping: 8, stiffness: 150 },
            });
            const dotScale = interpolate(dotProgress, [0, 1], [0, 1]);
            const dotY = interpolate(dotProgress, [0, 0.5, 1], [0, -25, 0]);

            return (
              <div
                key={i}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor: dot.color,
                  transform: `scale(${dotScale}) translateY(${dotY}px)`,
                  boxShadow: `0 0 35px ${dot.color}80`,
                }}
              />
            );
          })}
        </div>

        {/* Line 1 - BIGGER */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 180,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.03em",
            }}
          >
            A New Interface,
          </span>
        </div>

        {/* Line 2 - Gradient text - BIGGER */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 180,
              fontWeight: 400,
              fontStyle: "italic",
              background: "linear-gradient(135deg, #f59e0b 0%, #10b981 40%, #f97316 70%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            for Research
          </span>
        </div>

        {/* Animated underline */}
        <div
          style={{
            width: interpolate(accentProgress, [0, 1], [0, 800]),
            height: 7,
            background: "linear-gradient(90deg, #f59e0b, #10b981, #f97316, #ec4899)",
            borderRadius: 4,
            marginTop: 25,
          }}
        />

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 28,
            marginTop: 55,
            opacity: interpolate(accentProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(accentProgress, [0, 1], [35, 0])}px)`,
          }}
        >
          {[
            { text: "AI-Powered", icon: "⚡" },
            { text: "Contextual", icon: "🔗" },
            { text: "Implementation Ready", icon: "💻" },
          ].map((pill, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                padding: "20px 40px",
                borderRadius: 60,
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 32,
                color: "#ffffff",
                fontWeight: 500,
              }}
            >
              <span>{pill.icon}</span>
              {pill.text}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
