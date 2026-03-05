import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import {
  LogoReveal,
  StuckIn1993,
  ProblemStatement,
  SolutionIntro,
  FeatureCitations,
  FeatureCode,
  ProductReveal,
  Tagline,
} from "./components";

/**
 * PaperBasis Launch Video - 40 seconds @ 30fps = 1200 frames
 *
 * OPTIMIZED Timeline for maximum impact:
 * - 0-150 (0-5s): Stuck in 1993 - HOOK + OPENER
 * - 150-260 (5-8.7s): Problem Statement (3 problems) - FASTER
 * - 260-420 (8.7-14s): Solution Intro - MORE ENERGY
 * - 420-630 (14-21s): Feature - Citations (7 seconds)
 * - 630-840 (21-28s): Feature - Code (7 seconds)
 * - 840-970 (28-32.3s): Product Reveal
 * - 970-1070 (32.3-35.7s): Tagline (LIGHT)
 * - 1070-1200 (35.7-40s): Logo Reveal + CTA (LIGHT) - EXTENDED FOR IMPACT
 */

// Smooth transition component
const SmoothTransition: React.FC<{
  startFrame: number;
  duration?: number;
  fromDark?: boolean;
}> = ({ startFrame, duration = 45, fromDark = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > duration) return null;

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const opacity = fromDark
    ? interpolate(progress, [0, 1], [1, 0])
    : interpolate(progress, [0, 1], [0, 1]);

  const scale = interpolate(progress, [0, 1], [1, 1.05]);
  const blur = interpolate(progress, [0, 0.5, 1], [0, 8, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f0f0f",
        opacity,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px)`,
        pointerEvents: "none",
      }}
    />
  );
};

export const PaperBasisLaunch: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth background color transitions - UPDATED TIMINGS
  const getBgDarkness = () => {
    if (frame < 130) return 1; // 1993 - dark
    if (frame < 170) return interpolate(frame, [130, 170], [1, 0]); // transition to light
    if (frame < 235) return 0; // Problem - light
    if (frame < 280) return interpolate(frame, [235, 280], [0, 1]); // transition to dark
    if (frame < 395) return 1; // Solution - dark
    if (frame < 440) return interpolate(frame, [395, 440], [1, 0]); // transition to light
    if (frame < 605) return 0; // Citations - light
    if (frame < 650) return interpolate(frame, [605, 650], [0, 1]); // transition to dark
    if (frame < 815) return 1; // Code - dark
    if (frame < 860) return interpolate(frame, [815, 860], [1, 0]); // transition to light
    // Product, Tagline, Logo are all LIGHT
    return 0;
  };

  const darkOpacity = getBgDarkness();

  return (
    <AbsoluteFill>
      {/* Smooth morphing background */}
      <AbsoluteFill style={{ backgroundColor: "#FFFBF5" }} />
      <AbsoluteFill
        style={{
          backgroundColor: "#0f0f0f",
          opacity: darkOpacity,
        }}
      />

      {/* Scene 1: Stuck in 1993 (0-5s) - HOOK + OPENER - Dark */}
      <Sequence durationInFrames={150}>
        <StuckIn1993 />
      </Sequence>

      {/* Smooth transition to light */}
      <SmoothTransition startFrame={130} duration={45} fromDark={true} />

      {/* Scene 2: Problem Statement (5-8.7s) - FASTER - Light */}
      <Sequence from={150} durationInFrames={110}>
        <ProblemStatement />
      </Sequence>

      {/* Smooth transition to dark */}
      <SmoothTransition startFrame={235} duration={50} fromDark={false} />

      {/* Scene 3: Solution Intro (8.7-14s) - MORE ENERGY - Dark */}
      <Sequence from={260} durationInFrames={160}>
        <SolutionIntro />
      </Sequence>

      {/* Smooth transition to light */}
      <SmoothTransition startFrame={395} duration={50} fromDark={true} />

      {/* Scene 4: Feature - Citations (14-21s) - Light */}
      <Sequence from={420} durationInFrames={210}>
        <FeatureCitations />
      </Sequence>

      {/* Smooth transition to dark */}
      <SmoothTransition startFrame={605} duration={50} fromDark={false} />

      {/* Scene 5: Feature - Code (21-28s) - Dark */}
      <Sequence from={630} durationInFrames={210}>
        <FeatureCode />
      </Sequence>

      {/* Smooth transition to light */}
      <SmoothTransition startFrame={815} duration={50} fromDark={true} />

      {/* Scene 6: Product Reveal (28-32.3s) - Light */}
      <Sequence from={840} durationInFrames={130}>
        <ProductReveal />
      </Sequence>

      {/* Scene 7: Tagline (32.3-35.7s) - LIGHT */}
      <Sequence from={970} durationInFrames={100}>
        <Tagline />
      </Sequence>

      {/* Scene 8: Logo Reveal + CTA (35.7-40s) - EXTENDED - LIGHT */}
      <Sequence from={1070} durationInFrames={130}>
        <LogoReveal />
      </Sequence>
    </AbsoluteFill>
  );
};
