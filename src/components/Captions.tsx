import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface CaptionItem {
  text: string;
  startFrame: number;
  endFrame: number;
  style?: "default" | "emphasis" | "cta";
}

/**
 * Captions aligned with new timeline:
 * - 0-150: Hook + 1993
 * - 150-260: Problem Statement (faster)
 * - 260-420: Solution Intro
 * - 420-630: Feature Citations
 * - 630-840: Feature Code
 * - 840-970: Product Reveal
 * - 970-1070: Tagline
 * - 1070-1200: Logo + CTA
 */
const captions: CaptionItem[] = [
  // Hook (0-45)
  { text: "Reading papers is broken", startFrame: 5, endFrame: 40, style: "emphasis" },

  // 1993 section (40-150)
  { text: "Nothing has changed since 1993", startFrame: 85, endFrame: 140, style: "default" },

  // Problem section - FASTER (150-260)
  { text: "Dense papers", startFrame: 155, endFrame: 180, style: "default" },
  { text: "Dead-end citations", startFrame: 188, endFrame: 215, style: "default" },
  { text: "No implementation", startFrame: 223, endFrame: 252, style: "default" },

  // Solution intro (260-420)
  { text: "A new interface for research", startFrame: 270, endFrame: 350, style: "emphasis" },
  { text: "AI-Powered • Contextual • Ready", startFrame: 360, endFrame: 410, style: "default" },

  // Feature Citations (420-630)
  { text: "Citations that actually explain", startFrame: 440, endFrame: 540, style: "default" },
  { text: "One click. Full context.", startFrame: 560, endFrame: 620, style: "default" },

  // Feature Code (630-840)
  { text: "From paper to full code", startFrame: 650, endFrame: 760, style: "default" },
  { text: "Ready to run", startFrame: 780, endFrame: 830, style: "default" },

  // Product Reveal (840-970)
  { text: "Upload any paper • Instant insights", startFrame: 860, endFrame: 960, style: "default" },

  // Tagline (970-1070)
  { text: "Research, finally understood", startFrame: 985, endFrame: 1060, style: "emphasis" },

  // CTA (1070-1200)
  { text: "Try it free at paperbasis.com", startFrame: 1090, endFrame: 1200, style: "cta" },
];

const Caption: React.FC<{ item: CaptionItem }> = ({ item }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - item.startFrame;
  const duration = item.endFrame - item.startFrame;

  if (frame < item.startFrame || frame > item.endFrame) return null;

  const enterProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const exitProgress = spring({
    frame: localFrame - duration + 15,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(exitProgress, [0, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }) * interpolate(enterProgress, [0, 1], [0, 1]);

  const y = interpolate(enterProgress, [0, 1], [30, 0]);
  const scale = interpolate(enterProgress, [0, 1], [0.95, 1]);

  const getStyles = () => {
    switch (item.style) {
      case "emphasis":
        return {
          background: "linear-gradient(135deg, rgba(245,158,11,0.95) 0%, rgba(249,115,22,0.95) 100%)",
          color: "#ffffff",
          fontSize: 52,
          fontWeight: 700 as const,
          padding: "24px 60px",
          boxShadow: "0 20px 60px rgba(245,158,11,0.4)",
        };
      case "cta":
        return {
          background: "linear-gradient(135deg, rgba(16,185,129,0.95) 0%, rgba(5,150,105,0.95) 100%)",
          color: "#ffffff",
          fontSize: 56,
          fontWeight: 800 as const,
          padding: "28px 70px",
          boxShadow: "0 25px 70px rgba(16,185,129,0.5)",
        };
      default:
        return {
          background: "rgba(0,0,0,0.85)",
          color: "#ffffff",
          fontSize: 46,
          fontWeight: 600 as const,
          padding: "20px 50px",
          boxShadow: "0 15px 50px rgba(0,0,0,0.3)",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      style={{
        position: "absolute",
        bottom: 120,
        left: "50%",
        transform: `translateX(-50%) translateY(${y}px) scale(${scale})`,
        opacity,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          ...styles,
          borderRadius: 20,
          letterSpacing: "-0.01em",
          textAlign: "center",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {item.text}
      </div>
    </div>
  );
};

export const Captions: React.FC = () => {
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {captions.map((caption, i) => (
        <Caption key={i} item={caption} />
      ))}
    </AbsoluteFill>
  );
};
