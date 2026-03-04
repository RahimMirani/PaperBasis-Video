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

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quick but smooth entrance for the closer
  const logoProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.8, 1]);
  const logoY = interpolate(logoProgress, [0, 1], [50, 0]);

  // Icon subtle animation
  const iconRotation = interpolate(logoProgress, [0, 1], [-15, 0]);

  // Accent line
  const lineProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 100 },
  });
  const lineWidth = interpolate(lineProgress, [0, 1], [0, 400]);

  // URL fade in
  const urlProgress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 15, stiffness: 100 },
  });
  const urlOpacity = interpolate(urlProgress, [0, 1], [0, 1]);

  // Pulsing glow
  const glowPulse = Math.sin(frame * 0.12) * 0.3 + 0.7;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GradientOrbs dark />

      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(245,158,11,0.12) 0%, transparent 50%)",
          opacity: glowPulse,
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          opacity: logoOpacity,
          transform: `translateY(${logoY}px) scale(${logoScale})`,
        }}
      >
        {/* Logo with icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
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
                width: 200,
                height: 200,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 60%)",
                filter: "blur(25px)",
              }}
            />
            <Img
              src={staticFile("PaperBasis-Icon.png")}
              style={{
                width: 160,
                height: "auto",
                filter: "brightness(0) invert(1)",
              }}
            />
          </div>

          {/* Logo text */}
          <span
            style={{
              fontSize: 140,
              fontWeight: 700,
              color: "#ffffff",
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
            height: 5,
            background: "linear-gradient(90deg, #f59e0b, #10b981)",
            borderRadius: 3,
          }}
        />

        {/* Website URL */}
        <div
          style={{
            opacity: urlOpacity,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
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
