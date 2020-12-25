import { css } from "@emotion/react";
import { useCallback } from "react";
import { ChekiGradientText } from "~/components/Cheki/GradientText";
import { ChekiHorizontal } from "~/components/Cheki/Horizontal";
import { CHEKI_FRAME_IMAGE_URLS } from "~/constants/cheki";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

// Styles

const frame = css`
  cursor: pointer;

  &:not(:last-child) {
    margin-right: ${Spacing.xs}px;
  }
`;

const thumbnail = css`
  height: 96px;
  width: 96px;
`;

const label = css`
  ${Typography.XS};

  color: ${Colors.gray};
  font-weight: bold;
  margin-bottom: ${Spacing.xs}px;
  text-align: center;
  text-transform: uppercase;
`;

// Components

export const ChekiFrameList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedFrame = useSelector(selectors.frame);

  // Events

  const handleOnClickFrameImage = useCallback(
    (index: number) => dispatch(actions.changeFrame({ index })),
    []
  );

  // Render

  return (
    <ChekiHorizontal>
      {CHEKI_FRAME_IMAGE_URLS.map(({ name, url }, index) => (
        <div css={frame} key={index}>
          <div css={label}>
            {index === selectedFrame ? (
              <ChekiGradientText>{name}</ChekiGradientText>
            ) : (
              name
            )}
          </div>
          <div
            css={thumbnail}
            onClick={() => handleOnClickFrameImage(index)}
            style={{ background: `url(${url})`, backgroundSize: "cover" }}
          />
        </div>
      ))}
    </ChekiHorizontal>
  );
};
