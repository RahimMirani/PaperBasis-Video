import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

interface SceneTransitionProps {
  fromColor: string;
  toColor: string;
  type?: "morph" | "wipe" | "zoom" | "blur";
}

export const SceneTransition: React.FC<SceneTransitionProps> = ({
  fromColor,
  toColor,
  type = "morph",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (type === "morph") {
    // Smooth color morphing with expanding circle
    const progress = spring({
      frame,
      fps,
      config: { damping: 20, stiffness: 60 },
    });

    const circleScale = interpolate(progress, [0, 1], [0, 3]);
    const opacity = interpolate(frame, [0, 5], [0, 1], {
      extrapolateRight: "clamp",
    });

    return (
      <AbsoluteFill
        style={{
          backgroundColor: fromColor,
          opacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 2000,
            height: 2000,
            borderRadius: "50%",
            backgroundColor: toColor,
            transform: `translate(-50%, -50%) scale(${circleScale})`,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (type === "wipe") {
    const progress = spring({
      frame,
      fps,
      config: { damping: 25, stiffness: 80 },
    });

    const wipePosition = interpolate(progress, [0, 1], [-100, 100]);

    return (
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            width: "150%",
            height: "100%",
            left: `${wipePosition}%`,
            background: `linear-gradient(90deg, ${fromColor} 0%, ${toColor} 50%, ${toColor} 100%)`,
          }}
        />
      </AbsoluteFill>
    );
  }

  if (type === "zoom") {
    const progress = spring({
      frame,
      fps,
      config: { damping: 15, stiffness: 50 },
    });

    const scale = interpolate(progress, [0, 1], [1, 15]);
    const opacity = interpolate(progress, [0, 0.3, 1], [1, 1, 0]);

    return (
      <AbsoluteFill
        style={{
          backgroundColor: fromColor,
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: toColor,
            transform: "translate(-50%, -50%)",
          }}
        />
      </AbsoluteFill>
    );
  }

  // Default fade
  const opacity = interpolate(frame, [0, 20], [1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: fromColor,
        opacity,
      }}
    />
  );
};

// Overlay that creates smooth transitions between any scenes
export const TransitionOverlay: React.FC<{
  direction: "in" | "out";
  color?: string;
  blur?: boolean;
}> = ({ direction, color = "#0f0f0f", blur = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const opacity =
    direction === "in"
      ? interpolate(progress, [0, 1], [1, 0])
      : interpolate(progress, [0, 1], [0, 1]);

  const scale =
    direction === "in"
      ? interpolate(progress, [0, 1], [1.1, 1])
      : interpolate(progress, [0, 1], [1, 1.1]);

  const blurAmount =
    direction === "in"
      ? interpolate(progress, [0, 1], [20, 0])
      : interpolate(progress, [0, 1], [0, 20]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        opacity,
        transform: `scale(${scale})`,
        backdropFilter: blur ? `blur(${blurAmount}px)` : undefined,
        pointerEvents: "none",
      }}
    />
  );
};
