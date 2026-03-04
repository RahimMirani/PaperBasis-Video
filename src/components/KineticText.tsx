import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import React from "react";

interface KineticTextProps {
  text: string;
  startFrame?: number;
  style?: React.CSSProperties;
  wordByWord?: boolean;
  characterByCharacter?: boolean;
  staggerDelay?: number;
  className?: string;
  italic?: boolean;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  startFrame = 0,
  style = {},
  wordByWord = true,
  characterByCharacter = false,
  staggerDelay = 4,
  className = "",
  italic = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = frame - startFrame;

  if (characterByCharacter) {
    const characters = text.split("");
    return (
      <span style={style} className={className}>
        {characters.map((char, index) => {
          const charProgress = spring({
            frame: adjustedFrame - index * staggerDelay,
            fps,
            config: { damping: 12, stiffness: 100 },
          });

          const y = interpolate(charProgress, [0, 1], [80, 0]);
          const opacity = interpolate(charProgress, [0, 1], [0, 1]);

          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                transform: `translateY(${y}px)`,
                opacity,
                fontStyle: italic ? "italic" : "normal",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    );
  }

  if (wordByWord) {
    const words = text.split(" ");
    return (
      <span style={style} className={className}>
        {words.map((word, index) => {
          const wordProgress = spring({
            frame: adjustedFrame - index * staggerDelay,
            fps,
            config: { damping: 15, stiffness: 120 },
          });

          const y = interpolate(wordProgress, [0, 1], [60, 0]);
          const opacity = interpolate(wordProgress, [0, 1], [0, 1]);
          const scale = interpolate(wordProgress, [0, 1], [0.9, 1]);

          return (
            <span
              key={index}
              style={{
                display: "inline-block",
                transform: `translateY(${y}px) scale(${scale})`,
                opacity,
                marginRight: "0.3em",
                fontStyle: italic ? "italic" : "normal",
              }}
            >
              {word}
            </span>
          );
        })}
      </span>
    );
  }

  // Simple fade in
  const progress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const y = interpolate(progress, [0, 1], [40, 0]);

  return (
    <span
      style={{
        ...style,
        display: "inline-block",
        transform: `translateY(${y}px)`,
        opacity,
        fontStyle: italic ? "italic" : "normal",
      }}
      className={className}
    >
      {text}
    </span>
  );
};

// Highlight text with animated underline or background
interface HighlightTextProps {
  text: string;
  startFrame?: number;
  highlightColor?: string;
  style?: React.CSSProperties;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  startFrame = 0,
  highlightColor = "#FDE68A",
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const adjustedFrame = frame - startFrame;

  const textProgress = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  const highlightProgress = spring({
    frame: adjustedFrame - 8,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const opacity = interpolate(textProgress, [0, 1], [0, 1]);
  const y = interpolate(textProgress, [0, 1], [30, 0]);
  const highlightWidth = interpolate(highlightProgress, [0, 1], [0, 100]);

  return (
    <span
      style={{
        ...style,
        display: "inline-block",
        position: "relative",
        transform: `translateY(${y}px)`,
        opacity,
      }}
    >
      <span
        style={{
          position: "absolute",
          bottom: 4,
          left: 0,
          height: "35%",
          width: `${highlightWidth}%`,
          backgroundColor: highlightColor,
          zIndex: -1,
        }}
      />
      {text}
    </span>
  );
};
