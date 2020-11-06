import blueimpLoadImage from "blueimp-load-image";

// Internal

const convertUrlToImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onerror = reject;
    image.onload = () => resolve(image);

    image.src = url;
  });

// Main

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
