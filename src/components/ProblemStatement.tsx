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
  const textY = interpolate(textProgress, [0, 1], [60, 0]);

  // Create overwhelming lines of "text" that pile up - BIGGER
  const linesCount = Math.min(Math.floor(localFrame * 1.2), 30);
  const lines = Array.from({ length: linesCount }, (_, i) => {
    const lineProgress = spring({
      frame: localFrame - i * 1.5,
      fps,
      config: { damping: 20, stiffness: 150 },
    });
    const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.7]);
    const lineWidth = 500 + (i % 5) * 120 + Math.sin(i * 1.5) * 150;
    const xOffset = Math.sin(i * 0.8) * 40;

    return (
      <div
        key={i}
        style={{
          height: 18,
          width: lineWidth,
          backgroundColor: "#9ca3af",
          borderRadius: 9,
          opacity: lineOpacity,
          transform: `translateX(${xOffset}px)`,
        }}
      />
    );
  });

  // Exit fade
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
      }}
    >
      {/* Centered container for text + visual */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 120,
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
              fontSize: 160,
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Dense
            <br />
            <span style={{ color: "#ef4444" }}>papers.</span>
          </h1>
        </div>

        {/* Visual: Wall of text lines - RIGHT NEXT TO TEXT */}
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
  const textX = interpolate(textProgress, [0, 1], [-80, 0]);

  // Citation brackets that lead to nothing - BIGGER
  const citations = ["[1]", "[2]", "[3]", "[4]", "[5]", "[6]"];

  // Exit fade
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
              fontSize: 160,
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            Dead-end
            <br />
            <span style={{ color: "#f97316" }}>citations.</span>
          </h1>
        </div>

        {/* Visual: Citation brackets with broken lines - BIGGER */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {citations.map((citation, i) => {
            const citationProgress = spring({
              frame: localFrame - 8 - i * 3,
              fps,
              config: { damping: 12, stiffness: 100 },
            });
            const citationOpacity = interpolate(citationProgress, [0, 1], [0, 1]);
            const citationX = interpolate(citationProgress, [0, 1], [80, 0]);

            // Line that breaks/fades
            const lineWidth = interpolate(citationProgress, [0, 0.5, 1], [0, 350, 180]);
            const lineOpacity = interpolate(citationProgress, [0, 0.5, 1], [0, 1, 0.25]);

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
                    fontSize: 64,
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
                    height: 6,
                    background: `linear-gradient(90deg, #f97316 0%, #fdba74 50%, transparent 100%)`,
                    opacity: lineOpacity,
                    borderRadius: 3,
                  }}
                />
                {/* Dead end indicator */}
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
  const textY = interpolate(textProgress, [0, 1], [60, 0]);

  // Terminal with just blinking cursor
  const cursorBlink = Math.floor(localFrame / 12) % 2 === 0;

  // Code lines that are grayed out / impossible to reach
  const codeLines = [
    "def implement(paper):",
    "    # How do I even start?",
    "    # Where's the code?",
    "    pass",
    "",
    "# No implementation available",
    "# Good luck figuring it out...",
  ];

  const terminalProgress = spring({
    frame: localFrame - 10,
    fps,
    config: { damping: 12, stiffness: 60 },
  });
  const terminalOpacity = interpolate(terminalProgress, [0, 1], [0, 1]);
  const terminalScale = interpolate(terminalProgress, [0, 1], [0.85, 1]);

  // Exit fade
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
              fontSize: 160,
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: 0,
            }}
          >
            No
            <br />
            <span style={{ color: "#eab308" }}>implementation.</span>
          </h1>
        </div>

        {/* Visual: Empty/grayed terminal - BIGGER */}
        <div
          style={{
            opacity: terminalOpacity,
            transform: `scale(${terminalScale})`,
          }}
        >
          <div
            style={{
              backgroundColor: "#1e293b",
              borderRadius: 24,
              padding: 0,
              width: 900,
              boxShadow: "0 50px 100px rgba(0,0,0,0.3)",
              overflow: "hidden",
            }}
          >
            {/* Terminal header */}
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

            {/* Terminal content */}
            <div
              style={{
                padding: "35px 40px",
                fontFamily: "monospace",
                fontSize: 30,
              }}
            >
              {codeLines.map((line, i) => {
                const lineProgress = spring({
                  frame: localFrame - 12 - i * 3,
                  fps,
                  config: { damping: 15, stiffness: 120 },
                });
                const lineOpacity = interpolate(lineProgress, [0, 1], [0, 0.5]);

                return (
                  <div
                    key={i}
                    style={{
                      color: line.startsWith("#") ? "#64748b" : "#94a3b8",
                      opacity: lineOpacity,
                      height: 42,
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
                  marginTop: 30,
                }}
              >
                <span style={{ color: "#64748b", fontSize: 30 }}>$</span>
                <div
                  style={{
                    width: 18,
                    height: 36,
                    backgroundColor: cursorBlink ? "#eab308" : "transparent",
                    marginLeft: 12,
                    borderRadius: 2,
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
  // Each problem gets ~40 frames (1.3 seconds)
  // Total: 120 frames

  return (
    <AbsoluteFill style={{ backgroundColor: "#fafafa" }}>
      {/* Problem 1: Dense Papers (frames 0-40) */}
      <DensePapers startFrame={0} />

      {/* Problem 2: Dead-end Citations (frames 40-80) */}
      <DeadEndCitations startFrame={40} />

      {/* Problem 3: No Implementation (frames 80-120) */}
      <NoImplementation startFrame={80} />
    </AbsoluteFill>
  );
};
