import { styled } from "linaria/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChekiCanvasFrameLayer } from "./ChekiCanvasFrameLayer";
import { ChekiCanvasImageLayer } from "./ChekiCanvasImageLayer";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import {
  convertEventToCursorPositions,
  convertSvgToDataUrl,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";

const Container = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Svg = styled.svg`
  position: absolute;
`;

type ChekiCanvasProps = {
  preview: boolean;
  onCreatePreviewUrl?: (url: string) => void;
};

export const ChekiCanvas: React.FC<ChekiCanvasProps> = ({
  preview,
  onCreatePreviewUrl,
}) => {
  const {
    layout: { displayable, frame },
  } = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  /* --- State --- */

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  /* --- Refs --- */

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /* --- Events ---*/

  const handleOnComplete = useCallback(() => dispatch(actions.complete()), []);

  const handleOnTick = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const cursorPositions = convertEventToCursorPositions(event);
      dispatch(actions.tick({ cursorPositions }));
    },
    []
  );

  const handleOnUpdateDisplayable = useCallback(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    const { height, width, x, y } = current.getBoundingClientRect();
    dispatch(actions.updateDisplayable({ height, width, x, y }));
  }, [containerRef]);

  /* --- Side Effects --- */

  useEffect(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleOnUpdateDisplayable);

    resizeObserver.observe(current);

    return () => {
      resizeObserver.unobserve(current);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  useEffect(() => {
    if (!preview) {
      setPreviewUrl(null);
      return;
    }

    const { current } = svgRef;

    if (!current) {
      return;
    }

    (async () => {
      const div = document.createElement("div");
      div.innerHTML = current.innerHTML;

      const svg = div.querySelector("svg") as SVGSVGElement;

      // `x`, `y` を削除、Safari では `drawImage` したときに `width`、`height` に従って `image` タグの画像が描写されてしまう
      // そのためスマートフォンなどで解像度が極端に悪くなってしまう問題があった
      // `width` と `height` 自体を削除していたがそれだと Firefox で虚無が出力されてしまう...
      svg.setAttribute("width", `${frame.viewBoxWidth}`);
      svg.setAttribute("height", `${frame.viewBoxHeight}`);
      svg.removeAttribute("x");
      svg.removeAttribute("y");

      const previewUrl = await convertSvgToDataUrl(
        div.innerHTML,
        frame.viewBoxWidth,
        frame.viewBoxHeight
      );

      setPreviewUrl(previewUrl);
      onCreatePreviewUrl?.(previewUrl);
    })();
  }, [frame, onCreatePreviewUrl, preview, svgRef]);

  useEffect(() => {
    const { current } = svgRef;

    if (!current) {
      return;
    }

    current.addEventListener("touchmove", handleOnTick, { passive: false });

    return () => {
      current.removeEventListener("touchmove", handleOnTick);
    };
  }, [svgRef]);

  /* --- Render --- */

  return (
    <Container ref={containerRef}>
      {!previewUrl && (
        <Svg
          height={displayable.height}
          onMouseLeave={handleOnComplete}
          onMouseMove={handleOnTick}
          onMouseUp={handleOnComplete}
          onTouchEnd={handleOnComplete}
          // `{ passive: false }` を渡すことができないため `useEffect` 内で登録する
          // onTouchMove={handleOnTick}
          ref={svgRef}
          viewBox={`0 0 ${displayable.width} ${displayable.height}`}
          width={displayable.width}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <svg
            height={frame.height}
            viewBox={`0 0 ${frame.viewBoxWidth} ${frame.viewBoxHeight}`}
            width={frame.width}
            x={frame.x - displayable.x}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            y={frame.y - displayable.y}
          >
            <ChekiCanvasFrameLayer />
            <ChekiCanvasImageLayer />
          </svg>
        </Svg>
      )}
      {previewUrl && (
        <img height={frame.height} src={previewUrl} width={frame.width} />
      )}
    </Container>
  );
};
