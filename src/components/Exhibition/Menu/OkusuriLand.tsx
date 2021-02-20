import { css } from "@emotion/react";
import React from "react";
import { ExhibitionPopup } from "~/components/Exhibition/Popup";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { useOkusuriLand } from "~/utils/okusuri.land";

const disease = css`
  border-bottom: 1px solid ${Colors.lightGray};
  padding: ${Spacing.m}px 0;

  &:first-of-type {
    padding-top: 0;
  }
`;

const diseaseDescription = css`
  ${Typography.S};
  color: ${Colors.black};
`;

const diseaseName = css`
  ${Typography.M};
  color: ${Colors.black};
`;

const loginButton = css`
  ${Mixin.clickable};
  ${Typography.M};
  background: #1da1f2;
  border-radius: 2px;
  color: #fff;
  padding: ${Spacing.s}px ${Spacing.m}px;

  img {
    height: 18px;
    margin-right: ${Spacing.xs}px;
    width: 18px;
  }
`;

const logo = css`
  height: 48px;
  margin-bottom: ${Spacing.m}px;

  img {
    height: 100%;
  }
`;

const logOutButton = css`
  ${Mixin.clickable};
  ${Typography.M};
  border-radius: 2px;
  color: #fff;
  padding: ${Spacing.s}px ${Spacing.m}px;
`;

const medicine = css`
  color: ${Colors.black};
  height: 34px;
  margin-top: ${Spacing.s}px;
`;

const medicineIcon = css`
  height: 34px;
  margin-right: ${Spacing.s}px;
  width: 34px;
`;

const medicineName = css`
  ${Typography.M};
`;

const medicineDescription = css`
  ${Typography.S};
`;

const myPageButton = css`
  ${Mixin.clickable};
  ${Typography.M};
  border-radius: 2px;
  color: #fff;
  padding: ${Spacing.s}px ${Spacing.m}px;
  margin-right: ${Spacing.s}px;
`;

const profileIcon = css`
  border-radius: 100%;
  height: 34px;
  width: 34px;
`;

const profileName = css`
  ${Typography.M};
  color: ${Colors.black};
  margin-left: ${Spacing.s}px;
`;

export const OkusuriLand: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { busy, diseases, error, logIn, logOut, record } = useOkusuriLand();

  return (
    <ExhibitionPopup
      onClose={onClose}
      label="おくすりランド"
      icon="/exhibition/okusuri.land/icon.png"
    >
      <div className="text-center" css={logo}>
        <img
          alt="ロゴ"
          className="inline"
          src="/exhibition/okusuri.land/logo.png"
        />
      </div>
      {error && (
        <div className="text-center">
          おくすりランドでエラーが発生しました！（{error.message}）
        </div>
      )}
      {!error && !busy && record && (
        <div>
          <div className="flex">
            <div className="flex items-center">
              <img css={profileIcon} alt="アイコン" src={record.image} />
              <div css={profileName}>
                {record.name}（@{record.screenName}）
              </div>
            </div>
            <div className="flex ml-auto">
              <a
                className="text-center"
                href={`https://okusuri.land/~${record.screenName}/`}
                rel="noreferrer"
                target="_blank"
              >
                <div className="bg-blue-400" css={myPageButton}>
                  マイページ
                </div>
              </a>
              <div className="bg-red-400" css={logOutButton} onClick={logOut}>
                ログアウトする
              </div>
            </div>
          </div>
          {diseases.map(({ description, id, medicines, name }) => (
            <div css={disease} key={id}>
              <div css={diseaseName}>{name}</div>
              <div css={diseaseDescription}>{description}</div>
              {medicines.map(({ description, icon, name }, index) => (
                <div className="flex" css={medicine} key={index}>
                  <img css={medicineIcon} src={icon.url} />
                  <div>
                    <div className="font-bold" css={medicineName}>
                      {name}
                    </div>
                    <div css={medicineDescription}>{description}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
      {!error && !busy && !record && (
        <div className="grid place-items-center">
          <div className="flex" css={loginButton} onClick={logIn}>
            <img src="/exhibition/okusuri.land/twitter.svg" />
            Twitterでログインする
          </div>
        </div>
      )}
    </ExhibitionPopup>
  );
};
