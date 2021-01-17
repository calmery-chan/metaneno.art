import { css } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { ChekiQrCode } from "~/components/Cheki/QrCode";
import {
  CHEKI_PRINTABLE_IMAGE_HEIGHT,
  CHEKI_PRINTABLE_IMAGE_WIDTH,
} from "~/constants/cheki";
import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";
import { calculateCanvasPositionAndSize } from "~/domains/cheki/utils";
import { getShareUrlById, useDisplayable } from "~/utils/cheki";

// Styles

const container = css`
  flex-grow: 1;
  height: fit-content;
`;

// Main

export const ChekiCanvasPrintableImage: React.FC<{ id: string }> = ({ id }) => {
  const dataUrl = useSelector(selectors.imageDataUrl);
  const direction = useSelector(selectors.imageDirection);
  const [displayable, setDisplayable] = useState<{
    height: number;
    width: number;
    x: number;
    y: number;
  } | null>(null);
  const [printableDisplayable, setPrintableDisplayable] = useState<{
    height: number;
    width: number;
    x: number;
    y: number;
  } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  // Side Effects

  useEffect(() => {
    setShareUrl(getShareUrlById(id));
  }, [id]);

  // Events

  const handleUpdateDisplayable = useCallback((displayable) => {
    setDisplayable(displayable);

    setPrintableDisplayable(
      calculateCanvasPositionAndSize(displayable, {
        height: CHEKI_PRINTABLE_IMAGE_HEIGHT,
        width: CHEKI_PRINTABLE_IMAGE_WIDTH,
      })
    );
  }, []);

  // Refs

  const ref = useDisplayable<HTMLDivElement>(handleUpdateDisplayable);

  // Render

  if (previewUrl) {
    return <img className="h-full object-contain w-full" src={previewUrl} />;
  }

  if (!shareUrl) {
    return null;
  }

  return (
    <div css={container} ref={ref}>
      {displayable && (
        <svg
          className="absolute"
          height={displayable.height}
          width={displayable.width}
          style={{
            left: `${displayable.x}px`,
            top: `${displayable.y}px`,
          }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          {printableDisplayable && (
            <svg
              height={printableDisplayable.height}
              viewBox={`0 0 ${CHEKI_PRINTABLE_IMAGE_WIDTH} ${CHEKI_PRINTABLE_IMAGE_HEIGHT}`}
              width={printableDisplayable.width}
              x={printableDisplayable.x}
              y={printableDisplayable.y}
            >
              <rect fill="blue" width="100%" height="100%" />
              <ChekiQrCode url={shareUrl} />
            </svg>
          )}
        </svg>
      )}
    </div>
  );
};
