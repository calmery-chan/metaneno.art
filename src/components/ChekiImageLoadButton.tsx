import classnames from "classnames";
import { css } from "linaria";
import React, { useCallback, useRef } from "react";
import { convertFileToUrl } from "~/utils/cheki";
import { useI18n } from "~/utils/i18n";

const button = css`
  color: #fff;
`;

export const ChekiImageLoadButton: React.FC<{
  onLoad: (imageUrl: string) => void;
}> = ({ onLoad }) => {
  const ref = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const handleOnClick = useCallback(() => {
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
        className={classnames(
          "absolute bg-orange-500 cursor-pointer flex h-full items-center justify-center rounded-full w-full",
          button
        )}
        onClick={handleOnClick}
      >
        {t("cheki.button")}
      </div>
    </div>
  );
};
