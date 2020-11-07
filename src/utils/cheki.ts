import blueimpLoadImage from "blueimp-load-image";

const isTouchRelatedEvent = (
  event: MouseRelatedEvent | TouchRelatedEvent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): event is TouchRelatedEvent => !!(event as any).touches;

export const convertFileToUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    blueimpLoadImage(
      file,
      async (canvas) => {
        if (canvas instanceof Event && canvas.type === "error") {
          return reject(canvas);
        }

        resolve((canvas as HTMLCanvasElement).toDataURL("image/png"));
      },
      { canvas: true, orientation: true }
    );
  });

export type CursorPosition = { x: number; y: number };
export type MouseRelatedEvent = MouseEvent | React.MouseEvent;
export type TouchRelatedEvent = React.TouchEvent | TouchEvent;

export const convertEventToCursorPositions = (
  event: MouseRelatedEvent | TouchRelatedEvent
): CursorPosition[] => {
  const positions = [];

  if (isTouchRelatedEvent(event)) {
    for (let i = 0; i < event.touches.length; i++) {
      positions.push({
        x: event.touches[i].clientX,
        y: event.touches[i].clientY,
      });
    }
  } else {
    positions.push({
      x: event.clientX,
      y: event.clientY,
    });
  }

  return positions;
};

export const calculateCanvasPositionAndSize = (
  displayable: { height: number; width: number; x: number; y: number },
  frameViewBox: { height: number; width: number }
) => {
  let height = frameViewBox.height * (displayable.width / frameViewBox.width);
  let width = displayable.width;
  let x = displayable.x;
  let y = displayable.y + (displayable.height - height) / 2;

  if (height > displayable.height) {
    height = displayable.height;
    width = frameViewBox.width * (displayable.height / frameViewBox.height);
    x = displayable.x + (displayable.width - width) / 2;
    y = displayable.y;
  }

  return {
    height,
    width,
    x,
    y,
  };
};
