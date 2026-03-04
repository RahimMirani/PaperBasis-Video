import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Problem 1: Dense Papers - Visual of overwhelming text lines
const DensePapers: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const textProgress = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [80, 0]);

  // Create overwhelming lines of "text" that pile up - BIGGER
  const linesCount = Math.min(Math.floor(localFrame * 1.5), 28);
  const lines = Array.from({ length: linesCount }, (_, i) => {
    const lineProgress = spring({
      frame: localFrame - i * 1.2,
      fps,
      config: { damping: 20, stiffness: 150 },
    });
    const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.75]);
    const lineWidth = 600 + (i % 5) * 140 + Math.sin(i * 1.5) * 180;
    const xOffset = Math.sin(i * 0.8) * 50;

    return (
      <div
        key={i}
        style={{
          height: 22,
          width: lineWidth,
          backgroundColor: "#9ca3af",
          borderRadius: 11,
          opacity: lineOpacity,
          transform: `translateX(${xOffset}px)`,
        }}
      />
    );
  });

  // Exit fade
  const exitOpacity = interpolate(localFrame, [35, 43], [1, 0], {
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
      }}
    >
      {/* Centered container for text + visual */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 100,
        }}
      >
        {/* Text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 200,
              fontWeight: 800,
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

        {/* Visual: Wall of text lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            alignItems: "flex-start",
          }}
        >
          {lines}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Problem 2: Dead-end Citations - Visual of broken/disconnected links
const DeadEndCitations: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const textProgress = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textX = interpolate(textProgress, [0, 1], [-100, 0]);

  // Citation brackets that lead to nothing
  const citations = ["[1]", "[2]", "[3]", "[4]", "[5]", "[6]"];

  // Exit fade
  const exitOpacity = interpolate(localFrame, [35, 43], [1, 0], {
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
      }}
    >
      {/* Centered container for text + visual */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 100,
        }}
      >
        {/* Text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateX(${textX}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 200,
              fontWeight: 800,
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

        {/* Visual: Citation brackets with broken lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
          }}
        >
          {citations.map((citation, i) => {
            const citationProgress = spring({
              frame: localFrame - 6 - i * 2.5,
              fps,
              config: { damping: 12, stiffness: 100 },
            });
            const citationOpacity = interpolate(citationProgress, [0, 1], [0, 1]);
            const citationX = interpolate(citationProgress, [0, 1], [100, 0]);

            // Line that breaks/fades
            const lineWidth = interpolate(citationProgress, [0, 0.5, 1], [0, 400, 200]);
            const lineOpacity = interpolate(citationProgress, [0, 0.5, 1], [0, 1, 0.2]);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 28,
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
                {/* Broken/fading line */}
                <div
                  style={{
                    width: lineWidth,
                    height: 8,
                    background: `linear-gradient(90deg, #f97316 0%, #fdba74 50%, transparent 100%)`,
                    opacity: lineOpacity,
                    borderRadius: 4,
                  }}
                />
                {/* Dead end indicator */}
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    border: "5px solid #d1d5db",
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

// Problem 3: No Implementation - Visual of empty terminal/code void
const NoImplementation: React.FC<{ startFrame: number }> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const textProgress = spring({
    frame: localFrame - 5,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const textOpacity = interpolate(textProgress, [0, 1], [0, 1]);
  const textY = interpolate(textProgress, [0, 1], [80, 0]);

  // Terminal with just blinking cursor
  const cursorBlink = Math.floor(localFrame / 10) % 2 === 0;

  // Code lines
  const codeLines = [
    "def implement(paper):",
    "    # How do I start?",
    "    # Where's the code?",
    "    pass",
    "",
    "# No implementation",
  ];

  const terminalProgress = spring({
    frame: localFrame - 8,
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const terminalOpacity = interpolate(terminalProgress, [0, 1], [0, 1]);
  const terminalScale = interpolate(terminalProgress, [0, 1], [0.85, 1]);

  // Exit fade
  const exitOpacity = interpolate(localFrame, [38, 46], [1, 0], {
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
      }}
    >
      {/* Centered container for text + visual */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 100,
        }}
      >
        {/* Text */}
        <div
          style={{
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 200,
              fontWeight: 800,
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

        {/* Visual: Terminal */}
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
              width: 1000,
              boxShadow: "0 60px 120px rgba(0,0,0,0.35)",
              overflow: "hidden",
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                height: 70,
                backgroundColor: "#0f172a",
                display: "flex",
                alignItems: "center",
                padding: "0 28px",
                gap: 14,
              }}
            >
              <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#ef4444" }} />
              <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
              <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ marginLeft: 24, color: "#64748b", fontSize: 26 }}>terminal</span>
            </div>

            {/* Terminal content */}
            <div
              style={{
                padding: "40px 48px",
                fontFamily: "monospace",
                fontSize: 36,
              }}
            >
              {codeLines.map((line, i) => {
                const lineProgress = spring({
                  frame: localFrame - 10 - i * 2.5,
                  fps,
                  config: { damping: 15, stiffness: 120 },
                });
                const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.55]);

                return (
                  <div
                    key={i}
                    style={{
                      color: line.startsWith("#") ? "#64748b" : "#94a3b8",
                      opacity: lineOpacity,
                      height: 50,
                    }}
                  >
                    {line}
                  </div>
                );
              })}

              {/* Blinking cursor */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 35,
                }}
              >
                <span style={{ color: "#64748b", fontSize: 36 }}>$</span>
                <div
                  style={{
                    width: 22,
                    height: 44,
                    backgroundColor: cursorBlink ? "#eab308" : "transparent",
                    marginLeft: 14,
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
  // Each problem gets ~43 frames
  // Total: 130 frames

  return (
    <AbsoluteFill style={{ backgroundColor: "#fafafa" }}>
      {/* Problem 1: Dense Papers (frames 0-43) */}
      <DensePapers startFrame={0} />

      {/* Problem 2: Dead-end Citations (frames 43-86) */}
      <DeadEndCitations startFrame={43} />

      {/* Problem 3: No Implementation (frames 86-130) */}
      <NoImplementation startFrame={86} />
    </AbsoluteFill>
  );
};
