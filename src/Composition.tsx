import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import {
  LogoReveal,
  StuckIn1993,
  ProblemStatement,
  SolutionIntro,
  FeatureCitations,
  FeatureCode,
  ProductReveal,
  Tagline,
  TransitionOverlay,
} from "./components";

/**
 * PaperBasis Launch Video - 30 seconds @ 30fps = 900 frames
 *
 * Updated Timeline with smoother flow:
 * - 0-90 (0-3s): Logo Reveal (dark)
 * - 90-200 (3-6.7s): Stuck in 1993 (dark) - NEW
 * - 200-320 (6.7-10.7s): Problem Statement (light/colorful)
 * - 320-440 (10.7-14.7s): Solution Intro (dark)
 * - 440-590 (14.7-19.7s): Feature - Citations (light)
 * - 590-740 (19.7-24.7s): Feature - Code (dark)
 * - 740-840 (24.7-28s): Product Reveal (light)
 * - 840-900 (28-30s): Tagline & CTA (dark)
 */

export const PaperBasisLaunch: React.FC = () => {
  const frame = useCurrentFrame();

  // Calculate current scene for transition effects
  const getDarkModeOpacity = () => {
    // Smooth transitions between light and dark scenes
    // Dark scenes: Logo (0-90), 1993 (90-200), Solution (320-440), Code (590-740), Tagline (840-900)
    // Light scenes: Problem (200-320), Citations (440-590), Product (740-840)

    if (frame < 90) return 1; // Logo - dark
    if (frame < 200) return 1; // 1993 - dark
    if (frame < 320) {
      // Transition to Problem (light)
      return interpolate(frame, [195, 220], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    if (frame < 440) {
      // Problem is light, transition to Solution (dark)
      return interpolate(frame, [310, 340], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    if (frame < 590) {
      // Solution is dark, transition to Citations (light)
      return interpolate(frame, [430, 460], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    if (frame < 740) {
      // Citations is light, transition to Code (dark)
      return interpolate(frame, [580, 610], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    if (frame < 840) {
      // Code is dark, transition to Product (light)
      return interpolate(frame, [730, 760], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
    }
    // Product is light, transition to Tagline (dark)
    return interpolate(frame, [830, 855], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  };

  const darkOverlay = getDarkModeOpacity();

  return (
    <AbsoluteFill>
      {/* Base background that morphs between light and dark */}
      <AbsoluteFill
        style={{
          backgroundColor: "#FFFBF5",
        }}
      />
      <AbsoluteFill
        style={{
          backgroundColor: "#0f0f0f",
          opacity: darkOverlay,
        }}
      />

      {/* Scene 1: Logo Reveal (0-3s) - Dark */}
      <Sequence durationInFrames={90}>
        <LogoReveal />
      </Sequence>

      {/* Scene 2: Stuck in 1993 (3-6.7s) - Dark */}
      <Sequence from={90} durationInFrames={110}>
        <StuckIn1993 />
      </Sequence>

      {/* Transition overlay: Dark to Light */}
      <Sequence from={195} durationInFrames={30}>
        <TransitionOverlay direction="in" color="#0f0f0f" />
      </Sequence>

      {/* Scene 3: Problem Statement (6.7-10.7s) - Light/Colorful */}
      <Sequence from={200} durationInFrames={120}>
        <ProblemStatement />
      </Sequence>

      {/* Transition overlay: Light to Dark */}
      <Sequence from={310} durationInFrames={35}>
        <TransitionOverlay direction="out" color="#0f0f0f" />
      </Sequence>

      {/* Scene 4: Solution Intro (10.7-14.7s) - Dark */}
      <Sequence from={320} durationInFrames={120}>
        <SolutionIntro />
      </Sequence>

      {/* Transition overlay: Dark to Light */}
      <Sequence from={430} durationInFrames={30}>
        <TransitionOverlay direction="in" color="#0f0f0f" />
      </Sequence>

      {/* Scene 5: Feature - Contextual Citations (14.7-19.7s) - Light */}
      <Sequence from={440} durationInFrames={150}>
        <FeatureCitations />
      </Sequence>

      {/* Transition overlay: Light to Dark */}
      <Sequence from={580} durationInFrames={30}>
        <TransitionOverlay direction="out" color="#0f0f0f" />
      </Sequence>

      {/* Scene 6: Feature - Implementation Code (19.7-24.7s) - Dark */}
      <Sequence from={590} durationInFrames={150}>
        <FeatureCode />
      </Sequence>

      {/* Transition overlay: Dark to Light */}
      <Sequence from={730} durationInFrames={30}>
        <TransitionOverlay direction="in" color="#0f0f0f" />
      </Sequence>

      {/* Scene 7: Product Reveal (24.7-28s) - Light */}
      <Sequence from={740} durationInFrames={100}>
        <ProductReveal />
      </Sequence>

      {/* Transition overlay: Light to Dark */}
      <Sequence from={830} durationInFrames={30}>
        <TransitionOverlay direction="out" color="#0f0f0f" />
      </Sequence>

      {/* Scene 8: Tagline & CTA (28-30s) - Dark */}
      <Sequence from={840} durationInFrames={60}>
        <Tagline />
      </Sequence>
    </AbsoluteFill>
  );
};
