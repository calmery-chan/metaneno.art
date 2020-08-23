import React from "react";
import * as ReactThreeFiber from "react-three-fiber";
import { Floor } from "~/components/Canvas/Floor";
import { Helpers } from "~/components/Canvas/Helpers";
import { Lights } from "~/components/Canvas/Lights";
import { OtherPlayers } from "~/components/Canvas/OtherPlayers";
import { Player } from "~/components/Canvas/Player";
import { Works } from "~/components/Canvas/Works";
import { useMultiplayer } from "~/utils/canvas/use-multiplayer";
import { useWorks } from "~/utils/use-works";
import { withAdmin } from "~/utils/with-admin";

const Canvas: React.FC = () => {
  const { players, move } = useMultiplayer();
  const { works } = useWorks();

  if (!works) {
    return <div>Loading...</div>;
  }

  return (
    <ReactThreeFiber.Canvas>
      <Floor />
      <Helpers />
      <Lights />
      <OtherPlayers players={players} />
      <Player onMove={move} />
      <Works works={works} />
    </ReactThreeFiber.Canvas>
  );
};

export default withAdmin(Canvas);
