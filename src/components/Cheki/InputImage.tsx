import classnames from "classnames";
import { styled } from "linaria/react";
import React, { useCallback, useRef } from "react";
import { convertFileToUrl } from "~/utils/cheki";

const Container = styled.div`
  flex-grow: 1;
  height: fit-content;
`;

export const ChekiInputImage: React.FC<{
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
    <Container className="relative">
      <input
        accept="image/jpg, image/png"
        className="absolute h-full opacity-0 w-full"
        onChange={handleOnChange}
        ref={ref}
        type="file"
      />

      <div
        className={classnames(
          "absolute cursor-pointer flex h-full items-center justify-center w-full"
        )}
        onClick={handleOnClick}
      >
        <div>タップして画像を追加する</div>
      </div>
    </Container>
  );
};
