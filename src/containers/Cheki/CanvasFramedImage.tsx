import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";

export const ChekiCanvasFramedImage: React.FC = ({ children }) => {
  const displayable = useSelector(selectors.displayable);
  const frame = useSelector(selectors.frame);

  return (
    <svg
      height={frame.height}
      viewBox={`0 0 ${frame.viewBoxWidth} ${frame.viewBoxHeight}`}
      width={frame.width}
      x={frame.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={frame.y - displayable.y}
    >
      {children}
    </svg>
  );
};
