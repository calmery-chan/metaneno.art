import { css } from "@emotion/react";
import styled from "@emotion/styled";
import classnames from "classnames";
import React, { useCallback, useRef } from "react";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { convertFileToUrl } from "~/utils/cheki";

const Container = styled.div`
  background: url("/cheki/background.png");
  background-size: cover;
  background-position: top center;
  flex-grow: 1;
  height: fit-content;
  margin: 0 ${Spacing.l}px;
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

      <svg
        className="absolute"
        height="100%"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient
            id="cheki-input-image-gradient"
            x1="0"
            x2="100%"
            y1="0"
            y2="100%"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FF8CA0" />
            <stop offset="1" stopColor="#FFD74B" />
          </linearGradient>
        </defs>

        <rect
          fillOpacity="0"
          height="100%"
          stroke="url(#cheki-input-image-gradient)"
          strokeDasharray="8 4"
          strokeWidth="4"
          width="100%"
          x="0"
          y="0"
        />
      </svg>

      <div
        className={classnames(
          "absolute cursor-pointer flex h-full items-center justify-center w-full"
        )}
        onClick={handleOnClick}
      >
        <div>
          <img
            alt="タップして画像を追加する"
            className="mx-auto"
            height="48px"
            src="/cheki/add.svg"
            width="48px"
          />
          <div
            className="font-bold"
            css={css`
              ${Typography.M};
              color: #ffb474;
              margin-top: ${Spacing.xs}px;
            `}
          >
            タップして画像を読み込む
          </div>
        </div>
      </div>
    </Container>
  );
};
