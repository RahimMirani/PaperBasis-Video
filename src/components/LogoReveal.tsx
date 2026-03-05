import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { FloatingShapes } from "./MotionGraphics";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quick but smooth entrance for the closer
  const logoProgress = spring({
    frame: frame - 3,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.7, 1]);
  const logoY = interpolate(logoProgress, [0, 1], [80, 0]);

  // Icon subtle animation
  const iconRotation = interpolate(logoProgress, [0, 1], [-20, 0]);

  // Accent line
  const lineProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 15, stiffness: 120 },
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 500]);

  // CTA Button - THE STAR
  const ctaProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 8, stiffness: 100 },
  });
  const ctaScale = interpolate(ctaProgress, [0, 1], [0.5, 1]);
  const ctaOpacity = interpolate(ctaProgress, [0, 1], [0, 1]);

  // Pulsing glow for CTA
  const ctaPulse = Math.sin(frame * 0.15) * 0.15 + 1;
  const ctaGlowIntensity = Math.sin(frame * 0.1) * 20 + 60;

  // URL fade in
  const urlProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const urlOpacity = interpolate(urlProgress, [0, 1], [0, 1]);
  const urlY = interpolate(urlProgress, [0, 1], [30, 0]);

  // Animated background gradient
  const gradientAngle = frame * 0.5;

  // Celebration sparkles
  const sparkles = Array.from({ length: 8 }, (_, i) => {
    const sparkleProgress = spring({
      frame: frame - 10 - i * 3,
      fps,
      config: { damping: 8, stiffness: 150 },
    });
    const angle = (i / 8) * Math.PI * 2;
    const distance = 400 + Math.sin(frame * 0.1 + i) * 50;
    const x = 1920 + Math.cos(angle) * distance;
    const y = 900 + Math.sin(angle) * distance;

    return {
      x,
      y,
      scale: interpolate(sparkleProgress, [0, 1], [0, 1]),
      opacity: interpolate(sparkleProgress, [0, 1], [0, 0.8]),
      rotation: frame * 2 + i * 45,
    };
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, #FFFBF5 0%, #fef3c7 30%, #d1fae5 70%, #FFFBF5 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FloatingShapes colors={["#fde68a", "#d1fae5", "#fed7aa", "#fce7f3", "#e0e7ff"]} count={12} speed={0.6} />

      {/* Sparkles */}
      {sparkles.map((sparkle, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: sparkle.x,
            top: sparkle.y,
            width: 16,
            height: 16,
            opacity: sparkle.opacity,
            transform: `scale(${sparkle.scale}) rotate(${sparkle.rotation}deg)`,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: i % 2 === 0 ? "#f59e0b" : "#10b981",
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
        </div>
      ))}

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.15) 0%, transparent 50%)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
          opacity: logoOpacity,
          transform: `translateY(${logoY}px) scale(${logoScale})`,
        }}
      >
        {/* Logo with icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 45,
          }}
        >
          {/* Paper airplane icon */}
          <div
            style={{
              transform: `rotate(${iconRotation}deg)`,
              position: "relative",
            }}
          >
            {/* Glow behind icon */}
            <div
              style={{
                position: "absolute",
                width: 250,
                height: 250,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 60%)",
                filter: "blur(25px)",
              }}
            />
            <Img
              src={staticFile("PaperBasis-Icon.png")}
              style={{
                width: 180,
                height: "auto",
              }}
            />
          </div>

          {/* Logo text - BIGGER */}
          <span
            style={{
              fontSize: 160,
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.03em",
            }}
          >
            PaperBasis
          </span>
        </div>

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 6,
            background: "linear-gradient(90deg, #f59e0b, #10b981)",
            borderRadius: 3,
            boxShadow: "0 0 20px rgba(245,158,11,0.4)",
          }}
        />

        {/* BIG CTA BUTTON */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `scale(${ctaScale * ctaPulse})`,
            marginTop: 20,
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)",
              padding: "32px 80px",
              borderRadius: 80,
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              gap: 20,
              boxShadow: `
                0 ${ctaGlowIntensity}px ${ctaGlowIntensity * 2}px rgba(249,115,22,0.4),
                0 0 ${ctaGlowIntensity}px rgba(245,158,11,0.3),
                inset 0 2px 0 rgba(255,255,255,0.2)
              `,
              textShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            TRY IT FREE
            <span style={{ fontSize: 50 }}>→</span>
          </div>
        </div>

        {/* Website URL - BIGGER, MORE PROMINENT */}
        <div
          style={{
            opacity: urlOpacity,
            transform: `translateY(${urlY}px)`,
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginTop: 30,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              backgroundColor: "#10b981",
              boxShadow: "0 0 20px rgba(16,185,129,0.6)",
            }}
          />
          <span
            style={{
              fontSize: 56,
              fontWeight: 600,
              color: "#374151",
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
