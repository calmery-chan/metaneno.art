import axios from "axios";
import htmlReactParser from "html-react-parser";
import React, { useEffect, useState } from "react";

export const ChekiQrCode: React.FC<{
  size?: number;
  url: string;
}> = React.memo(({ size, url }) => {
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get<string>(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          url
        )}&format=svg&size=512x512`
      );

      const domParser = new DOMParser();
      const document: Document = domParser.parseFromString(
        data,
        "image/svg+xml"
      );
      const g = document.querySelector<SVGPathElement>("g#elements");

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPath(g!.innerHTML);
    })();
  }, [url]);

  if (!path) {
    return null;
  }

  return (
    <svg
      height={size}
      viewBox="0 0 512 512"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      {htmlReactParser(path) as JSX.Element}
    </svg>
  );
});
