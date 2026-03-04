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
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const logoOpacity = interpolate(logoProgress, [0, 1], [0, 1]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.85, 1]);
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

  // Animated background gradient
  const gradientAngle = frame * 0.4;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, #FFFBF5 0%, #fef3c7 30%, #d1fae5 70%, #FFFBF5 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FloatingShapes colors={["#fde68a", "#d1fae5", "#fed7aa", "#fce7f3", "#e0e7ff"]} count={10} speed={0.5} />

      {/* Subtle radial gradient */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.1) 0%, transparent 50%)",
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
            {/* Subtle glow behind icon */}
            <div
              style={{
                position: "absolute",
                width: 200,
                height: 200,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: "radial-gradient(circle, rgba(245,158,11,0.2) 0%, transparent 60%)",
                filter: "blur(20px)",
              }}
            />
            <Img
              src={staticFile("PaperBasis-Icon.png")}
              style={{
                width: 160,
                height: "auto",
              }}
            />
          </div>

          {/* Logo text - DARK ON LIGHT */}
          <span
            style={{
              fontSize: 140,
              fontWeight: 700,
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
              boxShadow: "0 0 15px rgba(16,185,129,0.5)",
            }}
          />
          <span
            style={{
              fontSize: 48,
              fontWeight: 500,
              color: "#64748b",
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
