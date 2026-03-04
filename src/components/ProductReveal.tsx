import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

export const ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main product screenshot - dramatic scale up reveal
  const revealProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 15, stiffness: 50 },
  });

  const scale = interpolate(revealProgress, [0, 1], [0.7, 1]);
  const opacity = interpolate(revealProgress, [0, 1], [0, 1]);
  const y = interpolate(revealProgress, [0, 1], [100, 0]);

  // Parallax layers for depth
  const parallaxSlow = Math.sin(frame * 0.03) * 5;
  const parallaxFast = Math.sin(frame * 0.05) * 10;

  // Background gradient animation
  const gradientRotation = frame * 0.5;

  // Floating UI elements around the main screenshot
  const floatProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const floatOpacity = interpolate(floatProgress, [0, 1], [0, 1]);
  const floatScale = interpolate(floatProgress, [0, 1], [0.8, 1]);

  // Glow intensity
  const glowIntensity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Exit animation
  const exitStart = 100;
  const exitOpacity = interpolate(frame, [exitStart, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 120], [1, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFBF5",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: "absolute",
          width: "150%",
          height: "150%",
          background: `conic-gradient(from ${gradientRotation}deg at 50% 50%,
            rgba(245, 158, 11, 0.05) 0deg,
            rgba(16, 185, 129, 0.05) 120deg,
            rgba(99, 102, 241, 0.05) 240deg,
            rgba(245, 158, 11, 0.05) 360deg)`,
          opacity: glowIntensity * 0.5,
        }}
      />

      {/* Main content container with exit animation */}
      <div
        style={{
          opacity: exitOpacity,
          transform: `scale(${exitScale})`,
        }}
      >
        {/* Main screenshot with browser frame */}
        <div
          style={{
            transform: `translateY(${y + parallaxSlow}px) scale(${scale})`,
            opacity,
          }}
        >
          {/* Large glow behind */}
          <div
            style={{
              position: "absolute",
              width: "140%",
              height: "140%",
              left: "-20%",
              top: "-20%",
              background:
                "radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 60%)",
              opacity: glowIntensity,
              zIndex: -1,
            }}
          />

          {/* Browser frame */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 32,
              boxShadow: `
                0 60px 120px -30px rgba(0,0,0,0.2),
                0 40px 80px -40px rgba(0,0,0,0.15),
                0 0 0 1px rgba(0,0,0,0.05)
              `,
              overflow: "hidden",
            }}
          >
            {/* Browser top bar */}
            <div
              style={{
                height: 64,
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                padding: "0 28px",
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: "#ef4444",
                }}
              />
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: "#f59e0b",
                }}
              />
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                }}
              />
              {/* URL bar */}
              <div
                style={{
                  marginLeft: 40,
                  backgroundColor: "#f1f5f9",
                  borderRadius: 8,
                  padding: "10px 24px",
                  fontSize: 22,
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                paperbasis.com
              </div>
            </div>

            {/* Landing page screenshot */}
            <Img
              src={staticFile("landing.png")}
              style={{
                width: 2800,
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Floating accent elements */}
        <div
          style={{
            position: "absolute",
            top: 150,
            right: 200,
            opacity: floatOpacity,
            transform: `scale(${floatScale}) translateY(${parallaxFast}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px 32px",
              borderRadius: 16,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              fontSize: 28,
              fontWeight: 600,
              color: "#1a1a1a",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "#22c55e" }}>●</span>
            AI-Powered
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 200,
            left: 150,
            opacity: floatOpacity,
            transform: `scale(${floatScale}) translateY(${-parallaxFast}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: "#1e293b",
              padding: "20px 32px",
              borderRadius: 16,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              fontSize: 28,
              fontWeight: 600,
              color: "#ffffff",
            }}
          >
            Start Free →
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
