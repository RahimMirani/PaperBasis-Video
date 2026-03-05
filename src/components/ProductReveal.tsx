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

// Confetti particle
const ConfettiParticle: React.FC<{
  index: number;
  color: string;
}> = ({ index, color }) => {
  const frame = useCurrentFrame();
  const startFrame = 5 + index * 1.5;
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const startX = 1920 + (Math.random() - 0.5) * 800;
  const startY = 0;
  const endY = 2400;

  const fallProgress = interpolate(localFrame, [0, 80], [0, 1], {
    extrapolateRight: "clamp",
  });

  const x = startX + Math.sin(localFrame * 0.1 + index) * 100;
  const y = startY + fallProgress * endY;

  const opacity = interpolate(localFrame, [0, 10, 60, 80], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const rotation = localFrame * (3 + index % 5);
  const scale = 0.5 + (index % 4) * 0.3;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 16,
        height: 16,
        backgroundColor: color,
        borderRadius: index % 3 === 0 ? "50%" : index % 3 === 1 ? "2px" : "4px",
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
      }}
    />
  );
};

export const ProductReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dramatic zoom reveal - FASTER
  const revealProgress = spring({
    frame: frame - 3,
    fps,
    config: { damping: 10, stiffness: 60 },
  });

  const scale = interpolate(revealProgress, [0, 1], [0.4, 1]);
  const opacity = interpolate(revealProgress, [0, 1], [0, 1]);
  const rotateX = interpolate(revealProgress, [0, 1], [25, 0]);

  // Floating elements
  const float1 = Math.sin(frame * 0.04) * 15;
  const float2 = Math.cos(frame * 0.03) * 12;

  // Stats/badges appearing - FASTER
  const badge1Progress = spring({
    frame: frame - 30,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const badge2Progress = spring({
    frame: frame - 42,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const badge3Progress = spring({
    frame: frame - 54,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  // Confetti colors
  const confettiColors = ["#f59e0b", "#10b981", "#f97316", "#ec4899", "#8b5cf6", "#06b6d4"];

  // Exit animation
  const exitStart = 105;
  const exitOpacity = interpolate(frame, [exitStart, 130], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [exitStart, 130], [1, 1.15], {
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
      <FloatingShapes colors={["#fef3c7", "#d1fae5", "#ffedd5", "#fce7f3"]} count={12} speed={0.5} />

      {/* Confetti */}
      {Array.from({ length: 30 }, (_, i) => (
        <ConfettiParticle
          key={i}
          index={i}
          color={confettiColors[i % confettiColors.length]}
        />
      ))}

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
              width: "140%",
              height: "140%",
              left: "-20%",
              top: "-20%",
              background: "radial-gradient(ellipse, rgba(245,158,11,0.2) 0%, rgba(16,185,129,0.15) 40%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />

          {/* Browser frame */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 32,
              boxShadow: `
                0 100px 200px -50px rgba(0,0,0,0.3),
                0 50px 100px -50px rgba(0,0,0,0.2),
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
              left: -140,
              transform: `translateY(${float1}px) scale(${interpolate(badge1Progress, [0, 1], [0, 1])})`,
              opacity: interpolate(badge1Progress, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                backgroundColor: "#ffffff",
                padding: "22px 36px",
                borderRadius: 20,
                boxShadow: "0 25px 70px rgba(0,0,0,0.18)",
                display: "flex",
                alignItems: "center",
                gap: 18,
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <span style={{ fontSize: 40 }}>📄</span>
              <div>
                <div style={{ color: "#1a1a1a" }}>Upload any paper</div>
                <div style={{ color: "#64748b", fontSize: 22, fontWeight: 500 }}>PDF supported</div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              top: 420,
              right: -120,
              transform: `translateY(${float2}px) scale(${interpolate(badge2Progress, [0, 1], [0, 1])})`,
              opacity: interpolate(badge2Progress, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                backgroundColor: "#1e293b",
                color: "#ffffff",
                padding: "22px 36px",
                borderRadius: 20,
                boxShadow: "0 25px 70px rgba(0,0,0,0.35)",
                display: "flex",
                alignItems: "center",
                gap: 18,
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              <span style={{ color: "#10b981", fontSize: 40 }}>⚡</span>
              <div>
                <div>AI-Powered</div>
                <div style={{ color: "#94a3b8", fontSize: 22, fontWeight: 500 }}>Instant insights</div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: 220,
              transform: `translateY(${-float1}px) scale(${interpolate(badge3Progress, [0, 1], [0, 1])})`,
              opacity: interpolate(badge3Progress, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                color: "#ffffff",
                padding: "24px 50px",
                borderRadius: 60,
                boxShadow: "0 25px 70px rgba(245,158,11,0.45)",
                fontSize: 32,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              Start Free
              <span style={{ fontSize: 36 }}>→</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
