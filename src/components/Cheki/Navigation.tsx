import { styled } from "linaria/react";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

const Container = styled.div`
  box-sizing: content-box;
  display: flex;
  height: 32px;
  padding: ${Spacing.l}px;
`;

const Image = styled.img`
  ${Mixin.clickable};

  cursor: pointer;
  filter: brightness(0);
  height: 32px;
  margin-right: ${Spacing.l}px;
  opacity: 0.37;

  &:last-child {
    margin-left: auto;
    margin-right: 0;
  }

  &.active {
    filter: none;
    opacity: 1;
  }
`;

export const ChekiNavigation: React.FC<{
  active: "camera" | "filters" | "frames" | "save-and-share";
}> = ({ active }) => {
  const { push } = useRouter();

  const handleOnClickCamera = useCallback(() => push("/cheki"), []);
  const handleOnClickFilters = useCallback(() => push("/cheki/filters"), []);
  const handleOnClickFrames = useCallback(() => push("/cheki/frames"), []);
  const handleOnClickSaveAndShare = useCallback(
    () => push("/cheki/save-and-share"),
    []
  );

  return (
    <Container>
      <Image
        alt="カメラ"
        className={active === "camera" ? "active" : ""}
        onClick={handleOnClickCamera}
        src="/camera.svg"
      />
      <Image
        alt="フィルター"
        className={active === "filters" ? "active" : ""}
        onClick={handleOnClickFilters}
        src="/filters.svg"
      />
      <Image
        alt="フレーム"
        className={active === "frames" ? "active" : ""}
        onClick={handleOnClickFrames}
        src="/frames.svg"
      />
      <Image
        alt="保存・シェア"
        className={active === "save-and-share" ? "active" : ""}
        onClick={handleOnClickSaveAndShare}
        src="/save-and-share.svg"
      />
    </Container>
  );
};
