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

  // Year counter animation - counting from 1993 to 2026
  const counterProgress = interpolate(frame, [15, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const currentYear = Math.floor(1993 + counterProgress * 33);

  // FONT EVOLUTION: Old dull look → Modern crisp look
  // Font weight: thin/light → bold
  const fontWeight = interpolate(counterProgress, [0, 1], [300, 900]);

  // Letter spacing: wide (old style) → tight (modern)
  const letterSpacing = interpolate(counterProgress, [0, 1], [0.15, -0.02]);

  // Color: dull gray → bright white
  const colorBrightness = interpolate(counterProgress, [0, 1], [0.4, 1]);

  // Blur: slightly blurry (old CRT) → crisp
  const textBlur = interpolate(counterProgress, [0, 0.7, 1], [2, 0.5, 0]);

  // Scale: slightly smaller → full size
  const yearScale = interpolate(counterProgress, [0, 1], [0.85, 1]);

  // Skew: slight skew (old) → straight (modern)
  const skewX = interpolate(counterProgress, [0, 0.5, 1], [2, 0.5, 0]);

  // OLD SCREEN EFFECTS (fade out as we get modern)
  // Scanlines intensity
  const scanlineOpacity = interpolate(counterProgress, [0, 0.6, 1], [0.6, 0.3, 0]);

  // Screen flicker
  const flickerIntensity = counterProgress < 0.5
    ? Math.sin(frame * 0.8) * 0.08 * (1 - counterProgress * 2)
    : 0;

  // CRT curvature effect (vignette gets softer)
  const vignetteIntensity = interpolate(counterProgress, [0, 1], [0.8, 0.4]);

  // Background color evolution: darker → slightly lighter
  const bgLightness = interpolate(counterProgress, [0, 1], [0.02, 0.06]);

  // Main text animations
  const line1Progress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const yearProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 8, stiffness: 50 },
  });

  const line2Progress = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Modern glow appears as we reach 2026
  const modernGlow = interpolate(counterProgress, [0.8, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Accent color evolution: dull → vibrant amber
  const accentSaturation = interpolate(counterProgress, [0, 1], [0.3, 1]);

  // Exit animation
  const exitStart = 125;
  const exitOpacity = interpolate(frame, [exitStart, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 150], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // RGB color from brightness
  const textColor = `rgb(${Math.floor(255 * colorBrightness)}, ${Math.floor(255 * colorBrightness)}, ${Math.floor(255 * colorBrightness)})`;
  const labelColor = `rgb(${Math.floor(82 * (0.5 + counterProgress * 0.5))}, ${Math.floor(82 * (0.5 + counterProgress * 0.5))}, ${Math.floor(82 * (0.5 + counterProgress * 0.5))})`;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: `hsl(0, 0%, ${bgLightness * 100}%)`,
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity * (1 + flickerIntensity),
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Retro scanlines - fade out as we modernize */}
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

      {/* CRT vignette - softens as we modernize */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${vignetteIntensity}) 100%)`,
          pointerEvents: "none",
        }}
      />


      {/* Modern gradient glow - appears at the end */}
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
        }}
      >
        {/* Small label - also evolves */}
        <div
          style={{
            opacity: interpolate(line1Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line1Progress, [0, 1], [40, 0])}px)`,
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

        {/* BIG year counter - EVOLVING TYPOGRAPHY */}
        <div
          style={{
            position: "relative",
            opacity: interpolate(yearProgress, [0, 1], [0, 1]),
            transform: `scale(${interpolate(yearProgress, [0, 1], [0.6, 1]) * yearScale}) skewX(${skewX}deg)`,
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
            opacity: interpolate(line2Progress, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(line2Progress, [0, 1], [40, 0])}px)`,
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
  );
};
