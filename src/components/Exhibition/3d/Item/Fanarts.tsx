import { css } from "@emotion/react";
import React, { useState } from "react";
import { ExhibitionPopup } from "../../Popup";
import fanarts from "~/data/fanarts.json";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const image = css`
  background: ${Colors.lightGray};
  height: calc(100% - 24px - ${Spacing.s}px);
`;

const information = css`
  ${Typography.S};
  color: ${Colors.black};
  height: 24px;
  margin-top: ${Spacing.s}px;
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

export const Fanarts: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fanart = fanarts[currentIndex];

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
              className="h-full object-contain w-full"
              src={fanart.imageUrl}
            />
          </div>
          <div className="flex" css={information}>
            <a href={fanart.user.url} rel="noopener noreferrer" target="_blank">
              <div className="cursor-pointer flex h-full items-center">
                <img
                  className="h-full inline"
                  css={informationIcon}
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
                className="cursor-pointer flex h-full items-center"
                css={informationUrl}
              >
                {fanart.referenceUrl}
              </div>
            </a>
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
