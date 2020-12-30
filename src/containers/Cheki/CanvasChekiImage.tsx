import React, { useEffect, useRef } from "react";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
} from "~/constants/cheki";
import { ChekiCanvasImage } from "~/containers/Cheki/CanvasImage";
import { useDispatch, useSelector } from "~/domains";
import { selectors, actions } from "~/domains/cheki";

import {
  convertSvgToDataUrl,
  getFrameSizeByDirection,
  getImageSizeByDirection,
} from "~/utils/cheki";

// Components

export const Decorations: React.FC = () => {
  const decorations = useSelector(selectors.decorations);

  return (
    <>
      {decorations.map(({ layers }) =>
        layers.map(({ height, rotate, url, width, x, y }, key) => (
          <image
            key={key}
            transform={`rotate(${rotate}, ${width / 2}, ${height / 2})`}
            x={x}
            xlinkHref={url}
            y={y}
          />
        ))
      )}
    </>
  );
};

const FrameImage: React.FC = () => {
  const dispatch = useDispatch();
  const frameDataUrl = useSelector(selectors.frameDataUrl);
  const frameReady = useSelector(selectors.frameReady);
  const imageDirection = useSelector(selectors.imageDirection);
  const { height, width } = getFrameSizeByDirection(imageDirection);

  // Side Effects

  useEffect(() => {
    if (!frameReady) dispatch(actions.changeFrame({ index: 0 }));
  }, [frameReady]);

  // Render

  return (
    <>
      <mask id="cheki-bordered-frame">
        <rect height={height} width={width} fill="white" rx="8" />
      </mask>

      <image
        height={CHEKI_VERTICAL_FRAME_HEIGHT}
        mask="url(#cheki-bordered-frame)"
        width={CHEKI_HORIZONTAL_FRAME_WIDTH}
        xlinkHref={frameDataUrl}
      />
    </>
  );
};

const Image: React.FC = () => {
  const direction = useSelector(selectors.imageDirection);
  const filter = useSelector(selectors.imageFilter);
  const { height, width } = getImageSizeByDirection(direction);

  return (
    <svg
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      x={CHEKI_FRAME_MARGIN_LEFT}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={CHEKI_FRAME_MARGIN_TOP}
    >
      <ChekiCanvasImage filter={filter} />
    </svg>
  );
};

const Shadow: React.FC = () => {
  const direction = useSelector(selectors.imageDirection);
  const frame = getFrameSizeByDirection(direction);
  const image = getImageSizeByDirection(direction);

  return (
    <>
      <defs>
        <filter
          id="cheki-shadowed-image"
          x="0"
          y="0"
          height={frame.height}
          width={frame.width}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>

        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="cheki-frame-shadow-image"
          x1="0"
          x2={frame.width}
          y1="0"
          y2={frame.height}
        >
          <stop stopColor="white" stopOpacity="0.04" />
          <stop offset="0.16" stopColor="black" stopOpacity="0.04" />
          <stop offset="0.64" stopColor="white" stopOpacity="0.04" />
          <stop offset="1" stopColor="black" stopOpacity="0.04" />
        </linearGradient>

        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={frame.height + 2}
          id="cheki-frame-shadow"
          width={frame.width}
          x="0"
          y="-2"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="-2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
          />
          <feBlend in2="shape" mode="normal" />
        </filter>
      </defs>

      <rect
        fill="#fff"
        transform={`translate(${CHEKI_FRAME_MARGIN_LEFT}, ${CHEKI_FRAME_MARGIN_TOP})`}
        width={image.width}
        height={image.height}
        filter="url(#cheki-shadowed-image)"
        fillOpacity="0.1"
      />

      <g filter="url(#cheki-frame-shadow)">
        <rect
          fill="url(#cheki-frame-shadow-image)"
          height={frame.height}
          width={frame.width}
          rx="8"
        />
      </g>
    </>
  );
};

// Exports

export const ChekiCanvasChekiImage: React.FC<{
  onCreatePreviewUrl?: (dataUrl: string) => void;
}> = ({ onCreatePreviewUrl }) => {
  const displayable = useSelector(selectors.displayable);
  const frame = useSelector(selectors.frame);

  // Refs

  const ref = useRef<SVGSVGElement>(null);

  // Side Effects

  useEffect(() => {
    const e = ref.current;

    if (!e || !onCreatePreviewUrl) {
      return;
    }

    const div = document.createElement("div");

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    div.innerHTML = e.parentElement!.innerHTML;

    const svg = div.querySelector("svg") as SVGSVGElement;
    svg.setAttribute("width", `${frame.viewBoxWidth}`);
    svg.setAttribute("height", `${frame.viewBoxHeight}`);
    svg.removeAttribute("x");
    svg.removeAttribute("y");

    (async () => {
      const previewUrl = await convertSvgToDataUrl(
        div.innerHTML,
        frame.viewBoxWidth,
        frame.viewBoxHeight
      );

      onCreatePreviewUrl(previewUrl);
    })();
  }, [frame, onCreatePreviewUrl, ref]);

  // Render

  return (
    <svg
      height={frame.height}
      ref={ref}
      viewBox={`0 0 ${frame.viewBoxWidth} ${frame.viewBoxHeight}`}
      width={frame.width}
      x={frame.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={frame.y - displayable.y}
    >
      <FrameImage />
      <Image />
      <Decorations />
      <Shadow />
    </svg>
  );
};
