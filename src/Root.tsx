import "./index.css";
import { Composition } from "remotion";
import { PaperBasisLaunch } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PaperBasisLaunch"
        component={PaperBasisLaunch}
        durationInFrames={1200}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{}}
      />
    </>
  );
};
