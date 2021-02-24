import React, { useCallback, useState } from "react";
import { ExhibitionPopup } from "~/components/Exhibition/Popup";
import { useMultiplay } from "~/hooks/exhibition/useMultuplay";

export const Multiplay: React.FC<
  ReturnType<typeof useMultiplay> & {
    onClose: () => void;
  }
> = ({ join, leave, onClose, players }) => {
  const [groupId, setGroupId] = useState("");

  const handleChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setGroupId(event.currentTarget.value);
    },
    []
  );

  const handleClickResetInputButton = useCallback(() => {
    setGroupId("");
  }, []);

  const handleClickJoinButton = useCallback(() => {
    join(groupId ? groupId : undefined);
  }, [groupId, join]);

  const connected = !!players;

  return (
    <ExhibitionPopup label="みんなでトリップする" onClose={onClose}>
      {!connected && (
        <>
          <input
            type="text"
            onChange={handleChangeInput}
            value={groupId}
            disabled={connected}
          />
          <button onClick={handleClickResetInputButton} disabled={connected}>
            削除する
          </button>
          <button onClick={handleClickJoinButton} disabled={connected}>
            接続する
          </button>
        </>
      )}
      {connected && (
        <>
          <div>{players?.length}</div>
          <button onClick={leave}>切断する</button>
        </>
      )}
    </ExhibitionPopup>
  );
};
