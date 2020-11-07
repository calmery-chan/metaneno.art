import {
  CHEKI_HORIZONTAL_IMAGE_HEIGHT,
  CHEKI_HORIZONTAL_IMAGE_WIDTH,
  CHEKI_VERTICAL_IMAGE_HEIGHT,
  CHEKI_VERTICAL_IMAGE_WIDTH,
} from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";
import { getFrameSizeByDirection } from "~/utils/cheki";

const calculateCanvasPositionAndSize = (
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

export const convertUrlToImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onerror = reject;
    image.onload = () => resolve(image);

    image.src = url;
  });

export const getDirection = (height: number, width: number): ChekiDirection => {
  if (width >= height) {
    return "horizontal";
  }

  return "vertical";
};

export const resizeImage = (image: HTMLImageElement) => {
  let IMAGE_MIN_HEIGHT = CHEKI_HORIZONTAL_IMAGE_HEIGHT;
  let IMAGE_MIN_WIDTH = CHEKI_HORIZONTAL_IMAGE_WIDTH;

  if (getDirection(image.height, image.width) === "vertical") {
    IMAGE_MIN_HEIGHT = CHEKI_VERTICAL_IMAGE_HEIGHT;
    IMAGE_MIN_WIDTH = CHEKI_VERTICAL_IMAGE_WIDTH;
  }

  let height = 0;
  let width = 0;

  const horizontalRatio = image.width / IMAGE_MIN_WIDTH;
  const verticalRatio = image.height / IMAGE_MIN_HEIGHT;

  if (horizontalRatio > verticalRatio) {
    height = image.height * (IMAGE_MIN_WIDTH / image.width);
    width = IMAGE_MIN_WIDTH;

    if (height < IMAGE_MIN_HEIGHT) {
      width *= IMAGE_MIN_HEIGHT / height;
      height = IMAGE_MIN_HEIGHT;
    }
  } else {
    height = IMAGE_MIN_HEIGHT;
    width = image.width * (IMAGE_MIN_HEIGHT / image.height);

    if (width < IMAGE_MIN_WIDTH) {
      height *= IMAGE_MIN_WIDTH / width;
      width = IMAGE_MIN_WIDTH;
    }
  }

  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = canvas.getContext("2d")!;
  context.drawImage(image, 0, 0, width, height);

  return {
    height,
    url: canvas.toDataURL("image/png"),
    width,
  };
};

export const updateFrame = (
  displayable: {
    height: number;
    width: number;
    x: number;
    y: number;
  },
  direction: ChekiDirection
) => {
  const nextFrameViewBox = getFrameSizeByDirection(direction);

  return {
    frame: {
      ...calculateCanvasPositionAndSize(displayable, nextFrameViewBox),
      viewBoxHeight: nextFrameViewBox.height,
      viewBoxWidth: nextFrameViewBox.width,
    },
  };
};
