import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";

export const ChekiCanvasTrimedImage: React.FC = ({ children }) => {
  const displayable = useSelector(selectors.displayable);
  const trim = useSelector(selectors.trim);

  return (
    <svg
      height={trim.height}
      viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
      width={trim.width}
      x={trim.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={trim.y - displayable.y}
    >
      {children}
    </svg>
  );
};
