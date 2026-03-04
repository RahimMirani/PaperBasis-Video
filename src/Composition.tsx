import { AbsoluteFill, Sequence } from "remotion";
import {
  LogoReveal,
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
 * Timeline:
 * - 0-90 (0-3s): Logo Reveal
 * - 90-210 (3-7s): Problem Statement
 * - 210-330 (7-11s): Solution Intro
 * - 330-510 (11-17s): Feature - Citations
 * - 510-690 (17-23s): Feature - Code
 * - 690-810 (23-27s): Product Reveal
 * - 810-900 (27-30s): Tagline & CTA
 */

export const PaperBasisLaunch: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#FFFBF5",
      }}
    >
      {/* Scene 1: Logo Reveal (0-3s) */}
      <Sequence durationInFrames={90}>
        <LogoReveal />
      </Sequence>

      {/* Scene 2: Problem Statement (3-7s) */}
      <Sequence from={90} durationInFrames={120}>
        <ProblemStatement />
      </Sequence>

      {/* Scene 3: Solution Intro (7-11s) */}
      <Sequence from={210} durationInFrames={120}>
        <SolutionIntro />
      </Sequence>

      {/* Scene 4: Feature - Contextual Citations (11-17s) */}
      <Sequence from={330} durationInFrames={180}>
        <FeatureCitations />
      </Sequence>

      {/* Scene 5: Feature - Implementation Code (17-23s) */}
      <Sequence from={510} durationInFrames={180}>
        <FeatureCode />
      </Sequence>

      {/* Scene 6: Product Reveal (23-27s) */}
      <Sequence from={690} durationInFrames={120}>
        <ProductReveal />
      </Sequence>

      {/* Scene 7: Tagline & CTA (27-30s) */}
      <Sequence from={810} durationInFrames={90}>
        <Tagline />
      </Sequence>
    </AbsoluteFill>
  );
};
