import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Floating emoji reaction component
const EmojiReaction: React.FC<{
  emoji: string;
  startFrame: number;
  x: number;
  y: number;
  rotation?: number;
}> = ({ emoji, startFrame, x, y, rotation = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 8, stiffness: 120 },
  });

  const floatY = Math.sin(localFrame * 0.15) * 10;
  const opacity = interpolate(localFrame, [0, 5, 25, 35], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        fontSize: 100,
        opacity,
        transform: `scale(${progress}) translateY(${floatY}px) rotate(${rotation}deg)`,
      }}
    >
      {emoji}
    </div>
  );
};

// Problem 1: Dense Papers - FASTER
const DensePapers: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  // Screen shake on entrance
  const shakeX = localFrame < 8 ? Math.sin(localFrame * 3) * 6 : 0;
  const shakeY = localFrame < 8 ? Math.cos(localFrame * 4) * 4 : 0;

  const textProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 8, stiffness: 150 },
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [60, 0]);
  const textScale = interpolate(textProgress, [0, 1], [0.9, 1]);

  // Faster lines buildup
  const linesCount = Math.min(Math.floor(localFrame * 2.5), 20);
  const lines = Array.from({ length: linesCount }, (_, i) => {
    const lineProgress = spring({
      frame: localFrame - i * 0.8,
      fps,
      config: { damping: 15, stiffness: 200 },
    });
    const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.7]);
    const lineWidth = 500 + (i % 5) * 120 + Math.sin(i * 1.5) * 150;

    return (
      <div
        key={i}
        style={{
          height: 24,
          width: lineWidth,
          backgroundColor: "#9ca3af",
          borderRadius: 12,
          opacity: lineOpacity,
          transform: `translateX(${Math.sin(i * 0.8) * 40}px)`,
        }}
      />
    );
  });

  // Exit fade - FASTER
  const exitOpacity = interpolate(localFrame, [28, 36], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Emoji reactions */}
      <EmojiReaction emoji="😤" startFrame={startFrame + 5} x={300} y={350} rotation={-15} />
      <EmojiReaction emoji="😫" startFrame={startFrame + 8} x={3400} y={400} rotation={10} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 100,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px) scale(${textScale})`,
          }}
        >
          <h1
            style={{
              fontSize: 220,
              fontWeight: 900,
              color: "#1a1a1a",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: 0,
            }}
          >
            Dense
            <br />
            <span style={{ color: "#ef4444" }}>papers.</span>
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "flex-start",
          }}
        >
          {lines}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Problem 2: Dead-end Citations - FASTER
const DeadEndCitations: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  // Screen shake
  const shakeX = localFrame < 8 ? Math.sin(localFrame * 3) * 6 : 0;
  const shakeY = localFrame < 8 ? Math.cos(localFrame * 4) * 4 : 0;

  const textProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 8, stiffness: 150 },
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textX = interpolate(textProgress, [0, 1], [-80, 0]);
  const textScale = interpolate(textProgress, [0, 1], [0.9, 1]);

  const citations = ["[1]", "[2]", "[3]", "[4]", "[5]"];

  // Exit fade - FASTER
  const exitOpacity = interpolate(localFrame, [28, 36], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Emoji reactions */}
      <EmojiReaction emoji="🔗" startFrame={startFrame + 5} x={350} y={300} rotation={-10} />
      <EmojiReaction emoji="❌" startFrame={startFrame + 8} x={3350} y={450} rotation={15} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 100,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px) scale(${textScale})`,
          }}
        >
          <h1
            style={{
              fontSize: 220,
              fontWeight: 900,
              color: "#1a1a1a",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: 0,
            }}
          >
            Dead-end
            <br />
            <span style={{ color: "#f97316" }}>citations.</span>
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {citations.map((citation, i) => {
            const citationProgress = spring({
              frame: localFrame - 3 - i * 1.5,
              fps,
              config: { damping: 10, stiffness: 150 },
            });
            const citationOpacity = interpolate(citationProgress, [0, 1], [0, 1]);
            const citationX = interpolate(citationProgress, [0, 1], [80, 0]);
            const lineWidth = interpolate(citationProgress, [0, 0.5, 1], [0, 350, 150]);
            const lineOpacity = interpolate(citationProgress, [0, 0.5, 1], [0, 1, 0.15]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  opacity: citationOpacity,
                  transform: `translateX(${citationX}px)`,
                }}
              >
                <span
                  style={{
                    fontSize: 72,
                    fontWeight: 700,
                    color: "#f97316",
                    fontFamily: "monospace",
                  }}
                >
                  {citation}
                </span>
                <div
                  style={{
                    width: lineWidth,
                    height: 8,
                    background: `linear-gradient(90deg, #f97316 0%, #fdba74 50%, transparent 100%)`,
                    opacity: lineOpacity,
                    borderRadius: 4,
                  }}
                />
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    border: "4px solid #d1d5db",
                    opacity: lineOpacity * 0.8,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Problem 3: No Implementation - FASTER
const NoImplementation: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  // Screen shake
  const shakeX = localFrame < 8 ? Math.sin(localFrame * 3) * 6 : 0;
  const shakeY = localFrame < 8 ? Math.cos(localFrame * 4) * 4 : 0;

  const textProgress = spring({
    frame: localFrame,
    fps,
    config: { damping: 8, stiffness: 150 },
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [60, 0]);
  const textScale = interpolate(textProgress, [0, 1], [0.9, 1]);

  const cursorBlink = Math.floor(localFrame / 8) % 2 === 0;

  const codeLines = [
    "def implement(paper):",
    "    # How do I start?",
    "    # Where's the code?",
    "    pass",
  ];

  const terminalProgress = spring({
    frame: localFrame - 4,
    fps,
    config: { damping: 10, stiffness: 100 },
  });
  const terminalOpacity = interpolate(terminalProgress, [0, 1], [0, 1]);
  const terminalScale = interpolate(terminalProgress, [0, 1], [0.85, 1]);

  // Exit fade - FASTER
  const exitOpacity = interpolate(localFrame, [32, 40], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#fafafa",
        justifyContent: "center",
        alignItems: "center",
        opacity: exitOpacity,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      {/* Emoji reactions */}
      <EmojiReaction emoji="💻" startFrame={startFrame + 5} x={320} y={380} rotation={-12} />
      <EmojiReaction emoji="😵" startFrame={startFrame + 8} x={3380} y={350} rotation={8} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 100,
        }}
      >
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px) scale(${textScale})`,
          }}
        >
          <h1
            style={{
              fontSize: 200,
              fontWeight: 900,
              color: "#1a1a1a",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: 0,
            }}
          >
            No
            <br />
            <span style={{ color: "#eab308" }}>implementation.</span>
          </h1>
        </div>

        <div
          style={{
            opacity: terminalOpacity,
            transform: `scale(${terminalScale})`,
          }}
        >
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 28,
              padding: 0,
              width: 900,
              boxShadow: "0 50px 100px rgba(0,0,0,0.35)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: 60,
                backgroundColor: "#0f172a",
                display: "flex",
                alignItems: "center",
                padding: "0 24px",
                gap: 12,
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ marginLeft: 20, color: "#64748b", fontSize: 22 }}>terminal</span>
            </div>

            <div
              style={{
                padding: "32px 40px",
                fontFamily: "monospace",
                fontSize: 34,
              }}
            >
              {codeLines.map((line, i) => {
                const lineProgress = spring({
                  frame: localFrame - 6 - i * 1.5,
                  fps,
                  config: { damping: 12, stiffness: 150 },
                });
                const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.55]);

                return (
                  <div
                    key={i}
                    style={{
                      color: line.startsWith("#") || line.includes("#") ? "#64748b" : "#94a3b8",
                      opacity: lineOpacity,
                      height: 46,
                    }}
                  >
                    {line}
                  </div>
                );
              })}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 28,
                }}
              >
                <span style={{ color: "#64748b", fontSize: 34 }}>$</span>
                <div
                  style={{
                    width: 18,
                    height: 38,
                    backgroundColor: cursorBlink ? "#eab308" : "transparent",
                    marginLeft: 12,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ProblemStatement: React.FC = () => {
  // FASTER: Each problem gets ~36 frames (1.2 seconds)
  // Total: 110 frames

  return (
    <AbsoluteFill style={{ backgroundColor: "#fafafa" }}>
      {/* Problem 1: Dense Papers (frames 0-36) */}
      <DensePapers startFrame={0} />

      {/* Problem 2: Dead-end Citations (frames 36-72) */}
      <DeadEndCitations startFrame={36} />

      {/* Problem 3: No Implementation (frames 72-110) */}
      <NoImplementation startFrame={72} />
    </AbsoluteFill>
  );
};
