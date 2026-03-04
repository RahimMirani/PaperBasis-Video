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
 * Extended Timeline for premium pacing:
 * - 0-150 (0-5s): Stuck in 1993 - OPENER
 * - 150-320 (5-10.7s): Problem Statement (3 problems)
 * - 320-470 (10.7-15.7s): Solution Intro
 * - 470-680 (15.7-22.7s): Feature - Citations (7 seconds)
 * - 680-890 (22.7-29.7s): Feature - Code (7 seconds)
 * - 890-1020 (29.7-34s): Product Reveal
 * - 1020-1120 (34-37.3s): Tagline (LIGHT)
 * - 1120-1200 (37.3-40s): Logo Reveal (LIGHT) - CLOSER
 */

// Smooth transition component
const SmoothTransition: React.FC<{
  startFrame: number;
  duration?: number;
  fromDark?: boolean;
}> = ({ startFrame, duration = 50, fromDark = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > duration) return null;

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 25, stiffness: 70 },
  });

  const opacity = fromDark
    ? interpolate(progress, [0, 1], [1, 0])
    : interpolate(progress, [0, 1], [0, 1]);

  const scale = interpolate(progress, [0, 1], [1, 1.05]);
  const blur = interpolate(progress, [0, 0.5, 1], [0, 10, 0]);

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

  // Smooth background color transitions
  const getBgDarkness = () => {
    if (frame < 130) return 1; // 1993 - dark
    if (frame < 175) return interpolate(frame, [130, 175], [1, 0]); // transition to light
    if (frame < 295) return 0; // Problem - light
    if (frame < 345) return interpolate(frame, [295, 345], [0, 1]); // transition to dark
    if (frame < 445) return 1; // Solution - dark
    if (frame < 495) return interpolate(frame, [445, 495], [1, 0]); // transition to light
    if (frame < 655) return 0; // Citations - light
    if (frame < 705) return interpolate(frame, [655, 705], [0, 1]); // transition to dark
    if (frame < 865) return 1; // Code - dark
    if (frame < 915) return interpolate(frame, [865, 915], [1, 0]); // transition to light
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

      {/* Scene 1: Stuck in 1993 (0-5s) - OPENER - Dark */}
      <Sequence durationInFrames={150}>
        <StuckIn1993 />
      </Sequence>

      {/* Smooth transition to light */}
      <SmoothTransition startFrame={130} duration={50} fromDark={true} />

      {/* Scene 2: Problem Statement (5-10.7s) - Light */}
      <Sequence from={150} durationInFrames={170}>
        <ProblemStatement />
      </Sequence>

      {/* Smooth transition to dark */}
      <SmoothTransition startFrame={295} duration={55} fromDark={false} />

      {/* Scene 3: Solution Intro (10.7-15.7s) - Dark */}
      <Sequence from={320} durationInFrames={150}>
        <SolutionIntro />
      </Sequence>

      {/* Smooth transition to light */}
      <SmoothTransition startFrame={445} duration={55} fromDark={true} />

      {/* Scene 4: Feature - Citations (15.7-22.7s) - Light - MORE TIME */}
      <Sequence from={470} durationInFrames={210}>
        <FeatureCitations />
      </Sequence>

      {/* Smooth transition to dark */}
      <SmoothTransition startFrame={655} duration={55} fromDark={false} />

      {/* Scene 5: Feature - Code (22.7-29.7s) - Dark - MORE TIME */}
      <Sequence from={680} durationInFrames={210}>
        <FeatureCode />
      </Sequence>

      {/* Smooth transition to light */}
      <SmoothTransition startFrame={865} duration={55} fromDark={true} />

      {/* Scene 6: Product Reveal (29.7-34s) - Light */}
      <Sequence from={890} durationInFrames={130}>
        <ProductReveal />
      </Sequence>

      {/* Scene 7: Tagline (34-37.3s) - LIGHT */}
      <Sequence from={1020} durationInFrames={100}>
        <Tagline />
      </Sequence>

      {/* Scene 8: Logo Reveal (37.3-40s) - LIGHT - CLOSER */}
      <Sequence from={1120} durationInFrames={80}>
        <LogoReveal />
      </Sequence>
    </AbsoluteFill>
  );
};
