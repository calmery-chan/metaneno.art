import {
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_HORIZONTAL_IMAGE_HEIGHT,
  CHEKI_HORIZONTAL_IMAGE_WIDTH,
  CHEKI_THUMBNAIL_IMAGE_SIZE,
  CHEKI_VERTICAL_FRAME_HEIGHT,
  CHEKI_VERTICAL_IMAGE_HEIGHT,
  CHEKI_VERTICAL_IMAGE_WIDTH,
} from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";
import {
  getFrameSizeByDirection,
  getImageSizeByDirection,
} from "~/utils/cheki";

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

export const createThumbnailImage = async (image: HTMLImageElement) => {
  const ratio =
    CHEKI_THUMBNAIL_IMAGE_SIZE /
    (image.height < image.width ? image.height : image.width);
  const height = image.height * ratio;
  const width = image.width * ratio;

  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = canvas.getContext("2d")!;
  context.drawImage(image, 0, 0, width, height);

  const resizedImage = await convertUrlToImage(canvas.toDataURL("image/png"));

  const canvas2 = document.createElement("canvas");
  canvas2.height = CHEKI_THUMBNAIL_IMAGE_SIZE;
  canvas2.width = CHEKI_THUMBNAIL_IMAGE_SIZE;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context2 = canvas2.getContext("2d")!;
  context2.fillStyle = "white";
  context2.fillRect(0, 0, canvas2.width, canvas2.height);
  context2.drawImage(
    resizedImage,
    0,
    0,
    CHEKI_THUMBNAIL_IMAGE_SIZE,
    CHEKI_THUMBNAIL_IMAGE_SIZE
  );

  return { url: canvas2.toDataURL("image/png") };
};

export const getDirection = (height: number, width: number): ChekiDirection => {
  if (width >= height) {
    return "horizontal";
  }

  return "vertical";
};

export const resizeFrameImage = (image: HTMLImageElement) => {
  const IMAGE_MIN_HEIGHT = CHEKI_VERTICAL_FRAME_HEIGHT;
  const IMAGE_MIN_WIDTH = CHEKI_HORIZONTAL_FRAME_WIDTH;

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

  return { url: canvas.toDataURL("image/png") };
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

  // 画像の上下左右に黒い線が入る問題を修正するため
  // 小数点以下の値を削除する
  height = Math.floor(height);
  width = Math.floor(width);

  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = canvas.getContext("2d")!;
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
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

export const updateTrim = (
  displayable: {
    height: number;
    width: number;
    x: number;
    y: number;
  },
  direction: ChekiDirection
) => {
  const nextFrameViewBox = getImageSizeByDirection(direction);
  const positionAndSize = calculateCanvasPositionAndSize(
    displayable,
    nextFrameViewBox
  );

  return {
    trim: {
      ...positionAndSize,
      displayMagnification: nextFrameViewBox.width / positionAndSize.width,
      viewBoxHeight: nextFrameViewBox.height,
      viewBoxWidth: nextFrameViewBox.width,
    },
  };
};
