import { useRef, type FC } from "react";

import "./AppBackground.scss";
import { type CircuitOptions } from "features/circuitryBackground/hooks/useCircuitryAnimation";
import { useCircuitAnimation } from "@features/circuitryBackground/hooks/useCircuitAnimation";

interface IProps {
  options: CircuitOptions;
}

const AppBackground: FC<IProps> = ({ options }) => {
  const circuitsCanvas = useRef<HTMLCanvasElement>(null);
  useCircuitAnimation(circuitsCanvas, options);

  return (
    <>
      <canvas id="circuits" ref={circuitsCanvas} />
      <div id="vignette" />
    </>
  );
};

export default AppBackground;
