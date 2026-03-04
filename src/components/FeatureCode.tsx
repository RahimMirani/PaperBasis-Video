import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { GradientOrbs, GridPattern } from "./MotionGraphics";

export const FeatureCode: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Feature badge animation
  const badgeProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const badgeScale = interpolate(badgeProgress, [0, 1], [0, 1]);

  // Main content
  const contentProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const contentOpacity = interpolate(contentProgress, [0, 1], [0, 1]);
  const contentY = interpolate(contentProgress, [0, 1], [80, 0]);

  // Screenshot entrance
  const screenProgress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 50 },
  });
  const screenOpacity = interpolate(screenProgress, [0, 1], [0, 1]);
  const screenScale = interpolate(screenProgress, [0, 1], [0.85, 1]);

  // Code badge
  const codeFloat = Math.sin(frame * 0.04) * 6;
  const codeProgress = spring({
    frame: frame - 100,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const codeOpacity = interpolate(codeProgress, [0, 1], [0, 1]);
  const codeScale = interpolate(codeProgress, [0, 1], [0.8, 1]);

  // Exit
  const exitStart = 185;
  const exitOpacity = interpolate(frame, [exitStart, 210], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        opacity: exitOpacity,
      }}
    >
      <GradientOrbs dark />
      <GridPattern dark animated />

      {/* ZOOMED IN layout - stacked vertically */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "60px 120px",
          gap: 60,
        }}
      >
        {/* Top - Text content - MUCH BIGGER */}
        <div
          style={{
            textAlign: "center",
            opacity: contentOpacity,
            transform: `translateY(${contentY}px)`,
          }}
        >
          {/* Feature badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 16,
              backgroundColor: "rgba(16,185,129,0.15)",
              border: "2px solid rgba(16,185,129,0.3)",
              padding: "24px 48px",
              borderRadius: 70,
              marginBottom: 50,
              transform: `scale(${badgeScale})`,
            }}
          >
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                backgroundColor: "#10b981",
                boxShadow: "0 0 20px #10b981",
              }}
            />
            <span
              style={{
                fontSize: 40,
                fontWeight: 600,
                color: "#10b981",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Implementation Ready
            </span>
          </div>

          {/* Headline - HUGE */}
          <h2
            style={{
              fontSize: 150,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            From paper to{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              full code
            </span>
          </h2>
        </div>

        {/* Bottom - Screenshot - MASSIVE */}
        <div
          style={{
            position: "relative",
            opacity: screenOpacity,
            transform: `scale(${screenScale})`,
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              width: "140%",
              height: "140%",
              left: "-20%",
              top: "-20%",
              background: "radial-gradient(ellipse, rgba(16,185,129,0.3) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
          />

          {/* Browser frame */}
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 32,
              boxShadow: "0 80px 160px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.1)",
              overflow: "hidden",
            }}
          >
            {/* Browser bar */}
            <div
              style={{
                height: 72,
                backgroundColor: "#0f172a",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                padding: "0 32px",
                gap: 14,
              }}
            >
              <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <div
                style={{
                  marginLeft: 40,
                  backgroundColor: "#1e293b",
                  borderRadius: 12,
                  padding: "12px 28px",
                  color: "#64748b",
                  fontSize: 26,
                }}
              >
                paperbasis.com
              </div>
            </div>

            {/* Screenshot - HUGE */}
            <Img
              src={staticFile("dashboard-code.png")}
              style={{
                width: 2400,
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Floating code badge - BIGGER */}
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: 150,
              backgroundColor: "#10b981",
              color: "#ffffff",
              padding: "26px 52px",
              borderRadius: 70,
              fontSize: 38,
              fontWeight: 700,
              boxShadow: "0 30px 60px rgba(16,185,129,0.5)",
              opacity: codeOpacity,
              transform: `scale(${codeScale}) translateY(${codeFloat}px)`,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 40 }}>→</span>
            Ready to run
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
