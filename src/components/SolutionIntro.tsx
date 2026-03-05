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

// Celebration particle component
const CelebrationParticle: React.FC<{
  index: number;
  color: string;
}> = ({ index, color }) => {
  const frame = useCurrentFrame();
  const startFrame = 15 + index * 2;
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const angle = (index / 20) * Math.PI * 2;
  const baseX = 1920 + Math.cos(angle) * 200;
  const baseY = 1080 + Math.sin(angle) * 200;

  const distance = localFrame * 12;
  const x = baseX + Math.cos(angle) * distance;
  const y = baseY + Math.sin(angle) * distance - localFrame * 2;

  const opacity = interpolate(localFrame, [0, 10, 40, 60], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(localFrame, [0, 10, 60], [0, 1, 0.5], {
    extrapolateRight: "clamp",
  });
  const rotation = localFrame * (5 + index * 2);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 20 + (index % 3) * 10,
        height: 20 + (index % 3) * 10,
        backgroundColor: color,
        borderRadius: index % 2 === 0 ? "50%" : "4px",
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    />
  );
};

export const SolutionIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background pulse - more intense
  const bgPulse = Math.sin(frame * 0.04) * 0.03 + 1;

  // Main text animations - FASTER, more dramatic
  const line1Progress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 8, stiffness: 120 },
  });

  const line2Progress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 8, stiffness: 120 },
  });

  const line1Opacity = interpolate(line1Progress, [0, 1], [0, 1]);
  const line1Y = interpolate(line1Progress, [0, 1], [100, 0]);
  const line1Scale = interpolate(line1Progress, [0, 1], [0.8, 1]);

  const line2Opacity = interpolate(line2Progress, [0, 1], [0, 1]);
  const line2Y = interpolate(line2Progress, [0, 1], [100, 0]);
  const line2Scale = interpolate(line2Progress, [0, 1], [0.8, 1]);

  // Dashboard preview floating in background
  const dashboardProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, stiffness: 50 },
  });
  const dashboardOpacity = interpolate(dashboardProgress, [0, 1], [0, 0.15]);
  const dashboardScale = interpolate(dashboardProgress, [0, 1], [0.85, 1]);
  const dashboardY = Math.sin(frame * 0.02) * 12;

  // Accent elements
  const accentProgress = spring({
    frame: frame - 45,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  // Colorful dots - FASTER animation
  const dots = [
    { color: "#f59e0b", delay: 0 },
    { color: "#10b981", delay: 2 },
    { color: "#f97316", delay: 4 },
    { color: "#ec4899", delay: 6 },
    { color: "#8b5cf6", delay: 8 },
  ];

  // Fire emojis
  const fireEmojis = [
    { x: 200, y: 300, delay: 10, rotation: -15 },
    { x: 3500, y: 350, delay: 15, rotation: 10 },
    { x: 300, y: 1700, delay: 20, rotation: -10 },
    { x: 3400, y: 1650, delay: 25, rotation: 15 },
  ];

  // Celebration particles
  const particleColors = ["#f59e0b", "#10b981", "#f97316", "#ec4899", "#8b5cf6"];

  // Exit animation
  const exitStart = 125;
  const exitOpacity = interpolate(frame, [exitStart, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 150], [1, 1.08], {
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

      {/* Celebration particles */}
      {Array.from({ length: 25 }, (_, i) => (
        <CelebrationParticle
          key={i}
          index={i}
          color={particleColors[i % particleColors.length]}
        />
      ))}

      {/* Fire emojis */}
      {fireEmojis.map((emoji, i) => {
        const emojiProgress = spring({
          frame: frame - emoji.delay,
          fps,
          config: { damping: 8, stiffness: 150 },
        });
        const floatY = Math.sin((frame - emoji.delay) * 0.1) * 15;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: emoji.x,
              top: emoji.y,
              fontSize: 120,
              opacity: interpolate(emojiProgress, [0, 1], [0, 1]),
              transform: `scale(${interpolate(emojiProgress, [0, 1], [0.3, 1])}) translateY(${floatY}px) rotate(${emoji.rotation}deg)`,
            }}
          >
            🔥
          </div>
        );
      })}

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
        {/* Colorful dots row - FASTER */}
        <div style={{ display: "flex", gap: 28, marginBottom: 40 }}>
          {dots.map((dot, i) => {
            const dotProgress = spring({
              frame: frame - 3 - dot.delay,
              fps,
              config: { damping: 6, stiffness: 200 },
            });
            const dotScale = interpolate(dotProgress, [0, 1], [0, 1]);
            const dotY = interpolate(dotProgress, [0, 0.5, 1], [0, -30, 0]);

            return (
              <div
                key={i}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  backgroundColor: dot.color,
                  transform: `scale(${dotScale}) translateY(${dotY}px)`,
                  boxShadow: `0 0 40px ${dot.color}90`,
                }}
              />
            );
          })}
        </div>

        {/* Line 1 - BIGGER, BOLDER */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px) scale(${line1Scale})`,
          }}
        >
          <span
            style={{
              fontSize: 200,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              textShadow: "0 0 80px rgba(255,255,255,0.3)",
            }}
          >
            A New Interface,
          </span>
        </div>

        {/* Line 2 - Gradient text - BIGGER */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px) scale(${line2Scale})`,
          }}
        >
          <span
            style={{
              fontSize: 200,
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

        {/* Animated underline - FASTER */}
        <div
          style={{
            width: interpolate(accentProgress, [0, 1], [0, 900]),
            height: 8,
            background: "linear-gradient(90deg, #f59e0b, #10b981, #f97316, #ec4899)",
            borderRadius: 4,
            marginTop: 25,
            boxShadow: "0 0 30px rgba(245,158,11,0.5)",
          }}
        />

        {/* Feature pills - FASTER */}
        <div
          style={{
            display: "flex",
            gap: 32,
            marginTop: 55,
            opacity: interpolate(accentProgress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(accentProgress, [0, 1], [40, 0])}px)`,
          }}
        >
          {[
            { text: "AI-Powered", icon: "⚡" },
            { text: "Contextual", icon: "🔗" },
            { text: "Implementation Ready", icon: "💻" },
          ].map((pill, i) => {
            const pillProgress = spring({
              frame: frame - 50 - i * 5,
              fps,
              config: { damping: 10, stiffness: 100 },
            });

            return (
              <div
                key={i}
                style={{
                  backgroundColor: "rgba(255,255,255,0.12)",
                  border: "2px solid rgba(255,255,255,0.25)",
                  padding: "22px 44px",
                  borderRadius: 60,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  fontSize: 34,
                  color: "#ffffff",
                  fontWeight: 600,
                  transform: `scale(${interpolate(pillProgress, [0, 1], [0.8, 1])})`,
                  opacity: interpolate(pillProgress, [0, 1], [0, 1]),
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
              >
                <span style={{ fontSize: 40 }}>{pill.icon}</span>
                {pill.text}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
