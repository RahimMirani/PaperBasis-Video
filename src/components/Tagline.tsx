import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { GradientOrbs, ParticleBurst } from "./MotionGraphics";

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Icon drop with bounce
  const iconProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 8, stiffness: 100 },
  });
  const iconY = interpolate(iconProgress, [0, 1], [-200, 0]);
  const iconScale = interpolate(iconProgress, [0, 1], [0.5, 1]);
  const iconRotation = interpolate(iconProgress, [0, 1], [-30, 0]);

  // Words appearing with energy
  const word1 = spring({ frame: frame - 20, fps, config: { damping: 10, stiffness: 80 } });
  const word2 = spring({ frame: frame - 30, fps, config: { damping: 10, stiffness: 80 } });
  const word3 = spring({ frame: frame - 40, fps, config: { damping: 10, stiffness: 80 } });

  // Underline animation
  const underlineProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const underlineWidth = interpolate(underlineProgress, [0, 1], [0, 100]);

  // URL fade in
  const urlProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const urlOpacity = interpolate(urlProgress, [0, 1], [0, 1]);
  const urlY = interpolate(urlProgress, [0, 1], [30, 0]);

  // Pulsing glow
  const glowPulse = 0.6 + Math.sin(frame * 0.1) * 0.2;

  const words = [
    { text: "Research,", progress: word1, gradient: false },
    { text: "finally", progress: word2, gradient: true, italic: true },
    { text: "understood.", progress: word3, gradient: false, underline: true },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GradientOrbs dark />
      <ParticleBurst startFrame={15} x={1920} y={900} color="#f59e0b" />

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
          gap: 50,
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            transform: `translateY(${iconY}px) scale(${iconScale}) rotate(${iconRotation}deg)`,
            position: "relative",
          }}
        >
          {/* Glow behind icon */}
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(circle, rgba(245,158,11,0.5) 0%, transparent 60%)",
              filter: "blur(30px)",
            }}
          />
          <Img
            src={staticFile("PaperBasis-Icon.png")}
            style={{
              width: 140,
              height: "auto",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            gap: 30,
            alignItems: "baseline",
          }}
        >
          {words.map((word, index) => {
            const y = interpolate(word.progress, [0, 1], [80, 0]);
            const opacity = interpolate(word.progress, [0, 1], [0, 1]);
            const scale = interpolate(word.progress, [0, 1], [0.8, 1]);

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
                    fontSize: 130,
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
                      bottom: 12,
                      left: 0,
                      height: 10,
                      width: `${underlineWidth}%`,
                      background: "linear-gradient(90deg, #f59e0b, #10b981)",
                      borderRadius: 5,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Website URL */}
        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 20px #10b981",
            }}
          />
          <span
            style={{
              fontSize: 48,
              fontWeight: 500,
              color: "#94a3b8",
              letterSpacing: "0.02em",
            }}
          >
            paperbasis.com
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
