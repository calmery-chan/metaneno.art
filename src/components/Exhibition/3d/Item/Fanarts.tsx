import { css } from "@emotion/react";
import React, { useState } from "react";
import { ExhibitionPopup } from "../../Popup";
import fanarts from "~/data/fanarts.json";
import { useScreenOrientation } from "~/hooks/exhibition/useScreenOrientation";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const image = css`
  background: ${Colors.lightGray};
  height: calc(100% - 24px - ${Spacing.m}px);
`;

const information = css`
  ${Typography.S};
  color: ${Colors.black};
  height: 24px;
  margin-top: ${Spacing.m}px;
`;

const informationIcon = css`
  border-radius: 100%;
  margin-right: ${Spacing.s}px;
`;

const informationUrl = css`
  ${Typography.XS};
  color: ${Colors.gray};
`;

const thumbnail = css`
  background: gray;
  height: 96px;
  margin-top: ${Spacing.s}px;
  width: 128px;

  &:first-child {
    margin-top: 0;
  }
`;

const thumbnails = css`
  margin-left: ${Spacing.m}px;
  width: 128px;
`;

const portraitInformation = css`
  ${Typography.S};
  color: ${Colors.black};
  height: 24px;
  margin-top: ${Spacing.m}px;
`;

const portraitInformationIcon = css`
  border-radius: 100%;
  margin-right: ${Spacing.s}px;
`;

const portraitInformationUrl = css`
  ${Typography.XS};
  color: ${Colors.gray};
`;

const portraitThumbnail = css`
  background: gray;
  height: 96px;
  margin-left: ${Spacing.s}px;
  width: 128px;
  flex-shrink: 0;

  &:first-child {
    margin-left: 0;
  }
`;

const portraitThumbnails = css`
  margin-top: ${Spacing.m}px;
  height: 96px;
`;

const portraitView = css`
  background: ${Colors.lightGray};
  height: calc(100% - 96px - 24px - ${Spacing.l * 2}px);
`;

export const Fanarts: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fanart = fanarts[currentIndex];
  const { orientation } = useScreenOrientation();

  const isPortrait = orientation === "portrait";

  if (isPortrait) {
    return (
      <ExhibitionPopup
        icon="/exhibition/fanarts/twitter.svg"
        label="#めたねのあーと"
        onClose={onClose}
      >
        <div className="flex flex-col h-full">
          <div className="relative flex-grow w-full" css={portraitView}>
            <img
              className="object-contain w-full h-full"
              src={fanart.imageUrl}
            />
          </div>
          <div className="flex" css={portraitInformation}>
            <a href={fanart.user.url} rel="noopener noreferrer" target="_blank">
              <div className="flex items-center h-full cursor-pointer">
                <img
                  className="inline h-full"
                  css={portraitInformationIcon}
                  src={fanart.user.iconUrl}
                />
                {fanart.user.name}
              </div>
            </a>
            <a
              className="ml-auto"
              href={fanart.referenceUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div
                className="flex items-center h-full cursor-pointer"
                css={portraitInformationUrl}
              >
                ツイートを見る
              </div>
            </a>
          </div>
          <div className="flex overflow-scroll" css={portraitThumbnails}>
            {fanarts.map((fanart, index) => (
              <div
                className="cursor-pointer"
                css={portraitThumbnail}
                key={fanart.imageUrl}
                onClick={() => setCurrentIndex(index)}
                style={{
                  background: `url("${fanart.imageUrl}")`,
                  backgroundSize: "cover",
                }}
              />
            ))}
          </div>
        </div>
      </ExhibitionPopup>
    );
  }

  return (
    <ExhibitionPopup
      icon="/exhibition/fanarts/twitter.svg"
      label="#めたねのあーと"
      onClose={onClose}
    >
      <div className="flex h-full">
        <div className="flex flex-col flex-grow h-full">
          <div css={image}>
            <img
              className="object-contain w-full h-full"
              src={fanart.imageUrl}
            />
          </div>
          <div className="flex" css={information}>
            <a
              href={fanart.user.url || undefined}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex items-center h-full cursor-pointer">
                <img
                  className="inline h-full"
                  css={informationIcon}
                  src={fanart.user.iconUrl}
                />
                {fanart.user.name}
              </div>
            </a>
            {fanart.referenceUrl && (
              <a
                className="ml-auto"
                href={fanart.referenceUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div
                  className="flex items-center h-full cursor-pointer"
                  css={informationUrl}
                >
                  ツイートを見る
                </div>
              </a>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 overflow-scroll" css={thumbnails}>
          {fanarts.map((fanart, index) => (
            <div
              className="cursor-pointer"
              css={thumbnail}
              key={fanart.imageUrl}
              onClick={() => setCurrentIndex(index)}
              style={{
                background: `url("${fanart.imageUrl}")`,
                backgroundSize: "cover",
              }}
            />
          ))}
        </div>
      </div>
    </ExhibitionPopup>
  );
};
