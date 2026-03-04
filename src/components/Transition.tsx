import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

interface TransitionProps {
  type?: "fade" | "wipe" | "zoom" | "blur";
  direction?: "in" | "out";
  duration?: number;
  color?: string;
}

export const Transition: React.FC<TransitionProps> = ({
  type = "fade",
  direction = "in",
  duration = 15,
  color = "#FFFBF5",
}) => {
  const frame = useCurrentFrame();

  if (type === "fade") {
    const opacity =
      direction === "in"
        ? interpolate(frame, [0, duration], [1, 0], {
            extrapolateRight: "clamp",
          })
        : interpolate(frame, [0, duration], [0, 1], {
            extrapolateRight: "clamp",
          });

    return (
      <AbsoluteFill
        style={{
          backgroundColor: color,
          opacity,
          pointerEvents: "none",
        }}
      />
    );
  }

  if (type === "wipe") {
    const progress =
      direction === "in"
        ? interpolate(frame, [0, duration], [0, 100], {
            extrapolateRight: "clamp",
          })
        : interpolate(frame, [0, duration], [100, 0], {
            extrapolateRight: "clamp",
          });

    return (
      <AbsoluteFill
        style={{
          background: `linear-gradient(to right, transparent ${progress}%, ${color} ${progress}%)`,
          pointerEvents: "none",
        }}
      />
    );
  }

  if (type === "zoom") {
    const scale =
      direction === "in"
        ? interpolate(frame, [0, duration], [1.5, 1], {
            extrapolateRight: "clamp",
          })
        : interpolate(frame, [0, duration], [1, 1.5], {
            extrapolateRight: "clamp",
          });

    const opacity =
      direction === "in"
        ? interpolate(frame, [0, duration], [1, 0], {
            extrapolateRight: "clamp",
          })
        : interpolate(frame, [0, duration], [0, 1], {
            extrapolateRight: "clamp",
          });

    return (
      <AbsoluteFill
        style={{
          backgroundColor: color,
          opacity,
          transform: `scale(${scale})`,
          pointerEvents: "none",
        }}
      />
    );
  }

  return null;
};

// Crossfade between scenes
export const CrossFade: React.FC<{ durationInFrames?: number }> = ({
  durationInFrames = 20,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, durationInFrames], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFBF5",
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};
