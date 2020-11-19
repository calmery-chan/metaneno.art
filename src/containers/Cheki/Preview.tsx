import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChekiCanvasFrameLayer } from "./CanvasFrameLayer";
import { ChekiCanvasImageLayer } from "./CanvasImageLayer";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import { convertSvgToDataUrl, useDisplayable } from "~/utils/cheki";

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

type ChekiPreviewProps = {
  onCreatePreviewUrl: (url: string) => void;
};

export const ChekiPreview: React.FC<ChekiPreviewProps> = ({
  onCreatePreviewUrl,
}) => {
  const {
    layout: { displayable, frame },
  } = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  /* --- State --- */

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /* --- Refs --- */

  const handleOnUpdateDisplayable = useCallback(
    ({ height, width, x, y }) =>
      dispatch(actions.updateDisplayable({ height, width, x, y })),
    []
  );

  const containerRef = useDisplayable<HTMLDivElement>(
    handleOnUpdateDisplayable
  );

  useEffect(() => {
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
  }, [frame, onCreatePreviewUrl, svgRef]);

  return (
    <div
      css={css`
        flex-grow: 1;
        height: fit-content;
      `}
    >
      <Container ref={containerRef}>
        <Svg
          height={displayable.height}
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
        {previewUrl && (
          <img height={frame.height} src={previewUrl} width={frame.width} />
        )}
      </Container>
    </div>
  );
};
