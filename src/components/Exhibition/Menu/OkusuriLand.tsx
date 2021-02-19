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
  padding: ${Spacing.m}px;

  &:first-of-type {
    padding-top: 0;
  }
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
  const { busy, logIn, logOut, patient } = useOkusuriLand();

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
      {!busy && patient && (
        <div>
          <div className="flex">
            <div className="flex items-center">
              <img css={profileIcon} alt="アイコン" src={patient.image} />
              <div css={profileName}>
                {patient.name}（@{patient.screenName}）
              </div>
            </div>
            <div className="flex ml-auto">
              <a
                className="text-center"
                href={`https://okusuri.land/${
                  patient ? `~${patient.screenName}/index.htm` : ""
                }`}
                rel="noreferrer"
                target="_blank"
              >
                <div
                  className="bg-blue-400"
                  css={myPageButton}
                  onClick={logOut}
                >
                  マイページ
                </div>
              </a>
              <div className="bg-red-400" css={logOutButton} onClick={logOut}>
                ログアウトする
              </div>
            </div>
          </div>
          <div css={disease}>
            <div css={diseaseName}>クリームソーダ症候群(★)</div>
            <div className="flex" css={medicine}>
              <img css={medicineIcon} src="/exhibition/okusuri.land/icon.png" />
              <div>
                <div className="font-bold" css={medicineName}>
                  初心者マーク付きクリームソーダ　(ハメを外しても大丈夫)
                </div>
                <div css={medicineDescription}>
                  あなたはクリームソーダを飲んで幻想世界にTripしています！
                </div>
              </div>
            </div>
            <div className="flex" css={medicine}>
              <img css={medicineIcon} src="/exhibition/okusuri.land/icon.png" />
              <div>
                <div className="font-bold" css={medicineName}>
                  初心者マーク付きクリームソーダ　(ハメを外しても大丈夫)
                </div>
                <div css={medicineDescription}>
                  あなたはクリームソーダを飲んで幻想世界にTripしています！
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!busy && !patient && (
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
