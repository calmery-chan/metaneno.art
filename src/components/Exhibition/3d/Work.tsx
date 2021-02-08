import { css } from "@emotion/react";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const container = css`
  background: ${Colors.blackTransparent};
  padding: ${Spacing.l}px;
`;

const description = css`
  font-size: ${Typography.S}px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-left: ${Spacing.s / 2}px;
  width: 50%;
`;

const title = css`
  font-size: ${Typography.L}px;
  font-weight: bold;
  margin-bottom: ${Spacing.s}px;
`;

const image = css`
  width: 50%;
  padding-right: ${Spacing.s / 2}px;
`;

const thumbnail = css`
  background: black;
  height: 24px;
  margin-right: ${Spacing.s}px;
  width: 24px;
`;

const thumbnails = css`
  height: 24px;
  margin-top: ${Spacing.s}px;
`;

const work = css`
  color: ${Colors.black};
  border-radius: 2px;
  padding: ${Spacing.m}px;
`;

export const Exhibition3dWork: React.FC = () => {
  return (
    <div
      className="fixed bottom-0 h-full left-0 right-0 select-none top-0 w-full"
      css={container}
    >
      <div className="bg-white flex flex-col h-full w-full" css={work}>
        <h1 css={title}>Cube</h1>
        <div className="flex flex-grow overflow-hidden">
          <div className="flex flex-col" css={image}>
            <div className="flex-grow">Test</div>
            <div className="flex" css={thumbnails}>
              <div css={thumbnail}></div>
              <div css={thumbnail}></div>
              <div css={thumbnail}></div>
              <div css={thumbnail}></div>
            </div>
          </div>
          <div css={description}>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
            <p>laksjdlkajsdlkasldkjas</p>
          </div>
        </div>
      </div>
    </div>
  );
};
