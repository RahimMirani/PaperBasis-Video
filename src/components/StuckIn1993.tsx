import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const StuckIn1993: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ===== PHASE 1: YEAR COUNTER (frames 0-95) =====
  const counterProgress = interpolate(frame, [10, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentYear = Math.floor(1993 + counterProgress * 33);

  // Year counter entrance
  const yearEntrance = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // FONT EVOLUTION: Old dull look -> Modern crisp look
  const fontWeight = interpolate(counterProgress, [0, 1], [300, 900]);
  const letterSpacing = interpolate(counterProgress, [0, 1], [0.15, -0.02]);
  const colorBrightness = interpolate(counterProgress, [0, 1], [0.4, 1]);
  const textBlur = interpolate(counterProgress, [0, 0.7, 1], [2, 0.5, 0]);
  const yearScale = interpolate(counterProgress, [0, 1], [0.85, 1]);

  // OLD SCREEN EFFECTS
  const scanlineOpacity = interpolate(counterProgress, [0, 0.6, 1], [0.5, 0.2, 0]);
  const flickerIntensity = counterProgress < 0.5
    ? Math.sin(frame * 0.8) * 0.06 * (1 - counterProgress * 2)
    : 0;

  // Modern glow appears
  const modernGlow = interpolate(counterProgress, [0.8, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // "Nothing has changed" entrance
  const taglineProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Label "Reading research papers since"
  const labelProgress = spring({
    frame: frame - 3,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Phase 1 exit
  const phase1Exit = interpolate(frame, [85, 100], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ===== PHASE 2: "READING PAPERS IS BROKEN" (frames 95-150) =====
  const phase2Start = 95;
  const phase2LocalFrame = frame - phase2Start;

  const brokenEntrance = spring({
    frame: phase2LocalFrame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Staggered word animations
  const word1Progress = spring({
    frame: phase2LocalFrame - 0,
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const word2Progress = spring({
    frame: phase2LocalFrame - 5,
    fps,
    config: { damping: 10, stiffness: 120 },
  });
  const word3Progress = spring({
    frame: phase2LocalFrame - 10,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // Accent line animation
  const lineProgress = spring({
    frame: phase2LocalFrame - 18,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Phase 2 exit
  const phase2Exit = interpolate(frame, [140, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textColor = `rgb(${Math.floor(255 * colorBrightness)}, ${Math.floor(255 * colorBrightness)}, ${Math.floor(255 * colorBrightness)})`;
  const labelColor = `rgb(${Math.floor(82 * (0.5 + counterProgress * 0.5))}, ${Math.floor(82 * (0.5 + counterProgress * 0.5))}, ${Math.floor(82 * (0.5 + counterProgress * 0.5))})`;
  const accentSaturation = interpolate(counterProgress, [0, 1], [0.3, 1]);
  const bgLightness = interpolate(counterProgress, [0, 1], [0.02, 0.06]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: frame < phase2Start ? `hsl(0, 0%, ${bgLightness * 100}%)` : "#0a0a0a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* ===== PHASE 1: YEAR COUNTER ===== */}
      {frame < 105 && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: phase1Exit * (1 + flickerIntensity),
          }}
        >
          {/* Scanlines */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 3px,
                rgba(0,0,0,0.2) 3px,
                rgba(0,0,0,0.2) 6px
              )`,
              pointerEvents: "none",
              opacity: scanlineOpacity,
            }}
          />

          {/* Modern gradient glow */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 50%)",
              opacity: modernGlow,
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 50,
              opacity: interpolate(yearEntrance, [0, 1], [0, 1]),
              transform: `translateY(${interpolate(yearEntrance, [0, 1], [60, 0])}px)`,
            }}
          >
            {/* Small label */}
            <div
              style={{
                opacity: interpolate(labelProgress, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(labelProgress, [0, 1], [40, 0])}px)`,
              }}
            >
              <span
                style={{
                  fontSize: 42,
                  fontWeight: interpolate(counterProgress, [0, 1], [400, 500]),
                  color: labelColor,
                  letterSpacing: `${interpolate(counterProgress, [0, 1], [0.3, 0.25])}em`,
                  textTransform: "uppercase",
                  filter: `blur(${textBlur * 0.5}px)`,
                }}
              >
                Reading research papers since
              </span>
            </div>

            {/* BIG year counter */}
            <div
              style={{
                position: "relative",
                transform: `scale(${yearScale})`,
              }}
            >
              {/* Glow behind (modern only) */}
              <div
                style={{
                  position: "absolute",
                  width: "120%",
                  height: "120%",
                  left: "-10%",
                  top: "-10%",
                  background: "radial-gradient(ellipse, rgba(245,158,11,0.4) 0%, transparent 60%)",
                  opacity: modernGlow,
                  filter: "blur(40px)",
                }}
              />

              <span
                style={{
                  fontSize: 380,
                  fontWeight: fontWeight,
                  color: textColor,
                  letterSpacing: `${letterSpacing}em`,
                  filter: `blur(${textBlur}px)`,
                  textShadow: modernGlow > 0.5
                    ? `0 0 ${modernGlow * 80}px rgba(245,158,11,0.5)`
                    : "none",
                }}
              >
                {currentYear}
              </span>
            </div>

            {/* Bottom tagline */}
            <div
              style={{
                opacity: interpolate(taglineProgress, [0, 1], [0, 1]),
                transform: `translateY(${interpolate(taglineProgress, [0, 1], [40, 0])}px)`,
                display: "flex",
                alignItems: "center",
                gap: 30,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 4,
                  backgroundColor: `hsl(38, ${accentSaturation * 100}%, 50%)`,
                  borderRadius: 2,
                }}
              />
              <span
                style={{
                  fontSize: 56,
                  fontWeight: 500,
                  color: "#a3a3a3",
                }}
              >
                Nothing has changed.
              </span>
              <div
                style={{
                  width: 80,
                  height: 4,
                  backgroundColor: `hsl(38, ${accentSaturation * 100}%, 50%)`,
                  borderRadius: 2,
                }}
              />
            </div>

            {/* Evolution indicator dots */}
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 30,
                opacity: interpolate(counterProgress, [0, 0.3, 1], [0, 0.5, 1]),
              }}
            >
              {[0, 0.25, 0.5, 0.75, 1].map((threshold, i) => (
                <div
                  key={i}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: counterProgress >= threshold
                      ? `hsl(38, ${accentSaturation * 100}%, 50%)`
                      : "#333",
                    boxShadow: counterProgress >= threshold && counterProgress > 0.8
                      ? `0 0 15px hsl(38, ${accentSaturation * 100}%, 50%)`
                      : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* ===== PHASE 2: "READING PAPERS IS BROKEN" ===== */}
      {frame >= phase2Start && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            opacity: phase2Exit,
            background: "radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)",
          }}
        >
          {/* Subtle grid pattern */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
              `,
              backgroundSize: "100px 100px",
              opacity: interpolate(brokenEntrance, [0, 1], [0, 1]),
            }}
          />

          {/* Central glow */}
          <div
            style={{
              position: "absolute",
              width: 1200,
              height: 1200,
              background: "radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 50%)",
              opacity: interpolate(brokenEntrance, [0, 1], [0, 1]),
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 40,
            }}
          >
            {/* Main headline - clean, staggered */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              {/* "Reading Papers" */}
              <div
                style={{
                  opacity: interpolate(word1Progress, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(word1Progress, [0, 1], [40, 0])}px)`,
                }}
              >
                <span
                  style={{
                    fontSize: 140,
                    fontWeight: 300,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  Reading Papers
                </span>
              </div>

              {/* "Is" */}
              <div
                style={{
                  opacity: interpolate(word2Progress, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(word2Progress, [0, 1], [40, 0])}px)`,
                  marginTop: -20,
                }}
              >
                <span
                  style={{
                    fontSize: 100,
                    fontWeight: 300,
                    color: "#666666",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  is
                </span>
              </div>

              {/* "BROKEN" - the punch */}
              <div
                style={{
                  opacity: interpolate(word3Progress, [0, 1], [0, 1]),
                  transform: `translateY(${interpolate(word3Progress, [0, 1], [60, 0])}px) scale(${interpolate(word3Progress, [0, 1], [0.9, 1])})`,
                  marginTop: -10,
                }}
              >
                <span
                  style={{
                    fontSize: 280,
                    fontWeight: 900,
                    background: "linear-gradient(180deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    letterSpacing: "-0.04em",
                    textTransform: "uppercase",
                    filter: `drop-shadow(0 0 60px rgba(239,68,68,0.4))`,
                  }}
                >
                  BROKEN
                </span>
              </div>
            </div>

            {/* Accent line */}
            <div
              style={{
                width: interpolate(lineProgress, [0, 1], [0, 600]),
                height: 4,
                background: "linear-gradient(90deg, transparent, #ef4444, transparent)",
                borderRadius: 2,
                marginTop: 20,
              }}
            />

            {/* Subtle subtext */}
            <div
              style={{
                opacity: interpolate(lineProgress, [0, 1], [0, 0.6]),
                transform: `translateY(${interpolate(lineProgress, [0, 1], [20, 0])}px)`,
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 400,
                  color: "#666666",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                It's time for something new
              </span>
            </div>
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
