import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { ChekiGradientText } from "../../components/Cheki/GradientText";
import { ChekiHorizontal } from "../../components/Cheki/Horizontal";
import { CHEKI_FRAME_IMAGE_URLS } from "~/constants/cheki";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Frame = styled.div`
  cursor: pointer;
  margin-right: ${Spacing.xs}px;

  &:last-child {
    margin-right: 0;
  }
`;

const FrameImage = styled.div`
  height: 96px;
  width: 96px;
`;

const FrameTitle = styled.div`
  color: ${Colors.gray};
  font-weight: bold;
  margin-bottom: ${Spacing.xs}px;
  text-align: center;
  text-transform: uppercase;
`;

export const ChekiFrameList: React.FC = () => {
  const dispatch = useDispatch();
  const { frame } = useSelector(selectors.cheki);

  const handleOnClickFrameImage = useCallback(
    (index: number) => dispatch(actions.changeFrame({ index })),
    []
  );

  return (
    <ChekiHorizontal>
      {CHEKI_FRAME_IMAGE_URLS.map(({ name, url }, index) => (
        <Frame key={index}>
          <FrameTitle css={Typography.XS}>
            {index === frame.index ? (
              <ChekiGradientText>{name}</ChekiGradientText>
            ) : (
              name
            )}
          </FrameTitle>
          <FrameImage
            onClick={() => handleOnClickFrameImage(index)}
            style={{ background: `url(${url})`, backgroundSize: "cover" }}
          />
        </Frame>
      ))}
    </ChekiHorizontal>
  );
};
