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

  // Main content slide in
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
  const screenScale = interpolate(screenProgress, [0, 1], [0.85, 1]);
  const screenOpacity = interpolate(screenProgress, [0, 1], [0, 1]);

  // Highlight pulse
  const highlightFrame = frame - 120;
  const highlightPulse = highlightFrame > 0
    ? Math.sin(highlightFrame * 0.1) * 0.01 + 1
    : 1;

  // Floating annotation
  const annotationProgress = spring({
    frame: frame - 100,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const annotationOpacity = interpolate(annotationProgress, [0, 1], [0, 1]);
  const annotationScale = interpolate(annotationProgress, [0, 1], [0.8, 1]);

  // Exit
  const exitStart = 185;
  const exitOpacity = interpolate(frame, [exitStart, 210], [1, 0], {
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

      {/* ZOOMED IN layout - stacked vertically for more impact */}
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
              backgroundColor: "#fef3c7",
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
                backgroundColor: "#f59e0b",
              }}
            />
            <span
              style={{
                fontSize: 40,
                fontWeight: 600,
                color: "#92400e",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              Contextual Citations
            </span>
          </div>

          {/* Headline - HUGE */}
          <h2
            style={{
              fontSize: 150,
              fontWeight: 700,
              color: "#1a1a1a",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Citations that{" "}
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
        </div>

        {/* Bottom - Screenshot - MASSIVE */}
        <div
          style={{
            position: "relative",
            opacity: screenOpacity,
            transform: `scale(${screenScale * highlightPulse})`,
          }}
        >
          {/* Glow behind */}
          <div
            style={{
              position: "absolute",
              width: "130%",
              height: "130%",
              left: "-15%",
              top: "-15%",
              background: "radial-gradient(ellipse, rgba(245,158,11,0.3) 0%, transparent 60%)",
              filter: "blur(60px)",
            }}
          />

          {/* Browser frame */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 32,
              boxShadow: "0 80px 160px -30px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* Browser bar */}
            <div
              style={{
                height: 72,
                backgroundColor: "#f8fafc",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                padding: "0 32px",
                gap: 14,
              }}
            >
              <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 20, height: 20, borderRadius: "50%", backgroundColor: "#22c55e" }} />
            </div>

            {/* Screenshot - HUGE */}
            <Img
              src={staticFile("citations.png")}
              style={{
                width: 2200,
                height: "auto",
                display: "block",
              }}
            />
          </div>

          {/* Floating annotation - BIGGER */}
          <div
            style={{
              position: "absolute",
              top: 180,
              right: -40,
              backgroundColor: "#1e293b",
              color: "#ffffff",
              padding: "28px 48px",
              borderRadius: 24,
              fontSize: 40,
              fontWeight: 600,
              boxShadow: "0 30px 60px rgba(0,0,0,0.4)",
              opacity: annotationOpacity,
              transform: `scale(${annotationScale})`,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <span style={{ color: "#f59e0b", fontSize: 36 }}>✦</span>
            One click. Full context.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
