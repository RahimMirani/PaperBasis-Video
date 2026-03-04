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

  // Screenshot entrance - from left
  const screenProgress = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 50 },
  });
  const screenX = interpolate(screenProgress, [0, 1], [-200, 0]);
  const screenOpacity = interpolate(screenProgress, [0, 1], [0, 1]);
  const screenScale = interpolate(screenProgress, [0, 1], [0.85, 1]);

  // Text content
  const contentProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const contentOpacity = interpolate(contentProgress, [0, 1], [0, 1]);
  const contentX = interpolate(contentProgress, [0, 1], [100, 0]);

  // Code snippet floating effect
  const codeFloat = Math.sin(frame * 0.04) * 10;
  const codeProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const codeOpacity = interpolate(codeProgress, [0, 1], [0, 1]);
  const codeScale = interpolate(codeProgress, [0, 1], [0.8, 1]);

  // Terminal typing effect
  const typingProgress = interpolate(frame - 80, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit
  const exitStart = 155;
  const exitOpacity = interpolate(frame, [exitStart, 180], [1, 0], {
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

      {/* Main layout */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 80,
          padding: "0 120px",
        }}
      >
        {/* Left - Screenshot */}
        <div
          style={{
            flex: "0 0 auto",
            position: "relative",
            opacity: screenOpacity,
            transform: `translateX(${screenX}px) scale(${screenScale})`,
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              width: "120%",
              height: "120%",
              left: "-10%",
              top: "-10%",
              background: "radial-gradient(ellipse, rgba(16,185,129,0.2) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />

          {/* Browser frame */}
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 24,
              boxShadow: "0 60px 120px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)",
              overflow: "hidden",
            }}
          >
            {/* Browser bar */}
            <div
              style={{
                height: 56,
                backgroundColor: "#0f172a",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                gap: 10,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <div
                style={{
                  marginLeft: 30,
                  backgroundColor: "#1e293b",
                  borderRadius: 8,
                  padding: "8px 20px",
                  color: "#64748b",
                  fontSize: 18,
                }}
              >
                paperbasis.com/paper/attention-is-all-you-need
              </div>
            </div>

            <Img
              src={staticFile("dashboard-code.png")}
              style={{
                width: 1400,
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Floating code badge */}
          <div
            style={{
              position: "absolute",
              bottom: -40,
              left: 80,
              backgroundColor: "#10b981",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: 50,
              fontSize: 24,
              fontWeight: 700,
              boxShadow: "0 20px 40px rgba(16,185,129,0.4)",
              opacity: codeOpacity,
              transform: `scale(${codeScale}) translateY(${codeFloat}px)`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 28 }}>→</span>
            Ready to run
          </div>
        </div>

        {/* Right - Text content */}
        <div
          style={{
            flex: "0 0 auto",
            maxWidth: 800,
            opacity: contentOpacity,
            transform: `translateX(${contentX}px)`,
          }}
        >
          {/* Feature badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "rgba(16,185,129,0.15)",
              border: "1px solid rgba(16,185,129,0.3)",
              padding: "16px 28px",
              borderRadius: 50,
              marginBottom: 40,
              transform: `scale(${badgeScale})`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#10b981",
                boxShadow: "0 0 12px #10b981",
              }}
            />
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#10b981",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Implementation Ready
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: 90,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            From paper
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #10b981, #34d399)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              to production
            </span>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: 34,
              color: "#94a3b8",
              marginTop: 36,
              lineHeight: 1.5,
            }}
          >
            Method sections become executable code.
            Copy, run, and build on research — instantly.
          </p>

          {/* Mini terminal */}
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 16,
              padding: "24px 32px",
              marginTop: 40,
              fontFamily: "monospace",
              fontSize: 24,
              color: "#10b981",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ color: "#64748b" }}>$</span> python transformer.py
            <span
              style={{
                opacity: typingProgress > 0.5 ? 1 : 0,
                marginLeft: 8,
              }}
            >
              ✓
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
