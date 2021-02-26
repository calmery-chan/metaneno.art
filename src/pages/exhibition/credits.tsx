import { css } from "@emotion/react";
import classnames from "classnames";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { fadeIn, fadeOut } from "~/styles/animations";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import * as state from "~/utils/exhibition/state";

const Ancher: React.FC<{ href: string }> = ({ href }) => (
  <a
    className="underline"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    Link
  </a>
);

// License

const CCAttribution = () => (
  <a
    className="underline"
    href="https://creativecommons.org/licenses/by/4.0/"
    target="_blank"
    rel="noopener noreferrer"
  >
    CC Attribution
  </a>
);

const CCAttributionShareAlike = () => (
  <a
    className="underline"
    href="https://creativecommons.org/licenses/by-sa/4.0/"
    target="_blank"
    rel="noopener noreferrer"
  >
    CC Attribution-ShareAlike
  </a>
);

const Standard = () => (
  <a
    className="underline"
    href="https://sketchfab.com/licenses"
    target="_blank"
    rel="noopener noreferrer"
  >
    Standard
  </a>
);

const Unity = () => (
  <a
    className="underline"
    href="https://unity3d.com/legal/as_terms"
    target="_blank"
    rel="noopener noreferrer"
  >
    Standard Unity Asset Store EULA
  </a>
);

// Styles

const button = css`
  ${Typography.M};
  border: 1px solid ${Colors.white};
  border-radius: 2px;
  cursor: pointer;
  display: grid;
  font-family: PixelMplus, sans-serif;
  height: 40px;
  place-items: center;
  width: 256px;

  &:hover {
    background: ${Colors.white};
    color: #000;
  }
`;

const buttons = css`
  display: grid;
  grid-gap: ${Spacing.l}px;
  grid-template-columns: 1fr 1fr;
  margin: 0 auto;
  margin-top: ${Spacing.l}px;
  max-width: max-content;
`;

const container = css`
  ${Mixin.animation};
  ${Typography.M};
  font-family: PixelMplus, sans-serif;
  color: ${Colors.white};
  padding-bottom: ${Spacing.l}px;
`;

const group = css`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${Spacing.l}px;
  grid-template-columns: 4fr 5fr;
  margin: 0 auto;
  margin-top: ${Spacing.m}px;
`;

const groupTitle = css`
  font-weight: bold;
  text-align: right;
`;

const header = css`
  ${Typography.L};
  font-family: PixelMplus, sans-serif;
  padding: ${Spacing.l}px 0 ${Spacing.m}px 0;
`;

