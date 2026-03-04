import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { GradientOrbs, FloatingShapes } from "./MotionGraphics";

export const ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dramatic zoom reveal
  const revealProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 40 },
  });

  const scale = interpolate(revealProgress, [0, 1], [0.5, 1]);
  const opacity = interpolate(revealProgress, [0, 1], [0, 1]);
  const rotateX = interpolate(revealProgress, [0, 1], [20, 0]);

  // Floating elements
  const float1 = Math.sin(frame * 0.04) * 15;
  const float2 = Math.cos(frame * 0.03) * 12;

  // Stats/badges appearing
  const badge1Progress = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const badge2Progress = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, stiffness: 80 },
  });
  const badge3Progress = spring({
    frame: frame - 70,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Exit animation
  const exitStart = 95;
  const exitOpacity = interpolate(frame, [exitStart, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 120], [1, 1.15], {
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
      <GradientOrbs />
      <FloatingShapes colors={["#fef3c7", "#d1fae5", "#ffedd5", "#fce7f3"]} count={10} speed={0.4} />

      <div
        style={{
          opacity: exitOpacity,
          transform: `scale(${exitScale})`,
        }}
      >
        {/* Main screenshot with perspective */}
        <div
          style={{
            transform: `scale(${scale}) perspective(2000px) rotateX(${rotateX}deg)`,
            opacity,
            position: "relative",
          }}
        >
          {/* Large glow */}
          <div
            style={{
              position: "absolute",
              width: "130%",
              height: "130%",
              left: "-15%",
              top: "-15%",
              background: "radial-gradient(ellipse, rgba(245,158,11,0.15) 0%, rgba(16,185,129,0.1) 40%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          {/* Browser frame */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 32,
              boxShadow: `
                0 100px 200px -50px rgba(0,0,0,0.25),
                0 50px 100px -50px rgba(0,0,0,0.15),
                0 0 0 1px rgba(0,0,0,0.05)
              `,
              overflow: "hidden",
            }}
          >
            {/* Browser bar */}
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
              <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <div
                style={{
                  marginLeft: 40,
                  backgroundColor: "#f1f5f9",
                  borderRadius: 10,
                  padding: "12px 28px",
                  color: "#1a1a1a",
                  fontSize: 22,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ color: "#22c55e" }}>🔒</span>
                paperbasis.com
              </div>
            </div>

            <Img
              src={staticFile("landing.png")}
              style={{
                width: 2600,
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Floating badges around the screenshot */}
          <div
            style={{
              position: "absolute",
              top: 180,
              left: -120,
              transform: `translateY(${float1}px) scale(${interpolate(badge1Progress, [0, 1], [0, 1])})`,
              opacity: interpolate(badge1Progress, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "20px 32px",
                borderRadius: 20,
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              <span style={{ fontSize: 36 }}>📄</span>
              <div>
                <div style={{ color: "#1a1a1a" }}>Upload any paper</div>
                <div style={{ color: "#64748b", fontSize: 22, fontWeight: 400 }}>PDF supported</div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 400,
              right: -100,
              transform: `translateY(${float2}px) scale(${interpolate(badge2Progress, [0, 1], [0, 1])})`,
              opacity: interpolate(badge2Progress, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                backgroundColor: "#1e293b",
                color: "#ffffff",
                padding: "20px 32px",
                borderRadius: 20,
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                display: "flex",
                alignItems: "center",
                gap: 16,
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              <span style={{ color: "#10b981", fontSize: 36 }}>⚡</span>
              <div>
                <div>AI-Powered</div>
                <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 400 }}>Instant insights</div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 100,
              left: 200,
              transform: `translateY(${-float1}px) scale(${interpolate(badge3Progress, [0, 1], [0, 1])})`,
              opacity: interpolate(badge3Progress, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                color: "#ffffff",
                padding: "20px 40px",
                borderRadius: 50,
                boxShadow: "0 20px 60px rgba(245,158,11,0.4)",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              Start Free →
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
