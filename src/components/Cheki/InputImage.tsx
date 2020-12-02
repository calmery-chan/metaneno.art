import { css } from "@emotion/react";
import styled from "@emotion/styled";
import classnames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ExternalLink } from "./ExternalLink";
import { ChekiPopup } from "./Popup";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Container = styled.div`
  background: url("/cheki/background.png");
  background-size: cover;
  background-position: top center;
  flex-grow: 1;
  height: fit-content;
  margin: 0 ${Spacing.l}px;
`;

export const ChekiInputImage: React.FC<{
  onLoad: (file: File) => void;
}> = ({ onLoad }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [isTermsAgreed, setTermsAgreed] = useState(false);
  const [isShowTermsPopup, setShowTermsPopup] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("terms-of-service")) {
      setTermsAgreed(true);
    }
  }, []);

  const handleOnClick = useCallback(() => {
    if (!isTermsAgreed) {
      setShowTermsPopup(true);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ref.current!.click();
  }, [isTermsAgreed]);

  const handleOnChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.currentTarget.files;

      if (!files || !files.length) {
        return;
      }

      onLoad(files[0]);
    },
    []
  );

  const handleOnClickTermsAgreeButton = useCallback(() => {
    localStorage.setItem("terms-of-service", new Date().toISOString());
    setShowTermsPopup(false);
    setTermsAgreed(true);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ref.current!.click();
  }, []);

  const handleOnClickTermsCancelButton = useCallback(() => {
    setShowTermsPopup(false);
  }, []);

  return (
    <>
      <Container className="relative">
        <input
          accept="image/*"
          className="absolute h-full opacity-0 w-full"
          onChange={handleOnChange}
          onClick={handleOnClick}
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
      {isShowTermsPopup && (
        <ChekiPopup
          onEnter={handleOnClickTermsAgreeButton}
          onCancel={handleOnClickTermsCancelButton}
          enterText="同意する"
          cancalText="同意しない"
          primary="right"
        >
          <ExternalLink className="font-bold" href="/cheki/terms-of-service">
            利用規約
          </ExternalLink>{" "}
          に同意して始める！
          <br />
        </ChekiPopup>
      )}
    </>
  );
};
