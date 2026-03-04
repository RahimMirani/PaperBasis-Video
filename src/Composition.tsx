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
 * PaperBasis Launch Video - 30 seconds @ 30fps = 900 frames
 *
 * Timeline (Logo at the end, final scenes in LIGHT MODE):
 * - 0-120 (0-4s): Stuck in 1993 (dark) - OPENER
 * - 120-250 (4-8.3s): Problem Statement (light)
 * - 250-370 (8.3-12.3s): Solution Intro (dark)
 * - 370-520 (12.3-17.3s): Feature - Citations (light)
 * - 520-670 (17.3-22.3s): Feature - Code (dark)
 * - 670-770 (22.3-25.7s): Product Reveal (light)
 * - 770-850 (25.7-28.3s): Tagline (LIGHT)
 * - 850-900 (28.3-30s): Logo Reveal (LIGHT) - CLOSER
 */

// Smooth transition component
const SmoothTransition: React.FC<{
  startFrame: number;
  duration?: number;
  fromDark?: boolean;
}> = ({ startFrame, duration = 40, fromDark = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > duration) return null;

  const progress = spring({
    frame: localFrame,
    fps,
    config: { damping: 25, stiffness: 80 },
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

  // Smooth background color transitions
  // Now: Tagline (770+) and Logo (850+) are LIGHT mode
  const getBgDarkness = () => {
    if (frame < 100) return 1; // 1993 - dark
    if (frame < 140) return interpolate(frame, [100, 140], [1, 0]); // transition to light
    if (frame < 230) return 0; // Problem - light
    if (frame < 270) return interpolate(frame, [230, 270], [0, 1]); // transition to dark
    if (frame < 350) return 1; // Solution - dark
    if (frame < 390) return interpolate(frame, [350, 390], [1, 0]); // transition to light
    if (frame < 500) return 0; // Citations - light
    if (frame < 540) return interpolate(frame, [500, 540], [0, 1]); // transition to dark
    if (frame < 650) return 1; // Code - dark
    if (frame < 690) return interpolate(frame, [650, 690], [1, 0]); // transition to light
    // Product, Tagline, Logo are all LIGHT now
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

      {/* Scene 1: Stuck in 1993 (0-4s) - OPENER - Dark */}
      <Sequence durationInFrames={120}>
        <StuckIn1993 />
      </Sequence>

      {/* Smooth transition to light */}
      <SmoothTransition startFrame={100} duration={45} fromDark={true} />

      {/* Scene 2: Problem Statement (4-8.3s) - Light */}
      <Sequence from={120} durationInFrames={130}>
        <ProblemStatement />
      </Sequence>

      {/* Smooth transition to dark */}
      <SmoothTransition startFrame={230} duration={45} fromDark={false} />

      {/* Scene 3: Solution Intro (8.3-12.3s) - Dark */}
      <Sequence from={250} durationInFrames={120}>
        <SolutionIntro />
      </Sequence>

      {/* Smooth transition to light */}
      <SmoothTransition startFrame={350} duration={45} fromDark={true} />

      {/* Scene 4: Feature - Citations (12.3-17.3s) - Light */}
      <Sequence from={370} durationInFrames={150}>
        <FeatureCitations />
      </Sequence>

      {/* Smooth transition to dark */}
      <SmoothTransition startFrame={500} duration={45} fromDark={false} />

      {/* Scene 5: Feature - Code (17.3-22.3s) - Dark */}
      <Sequence from={520} durationInFrames={150}>
        <FeatureCode />
      </Sequence>

      {/* Smooth transition to light */}
      <SmoothTransition startFrame={650} duration={45} fromDark={true} />

      {/* Scene 6: Product Reveal (22.3-25.7s) - Light */}
      <Sequence from={670} durationInFrames={100}>
        <ProductReveal />
      </Sequence>

      {/* Scene 7: Tagline (25.7-28.3s) - LIGHT */}
      <Sequence from={770} durationInFrames={80}>
        <Tagline />
      </Sequence>

      {/* Scene 8: Logo Reveal (28.3-30s) - LIGHT - CLOSER */}
      <Sequence from={850} durationInFrames={50}>
        <LogoReveal />
      </Sequence>
    </AbsoluteFill>
  );
};
