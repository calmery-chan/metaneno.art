import React, { useEffect, useRef } from "react";
import { ChekiCanvasFrameLayer } from "./CanvasFrameLayer";
import { ChekiCanvasImageLayer } from "./CanvasImageLayer";
import { ChekiCanvasLayerFrameShadow } from "./Refactor/CanvasLayerFrameShadow";
import { selectors, useSelector } from "~/domains";
import { convertSvgToDataUrl } from "~/utils/cheki";

type ChekiPreviewProps = {
  onCreatePreviewUrl: (url: string) => void;
};

export const ChekiCanvasSave: React.FC<ChekiPreviewProps> = ({
  onCreatePreviewUrl,
}) => {
  const { layout } = useSelector(selectors.cheki);
  const { displayable, frame } = layout;

  const canvasRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const { current } = canvasRef;

    if (!current) {
      return;
    }

    const { parentElement } = current;

    if (!parentElement) {
      return;
    }

    (async () => {
      const div = document.createElement("div");
      div.innerHTML = parentElement.innerHTML;

      const svg = div.querySelector("svg") as SVGSVGElement;

      svg.setAttribute("width", `${frame.viewBoxWidth}`);
      svg.setAttribute("height", `${frame.viewBoxHeight}`);
      svg.removeAttribute("x");
      svg.removeAttribute("y");

      const previewUrl = await convertSvgToDataUrl(
        div.innerHTML,
        frame.viewBoxWidth,
        frame.viewBoxHeight
      );

      onCreatePreviewUrl?.(previewUrl);
    })();
  }, [canvasRef, frame, onCreatePreviewUrl]);

  return (
    <svg
      height={frame.height}
      ref={canvasRef}
      viewBox={`0 0 ${frame.viewBoxWidth} ${frame.viewBoxHeight}`}
      width={frame.width}
      x={frame.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={frame.y - displayable.y}
    >
      <ChekiCanvasFrameLayer />
      <ChekiCanvasImageLayer />
      <ChekiCanvasLayerFrameShadow />
    </svg>
  );
};
