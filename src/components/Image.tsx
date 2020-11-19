import React from "react";

type ImageProps = {
  src: string;
  alt?: string;
  webp?: boolean;
};

export const Image: React.FC<ImageProps> = ({ alt, src, webp }) => (
  <picture>
    {webp && <source srcSet={`${src}.webp`} type="image/webp" />}
    <img src={src} alt={alt} />
  </picture>
);
