import {
  CHEKI_IMAGE_MAX_HEIGHT,
  CHEKI_IMAGE_MAX_WIDTH,
} from "~/constants/cheki";

export const resizeImage = (image: HTMLImageElement) => {
  const imageHeight = image.height;
  const imageWidth = image.width;
  const horizontalRatio = imageWidth / CHEKI_IMAGE_MAX_WIDTH;
  const verticalRatio = imageHeight / CHEKI_IMAGE_MAX_HEIGHT;

  let height = 0;
  let width = 0;

  if (horizontalRatio > verticalRatio) {
    width = CHEKI_IMAGE_MAX_WIDTH;
    height = imageHeight * (CHEKI_IMAGE_MAX_WIDTH / imageWidth);
  } else {
    width = imageWidth * (CHEKI_IMAGE_MAX_HEIGHT / imageHeight);
    height = CHEKI_IMAGE_MAX_HEIGHT;
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

export const convertUrlToImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onerror = reject;
    image.onload = () => resolve(image);

    image.src = url;
  });
