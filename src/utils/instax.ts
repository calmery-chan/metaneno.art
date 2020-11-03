import blueimpLoadImage from "blueimp-load-image";

const IMAGE_MAX_WIDTH = 1200;
const IMAGE_MAX_HEIGHT = 1200;

export const convertFileToImage = (file: File): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    blueimpLoadImage(
      file,
      async (canvas) => {
        if (canvas instanceof Event && canvas.type === "error") {
          return reject(canvas);
        }

        resolve(
          await convertUrlToImage(
            (canvas as HTMLCanvasElement).toDataURL("image/png")
          )
        );
      },
      { canvas: true, orientation: true }
    );
  });

export const convertImageToBlobUrl = (
  image: HTMLImageElement
): Promise<string> =>
  new Promise((resolve) => {
    const { width, height } = image;

    const canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const context = canvas.getContext("2d")!;
    context.drawImage(image, 0, 0, width, height);

    canvas.toBlob((blob) => resolve(URL.createObjectURL(blob)), "image/png");
  });

export const convertUrlToImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onerror = reject;
    image.onload = () => resolve(image);

    image.src = url;
  });

export const resizeImage = async (image: HTMLImageElement) => {
  const imageHeight = image.height;
  const imageWidth = image.width;
  const horizontalRatio = imageWidth / IMAGE_MAX_WIDTH;
  const verticalRatio = imageHeight / IMAGE_MAX_HEIGHT;

  let height = 0;
  let width = 0;

  if (horizontalRatio > verticalRatio) {
    width = IMAGE_MAX_WIDTH;
    height = imageHeight * (IMAGE_MAX_WIDTH / imageWidth);
  } else {
    width = imageWidth * (IMAGE_MAX_HEIGHT / imageHeight);
    height = IMAGE_MAX_HEIGHT;
  }

  const canvas = document.createElement("canvas");
  canvas.height = height;
  canvas.width = width;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = canvas.getContext("2d")!;
  context.drawImage(image, 0, 0, width, height);

  return await convertUrlToImage(canvas.toDataURL("image/png"));
};
