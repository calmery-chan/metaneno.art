import React, { useEffect, useState } from "react";
import { ChekiFilterDefs, B5 } from "./ChekiFilterDefs";
import { convertUrlToImage } from "~/domains/cheki/utils";

const createMask = async (url: string) => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const image = await convertUrlToImage(url);
  const { height, width } = image;

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  const data = context.getImageData(0, 0, width, height);
  const pixels = data.data;

  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];

    if (!(Math.abs(red - 255) < 100)) {
      // if (!(red > 80 && (green < (red - 60) || blue < (red - 60)))) {
      // if (!(blue > 80 && (red < (blue - 60) || green < (blue - 60)))) {
      // if (!(green > 159.375 && ((red < (green - 40) && blue < (green - 20)) || (blue < (green - 40) && red < (green - 20))))) {
      pixels[i] = 0;
      pixels[i + 1] = 0;
      pixels[i + 2] = 0;
      pixels[i + 3] = 255;
    } else {
      pixels[i] = 255;
      pixels[i + 1] = 255;
      pixels[i + 2] = 255;
      pixels[i + 3] = 255;
    }
  }

  context.putImageData(data, 0, 0);

  return canvas.toDataURL("image/png");
};

export const ChekiPickColorFilterImage: React.FC<{
  height: number;
  href: string;
  width: number;
}> = ({ height, href, width }) => {
  const [mask, setMask] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setMask(await createMask(href));
    })();
  }, [href]);

  if (!mask) {
    return null;
  }

  return (
    <>
      <mask id="myMask">
        <image xlinkHref={mask} height={height} width={width} />
      </mask>
      <ChekiFilterDefs />
      <B5 href={href} width={width} height={height} />
      <image
        xlinkHref={href}
        mask="url(#myMask)"
        height={height}
        width={width}
      />
    </>
  );
};
