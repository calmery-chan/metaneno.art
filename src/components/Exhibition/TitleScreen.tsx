import { css } from "@emotion/react";
import classnames from "classnames";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { isMobile, isMobileSafari } from "react-device-detect";
import { useScreenOrientation } from "~/hooks/exhibition/useScreenOrientation";
import { fadeIn, fadeOut } from "~/styles/animations";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

// Terms

const button = css`
  color: ${Colors.white};
  height: 48px;
  margin-top: ${Spacing.m}px;

  img {
    height: 100%;
  }
`;

const container = css`
  padding: ${Spacing.l}px;
`;

const contents = css`
  max-width: 512px;
  margin: 0 ${Spacing.l}px;
`;

const terms = css`
  ${Typography.XS};
  color: ${Colors.white};
  margin-top: ${Spacing.s}px;
`;

const warning = css`
  ${Typography.XS};
  color: ${Colors.white};
  margin-top: ${Spacing.s}px;
`;

// Components

export const ExhibitionTitleScreen = dynamic(() =>
  Promise.resolve(({ onReady }: { onReady: () => void }) => {
    const { orientation } = useScreenOrientation();
    const [agreed, setAgreed] = useState(false);
    const [agreedFadeOut, setAgreedFadeOut] = useState(false);
    const [ready, setReady] = useState(false);

    // Side Effects

    useEffect(() => {
      if (ready) {
        setTimeout(() => {
          onReady();
        }, Mixin.ANIMATION_DURATION.milliseconds);
      }
    }, [onReady, ready]);

    // Events

    const handleClickAgreeToTermsButton = useCallback(() => {
      if (!agreed) {
        localStorage.setItem(
          "metaneno.art-agreed_to_terms",
          `${new Date().getTime()}`
        );
      }

      setAgreedFadeOut(true);

      setTimeout(() => {
        setAgreed(true);
      }, Mixin.ANIMATION_DURATION.milliseconds);
    }, []);

    const handleReady = useCallback(() => setReady(true), []);

    // Render

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width"
          />
        </Head>
        <div
          className={classnames(
            "bg-black grid h-full place-items-center w-full",
            {
              "h-screen w-screen":
                isMobileSafari && orientation === "landscape",
            }
          )}
          css={container}
        >
          {!agreed && (
            <div
              className="w-full"
              css={css`
                ${contents};
                ${agreedFadeOut ? fadeOut : fadeIn}
              `}
            >
              <img
                alt="ロゴ"
                src="/lp/logo.svg"
                style={isMobile ? { maxHeight: "192px" } : {}}
              />
              <div
                className="cursor-pointer"
                css={button}
                onClick={handleClickAgreeToTermsButton}
                style={
                  isMobile
                    ? { maxHeight: "36px", marginTop: `${Spacing.s}px` }
                    : {}
                }
              >
                <img
                  alt="はじめる"
                  className="mx-auto"
                  src="/lp/main-content-link/button.svg"
                />
              </div>
              <div className="text-center" css={terms}>
                <a className="underline" href="/terms" target="_blank">
                  利用規約
                </a>
                をご確認の上、{isMobile ? <br /> : ""}
                ご同意頂ける場合にのみ「Trip」ボタンを
                {isMobile ? "タップ" : "クリック"}してください
              </div>
            </div>
          )}
          {agreed && (
            <div
              className="grid w-full h-full text-center cursor-pointer place-items-center"
              onClick={handleReady}
            >
              <div
                css={css`
                  ${warning};
                  ${ready ? fadeOut : fadeIn}
                `}
              >
                ここから先、音声が再生されます。
                <br />
                音量を調整の上{isMobile ? "タップ" : "クリック"}
                してお進みください。
              </div>
            </div>
          )}
        </div>
      </>
    );
  })
);
