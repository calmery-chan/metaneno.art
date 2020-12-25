import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";

export const ChekiCanvasTrimedImage: React.FC = ({ children }) => {
  const displayableX = useSelector(selectors.displayableX);
  const displayableY = useSelector(selectors.displayableY);
  const trimHeight = useSelector(selectors.trimHeight);
  const trimWidth = useSelector(selectors.trimWidth);
  const trimViewBoxHeight = useSelector(selectors.trimViewBoxHeight);
  const trimViewBoxWidth = useSelector(selectors.trimViewBoxWidth);
  const trimX = useSelector(selectors.trimX);
  const trimY = useSelector(selectors.trimY);

  return (
    <svg
      height={trimHeight}
      viewBox={`0 0 ${trimViewBoxWidth} ${trimViewBoxHeight}`}
      width={trimWidth}
      x={trimX - displayableX}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={trimY - displayableY}
    >
      {children}
    </svg>
  );
};
