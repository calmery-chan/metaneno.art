import {
  CHEKI_HORIZONTAL_IMAGE_HEIGHT,
  CHEKI_HORIZONTAL_IMAGE_WIDTH,
  CHEKI_VERTICAL_IMAGE_HEIGHT,
  CHEKI_VERTICAL_IMAGE_WIDTH,
} from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";

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

export const getSizeByDirection = (direction: ChekiDirection) => ({
  height:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_IMAGE_HEIGHT
      : CHEKI_VERTICAL_IMAGE_HEIGHT,
  width:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_IMAGE_WIDTH
      : CHEKI_VERTICAL_IMAGE_WIDTH,
});