const ExhibitionCredits: NextPage = () => {
  const [clicked, setClicked] = useState<"exhibition" | "top" | null>(null);
  const { push } = useRouter();

  const handleClickTop = useCallback(() => {
    setClicked("top");

    setTimeout(() => {
      push("/");
    }, Mixin.ANIMATION_DURATION.milliseconds);
  }, []);

  const handleClickTripAgain = useCallback(() => {
    setClicked("exhibition");

    setTimeout(() => {
      state.reset();
      push("/exhibition");
    }, Mixin.ANIMATION_DURATION.milliseconds);
  }, []);

  return (
    <div
      className={classnames("w-full h-full overflow-scroll", {
        "bg-black": clicked !== "top",
        "bg-white": clicked === "top",
      })}
      css={container}
    >
      <div css={clicked ? fadeOut : fadeIn}>
        <div className="text-center" css={header}>
          <div>めたねのおくすり個展</div>
          <div>「クリームソーダの夢路を覗いて」</div>
        </div>

        <div css={group}>
          <div css={groupTitle}>企画</div>
          <div>
            <div>めたねのおくすり</div>
            <div>Calmery</div>
          </div>
        </div>

        <div css={group}>
          <div css={groupTitle}>開発</div>
          <div>
            <div>Calmery</div>
          </div>
        </div>

        <div css={group}>
          <div css={groupTitle}>イラスト・キャラクター3DCG・シナリオ</div>
          <div>
            <div>めたねのおくすり</div>
          </div>
        </div>

        <div css={group}>
          <div css={groupTitle}>LP デザイン・コーディング</div>
          <div>
            <div>yui540</div>
          </div>
        </div>

        <div css={group}>
          <div css={groupTitle}>BGM</div>
          <div>
            <div>ぱらどっと</div>
          </div>
        </div>

        <div css={group}>
          <div css={groupTitle}>活動を支援者してくださった方々</div>
          <div>
            <div>LEMLE</div>
            <div>ryuryu</div>
            <div>えだはらい</div>
            <div>ころりあな</div>
            <div>とうふ</div>
            <div>ぱらどっと</div>
            <div>るり</div>
            <div>グランツ</div>
            <div>ソラネ</div>
            <div>冷凍</div>
            <div>勇裡</div>
            <div>四月一日チノ</div>
            <div>墾田永年私財法</div>
            <div>杜基比</div>
            <div>瞑里こと</div>
            <div>菓しおり</div>
          </div>
        </div>

        <div css={group}>
          <div css={groupTitle}>3D モデル</div>
          <div>
            <div>
              AZURE Nature / Raygeas (
              <Ancher href="https://assetstore.unity.com/packages/3d/environments/fantasy/azure-nature-167725" />
              ) <Unity />
            </div>
            <div>
              Balloon-2 / beth_hanning (<Ancher href="https://skfb.ly/6W9Bz" />){" "}
              <CCAttributionShareAlike />
            </div>
            <div>
              Bank || Bench Low Poly / El (
              <Ancher href="https://skfb.ly/6XUrH" />
              ) <CCAttribution />
            </div>
            <div>
              Cake / citrusfriendd (<Ancher href="https://skfb.ly/6UXSN" />){" "}
              <CCAttribution />
            </div>
            <div>
              Cream Soda / citrusfriendd (
              <Ancher href="https://skfb.ly/6WZ7p" />) <CCAttribution />
            </div>
            <div>
              Clouds / farhad.Guli (<Ancher href="https://skfb.ly/UAww" />){" "}
              <CCAttribution />
            </div>
            <div>
              Easel / Olivercharlton11 (<Ancher href="https://skfb.ly/6RytF" />){" "}
              <CCAttribution />
            </div>
            <div>
              Egg and Sausage / Vie Dinh (
              <Ancher href="https://skfb.ly/6AU9v" />) <CCAttribution />
            </div>
            <div>
              Environment Asset Kit / Menglow (
              <Ancher href="https://assetstore.unity.com/packages/3d/environments/environment-asset-kit-149191" />
              ) <Unity />
            </div>
            <div>
              FREE Witchcraft and Wizardry Asset Pack / Ferocious Industries (
              <Ancher href="https://assetstore.unity.com/packages/3d/props/free-witchcraft-and-wizardry-asset-pack-141428" />
              ) <Unity />
            </div>
            <div>
              Grand Piano / Tr0n (<Ancher href="https://skfb.ly/6RCKx" />){" "}
              <CCAttribution />
            </div>
            <div>
              &apos;glass bottle&apos; / B.F.C (
              <Ancher href="https://skfb.ly/6UILK" />) <CCAttribution />
            </div>
            <div>
              Little Clover / tinyruin (<Ancher href="https://skfb.ly/6BWnG" />){" "}
              <CCAttribution />
            </div>
            <div>
              Mail Box 2 (Usa) / gadsby (<Ancher href="https://skfb.ly/68yqR" />
              ) <CCAttribution />
            </div>
            <div>
              Modular Ruins Pack / 3D Assets Factory / SKETCHFAB (
              <Ancher href="https://skfb.ly/6XVNq" />) <Standard />
            </div>
            <div>
              Pancakes / neutron_rus (<Ancher href="https://skfb.ly/6GvYL" />){" "}
              <CCAttribution />
            </div>
            <div>
              Pastries Pack / #L3X / SKETCHFAB (
              <Ancher href="https://skfb.ly/6RWnK" />) <Standard />
            </div>
            <div>
              Picture Frames - PBR / Tim H. / SKETCHFAB (
              <Ancher href="https://skfb.ly/6RVLX" />) <Standard />
            </div>
            <div>
              Pill / tompkijo (<Ancher href="https://skfb.ly/6X7LI" />){" "}
              <CCAttribution />
            </div>
            <div>
              Pills / kimlaughton (<Ancher href="https://skfb.ly/6WY6u" />){" "}
              <CCAttribution />
            </div>
            <div>
              Stylized Tree Stumps Asset Pack / Gebus / SKETCHFAB (
              <Ancher href="https://skfb.ly/6TWqX" />) <Standard />
            </div>
            <div>
              Swing / Matt LeMoine (<Ancher href="https://skfb.ly/6XotF" />){" "}
              <CCAttribution />
            </div>
            <div>
              Toon IMac / younesbelhit (<Ancher href="https://skfb.ly/6X6uy" />){" "}
              <CCAttribution />
            </div>
            <div>
              Toon Style - Crystal / Yutaka (
              <Ancher href="https://skfb.ly/6WOQQ" />) <CCAttribution />
            </div>
            <div>
              Traveler Candy Cart / Nemesis22 (
              <Ancher href="https://skfb.ly/6XyLK" />) <CCAttribution />
            </div>
            <div>
              Western Rocking Chair / jeltato (
              <Ancher href="https://skfb.ly/6CO7I" />) <CCAttribution />
            </div>
            <div>
              Wooden board / Gunnar Correa (
              <Ancher href="https://skfb.ly/6tSOT" />) <CCAttribution />
            </div>
          </div>
        </div>
        <div css={buttons}>
          <div css={button} onClick={handleClickTop}>
            トップに戻る
          </div>
          <div css={button} onClick={handleClickTripAgain}>
            もう一度トリップする
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionCredits;
