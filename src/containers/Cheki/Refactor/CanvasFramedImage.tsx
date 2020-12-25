import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";

export const ChekiCanvasFramedImage: React.FC = ({ children }) => {
  const displayableX = useSelector(selectors.displayableX);
  const displayableY = useSelector(selectors.displayableY);
  const frameHeight = useSelector(selectors.frameHeight);
  const frameWidth = useSelector(selectors.frameWidth);
  const frameViewBoxHeight = useSelector(selectors.frameViewBoxHeight);
  const frameViewBoxWidth = useSelector(selectors.frameViewBoxWidth);
  const frameX = useSelector(selectors.frameX);
  const frameY = useSelector(selectors.frameY);

  return (
    <svg
      height={frameHeight}
      viewBox={`0 0 ${frameViewBoxWidth} ${frameViewBoxHeight}`}
      width={frameWidth}
      x={frameX - displayableX}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={frameY - displayableY}
    >
      {children}
    </svg>
  );
};
