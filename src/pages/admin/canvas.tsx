import React, { useState } from "react";
import * as ReactThreeFiber from "react-three-fiber";
import { Vector3 } from "three";
import { AmbientLight } from "~/components/Canvas/AmbientLight";
import { AxesHelper } from "~/components/Canvas/AxesHelper";
import { Camera } from "~/components/Canvas/Camera";
import { GridHelper } from "~/components/Canvas/GridHelper";
import { Player } from "~/components/Canvas/Player";
import { Works } from "~/components/Canvas/Works";
import { withAdmin } from "~/utils/with-admin";

const Canvas: React.FC = () => {
  const [playerPosition, setPlayerPosition] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );

  return (
    <ReactThreeFiber.Canvas>
      <AxesHelper />
      <AmbientLight />
      <Camera playerPosition={playerPosition} />
      <GridHelper />
      <Player onChangePosition={setPlayerPosition} />
      <Works />
    </ReactThreeFiber.Canvas>
  );
};

export default withAdmin(Canvas);
