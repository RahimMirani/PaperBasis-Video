import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FloatingShapes } from "./MotionGraphics";

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Words appearing with energy - FASTER, MORE DRAMATIC
  const word1 = spring({ frame: frame - 5, fps, config: { damping: 8, stiffness: 120 } });
  const word2 = spring({ frame: frame - 15, fps, config: { damping: 8, stiffness: 120 } });
  const word3 = spring({ frame: frame - 25, fps, config: { damping: 8, stiffness: 120 } });

  // Underline animation - FASTER
  const underlineProgress = spring({
    frame: frame - 35,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const underlineWidth = interpolate(underlineProgress, [0, 1], [0, 100]);

  // Pulse effect on final word
  const pulse = Math.sin(frame * 0.12) * 0.02 + 1;

  // Subtle animated gradient background
  const gradientAngle = frame * 0.4;

  // Glow intensity
  const glowIntensity = interpolate(frame, [0, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  const words = [
    { text: "Research,", progress: word1, gradient: false },
    { text: "finally", progress: word2, gradient: true, italic: true },
    { text: "understood.", progress: word3, gradient: false, underline: true },
  ];

  // Exit to logo
  const exitStart = 80;
  const exitOpacity = interpolate(frame, [exitStart, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, #FFFBF5 0%, #fef3c7 50%, #FFFBF5 100%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
        overflow: "visible",
      }}
    >
      <FloatingShapes colors={["#fde68a", "#d1fae5", "#fed7aa", "#fce7f3"]} count={10} speed={0.5} />

      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.15) 0%, transparent 50%)",
          opacity: glowIntensity,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 60,
          padding: "0 150px",
          overflow: "visible",
        }}
      >
        {/* Tagline - BIGGER, BOLDER */}
        <div
          style={{
            display: "flex",
            gap: 50,
            alignItems: "baseline",
            overflow: "visible",
          }}
        >
          {words.map((word, index) => {
            const y = interpolate(word.progress, [0, 1], [120, 0]);
            const opacity = interpolate(word.progress, [0, 1], [0, 1]);
            const scale = interpolate(word.progress, [0, 1], [0.8, 1]);
            const finalScale = word.underline ? scale * pulse : scale;

            return (
              <div
                key={index}
                style={{
                  position: "relative",
                  transform: `translateY(${y}px) scale(${finalScale})`,
                  opacity,
                  overflow: "visible",
                }}
              >
                <span
                  style={{
                    fontSize: 200,
                    fontWeight: word.italic ? 400 : 800,
                    fontStyle: word.italic ? "italic" : "normal",
                    color: word.gradient ? undefined : "#1a1a1a",
                    background: word.gradient
                      ? "linear-gradient(135deg, #f59e0b 0%, #10b981 50%, #f97316 100%)"
                      : undefined,
                    WebkitBackgroundClip: word.gradient ? "text" : undefined,
                    WebkitTextFillColor: word.gradient ? "transparent" : undefined,
                    letterSpacing: "-0.02em",
                    display: "inline-block",
                    padding: "0 10px",
                    textShadow: word.underline && glowIntensity > 0.5
                      ? "0 0 60px rgba(245,158,11,0.3)"
                      : "none",
                  }}
                >
                  {word.text}
                </span>
                {word.underline && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 15,
                      left: 10,
                      height: 16,
                      width: `${underlineWidth}%`,
                      background: "linear-gradient(90deg, #f59e0b, #10b981)",
                      borderRadius: 8,
                      boxShadow: `0 0 ${20 * glowIntensity}px rgba(245,158,11,0.5)`,
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
