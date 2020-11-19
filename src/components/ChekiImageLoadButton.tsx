import { css } from "@emotion/react";
import React, { useCallback, useRef } from "react";
import { convertFileToUrl } from "~/utils/cheki";

const button = css`
  color: #fff;
`;

export const ChekiImageLoadButton: React.FC<{
  onLoad: (imageUrl: string) => void;
}> = ({ onLoad }) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleOnClick = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ref.current!.click();
  }, []);

  const handleOnChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.currentTarget.files;

      if (!files || !files.length) {
        return;
      }

      onLoad(await convertFileToUrl(files[0]));
    },
    []
  );

  return (
    <div className="h-12 max-w-md mx-auto relative w-full">
      <input
        accept="image/jpg, image/png"
        className="absolute h-full opacity-0 w-full"
        onChange={handleOnChange}
        ref={ref}
        type="file"
      />

      <div
        className="absolute bg-orange-500 cursor-pointer flex h-full items-center justify-center rounded-full w-full"
        css={button}
        onClick={handleOnClick}
      >
        画像を読み込む
      </div>
    </div>
  );
};
