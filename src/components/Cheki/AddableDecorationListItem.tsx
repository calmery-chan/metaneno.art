import styled from "@emotion/styled";
import React from "react";
import { Mixin } from "~/styles/mixin";

const Container = styled.div`
  ${Mixin.clickable};

  height: 96px;
  width: 96px;
`;

const Thumbnail = styled.img`
  height: 100%;
  object-fit: contain;
  user-select: none;
  width: 100%;
`;

export const AddableDecorationListItem: React.FC<{
  onClick: () => void;
  thumbnail: string;
}> = ({ onClick, thumbnail }) => (
  <Container onClick={onClick}>
    <Thumbnail src={thumbnail} alt="デコレーション素材" />
  </Container>
);
