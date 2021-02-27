import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { ExhibitionPopup } from "~/components/Exhibition/Popup";
import { useMultiplay } from "~/hooks/exhibition/useMultuplay";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const connectButton = css`
  ${Typography.S};
  border-radius: 2px;
  color: ${Colors.white};
  padding: ${Spacing.s}px 0;
  width: 100%;
`;

const connectInput = css`
  ${Mixin.animation};
  ${Typography.S};
  border: 1px solid ${Colors.gray};
  border-radius: 2px;
  padding: ${Spacing.s}px ${Spacing.s}px;
  width: 100%;

  &:disabled {
    opacity: 0.48;
  }
`;

const description = css`
  ${Typography.XS};
  color: ${Colors.black};
  margin-bottom: ${Spacing.s}px;
`;

export const Multiplay: React.FC<
  ReturnType<typeof useMultiplay> & {
    onClose: () => void;
  }
> = ({ alreadyJoinRequested, join, leave, onClose, players }) => {
  const [groupId, setGroupId] = useState("");

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setGroupId(event.currentTarget.value);
    },
    []
  );

  const handleClickJoinButton = useCallback(() => {
    if (alreadyJoinRequested) {
      return;
    }

    join(groupId ? groupId : undefined);
  }, [alreadyJoinRequested, groupId, join]);

  return (
    <ExhibitionPopup label="みんなでトリップする" onClose={onClose} small>
      <div className="flex flex-col w-full h-full">
        <div css={description}>
          友達と一緒にトリップしたいときは夢番地を入力してトリップしよう！入力せずにトリップするとランダムな夢番地に繋がるよ
        </div>
        <input
          css={connectInput}
          disabled={!!players}
          minLength={4}
          maxLength={16}
          onChange={handleChangeInput}
          placeholder="夢番地（英字のみ、4 ~ 16 文字）"
          type="text"
          value={groupId}
        />
        {!players && (
          <div
            className="mt-auto text-center bg-blue-400 cursor-pointer bold"
            css={connectButton}
            onClick={handleClickJoinButton}
          >
            トリップする
          </div>
        )}
        {!!players && (
          <div
            className="mt-auto text-center bg-red-400 cursor-pointer bold"
            css={connectButton}
            onClick={leave}
          >
            終わる（今は {Object.keys(players).length} 人がトリップ中！）
          </div>
        )}
      </div>
    </ExhibitionPopup>
  );
};
