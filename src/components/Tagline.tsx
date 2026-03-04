import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { GradientOrbs } from "./MotionGraphics";

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Words appearing with energy - STAGGERED
  const word1 = spring({ frame: frame - 8, fps, config: { damping: 10, stiffness: 80 } });
  const word2 = spring({ frame: frame - 18, fps, config: { damping: 10, stiffness: 80 } });
  const word3 = spring({ frame: frame - 28, fps, config: { damping: 10, stiffness: 80 } });

  // Underline animation
  const underlineProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const underlineWidth = interpolate(underlineProgress, [0, 1], [0, 100]);

  // Subtle pulsing glow
  const glowPulse = 0.6 + Math.sin(frame * 0.1) * 0.25;

  const words = [
    { text: "Research,", progress: word1, gradient: false },
    { text: "finally", progress: word2, gradient: true, italic: true },
    { text: "understood.", progress: word3, gradient: false, underline: true },
  ];

  // Exit to logo
  const exitStart = 60;
  const exitOpacity = interpolate(frame, [exitStart, 80], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
      }}
    >
      <GradientOrbs dark />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 50%)",
          opacity: glowPulse,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
        }}
      >
        {/* Tagline - BIGGER */}
        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "baseline",
          }}
        >
          {words.map((word, index) => {
            const y = interpolate(word.progress, [0, 1], [100, 0]);
            const opacity = interpolate(word.progress, [0, 1], [0, 1]);
            const scale = interpolate(word.progress, [0, 1], [0.85, 1]);

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  transform: `translateY(${y}px) scale(${scale})`,
                  opacity,
                }}
              >
                <span
                  style={{
                    fontSize: 160,
                    fontWeight: word.italic ? 400 : 700,
                    fontStyle: word.italic ? "italic" : "normal",
                    color: word.gradient ? undefined : "#ffffff",
                    background: word.gradient
                      ? "linear-gradient(135deg, #f59e0b 0%, #10b981 50%, #f97316 100%)"
                      : undefined,
                    WebkitBackgroundClip: word.gradient ? "text" : undefined,
                    WebkitTextFillColor: word.gradient ? "transparent" : undefined,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {word.text}
                </span>
                {word.underline && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 16,
                      left: 0,
                      height: 12,
                      width: `${underlineWidth}%`,
                      background: "linear-gradient(90deg, #f59e0b, #10b981)",
                      borderRadius: 6,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
