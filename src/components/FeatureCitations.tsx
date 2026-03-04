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

export const FeatureCitations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Feature badge animation
  const badgeProgress = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const badgeScale = interpolate(badgeProgress, [0, 1], [0, 1]);
  const badgeRotation = interpolate(badgeProgress, [0, 1], [-10, 0]);

  // Main content slide in
  const contentProgress = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 60 },
  });
  const contentOpacity = interpolate(contentProgress, [0, 1], [0, 1]);
  const contentY = interpolate(contentProgress, [0, 1], [100, 0]);

  // Screenshot with browser frame - dramatic entrance
  const screenProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 12, stiffness: 50 },
  });
  const screenScale = interpolate(screenProgress, [0, 1], [0.7, 1]);
  const screenOpacity = interpolate(screenProgress, [0, 1], [0, 1]);
  const screenRotateY = interpolate(screenProgress, [0, 1], [15, 0]);

  // Highlight effect on screenshot
  const highlightFrame = frame - 80;
  const highlightPulse = highlightFrame > 0
    ? Math.sin(highlightFrame * 0.15) * 0.02 + 1
    : 1;

  // Floating annotations
  const annotationProgress = spring({
    frame: frame - 60,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const annotationOpacity = interpolate(annotationProgress, [0, 1], [0, 1]);
  const annotationScale = interpolate(annotationProgress, [0, 1], [0.8, 1]);

  // Exit
  const exitStart = 155;
  const exitOpacity = interpolate(frame, [exitStart, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFBF5",
        opacity: exitOpacity,
      }}
    >
      <GradientOrbs />
      <FloatingShapes colors={["#fef3c7", "#d1fae5", "#ffedd5"]} count={5} speed={0.3} />

      {/* Main layout - side by side, tighter */}
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
        {/* Left - Text content */}
        <div
          style={{
            flex: "0 0 auto",
            maxWidth: 900,
            opacity: contentOpacity,
            transform: `translateY(${contentY}px)`,
          }}
        >
          {/* Feature badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              backgroundColor: "#fef3c7",
              padding: "16px 28px",
              borderRadius: 50,
              marginBottom: 40,
              transform: `scale(${badgeScale}) rotate(${badgeRotation}deg)`,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "#f59e0b",
              }}
            />
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#92400e",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Contextual Citations
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              fontSize: 90,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Citations that
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b, #f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "italic",
                fontWeight: 500,
              }}
            >
              actually explain
            </span>
          </h2>

          {/* Subtext */}
          <p
            style={{
              fontSize: 34,
              color: "#64748b",
              marginTop: 36,
              lineHeight: 1.5,
              maxWidth: 700,
            }}
          >
            Click any reference to see abstracts, key findings,
            and context — without leaving your paper.
          </p>
        </div>

        {/* Right - Screenshot */}
        <div
          style={{
            flex: "0 0 auto",
            position: "relative",
            opacity: screenOpacity,
            transform: `scale(${screenScale * highlightPulse}) perspective(1000px) rotateY(${screenRotateY}deg)`,
          }}
        >
          {/* Glow behind */}
          <div
            style={{
              position: "absolute",
              width: "110%",
              height: "110%",
              left: "-5%",
              top: "-5%",
              background: "radial-gradient(ellipse, rgba(245,158,11,0.2) 0%, transparent 60%)",
              filter: "blur(40px)",
            }}
          />

          {/* Browser frame */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 24,
              boxShadow: "0 60px 120px -20px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* Browser bar */}
            <div
              style={{
                height: 56,
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                gap: 10,
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#22c55e" }} />
            </div>

            <Img
              src={staticFile("citations.png")}
              style={{
                width: 1300,
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Floating annotation */}
          <div
            style={{
              position: "absolute",
              top: 120,
              right: -80,
              backgroundColor: "#1e293b",
              color: "#ffffff",
              padding: "18px 28px",
              borderRadius: 16,
              fontSize: 26,
              fontWeight: 600,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              opacity: annotationOpacity,
              transform: `scale(${annotationScale})`,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ color: "#f59e0b" }}>✦</span>
            One click. Full context.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
