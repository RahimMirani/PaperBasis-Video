import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo icon animation
  const iconProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const iconScale = interpolate(iconProgress, [0, 1], [0, 1]);
  const iconRotation = interpolate(iconProgress, [0, 1], [-30, 0]);

  // Main tagline animation - word by word
  const word1Progress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const word2Progress = spring({
    frame: frame - 28,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const word3Progress = spring({
    frame: frame - 36,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // URL animation
  const urlProgress = spring({
    frame: frame - 50,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const urlOpacity = interpolate(urlProgress, [0, 1], [0, 1]);
  const urlY = interpolate(urlProgress, [0, 1], [30, 0]);

  // Subtle pulsing glow
  const glowPulse = Math.sin(frame * 0.1) * 0.3 + 0.7;

  // Underline animation for "understood"
  const underlineProgress = spring({
    frame: frame - 45,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const underlineWidth = interpolate(underlineProgress, [0, 1], [0, 100]);

  const words = [
    { text: "Research,", progress: word1Progress, italic: false },
    { text: "finally", progress: word2Progress, italic: true },
    { text: "understood.", progress: word3Progress, italic: false, underline: true },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFBF5",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial glow background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)",
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
        {/* Logo icon */}
        <div
          style={{
            transform: `scale(${iconScale}) rotate(${iconRotation}deg)`,
          }}
        >
          <Img
            src={staticFile("PaperBasis-Icon.png")}
            style={{
              width: 120,
              height: "auto",
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
            const y = interpolate(word.progress, [0, 1], [60, 0]);
            const opacity = interpolate(word.progress, [0, 1], [0, 1]);
            const scale = interpolate(word.progress, [0, 1], [0.9, 1]);

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
                    fontSize: 120,
                    fontWeight: word.italic ? 400 : 600,
                    fontStyle: word.italic ? "italic" : "normal",
                    color: "#1a1a1a",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {word.text}
                </span>
                {word.underline && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 8,
                      left: 0,
                      height: 8,
                      width: `${underlineWidth}%`,
                      backgroundColor: "#f59e0b",
                      borderRadius: 4,
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
          }}
        >
          <span
            style={{
              fontSize: 42,
              fontWeight: 500,
              color: "#64748b",
              letterSpacing: "0.05em",
            }}
          >
            paperbasis.com
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
