import React, { useState } from "react";
import * as ReactThreeFiber from "react-three-fiber";
import { Vector3 } from "three";
import { AmbientLight } from "~/components/Canvas/AmbientLight";
import { AxesHelper } from "~/components/Canvas/AxesHelper";
import { Camera } from "~/components/Canvas/Camera";
import { GridHelper } from "~/components/Canvas/GridHelper";
import { Player } from "~/components/Canvas/Player";
import { withAdmin } from "~/utils/with-admin";
import { useWorks } from "~/utils/use-works";
import { Work } from "~/components/Canvas/Work";

const Canvas: React.FC = () => {
  const { works } = useWorks();
  const [playerPosition, setPlayerPosition] = useState<Vector3>(
    new Vector3(0, 0, 0)
  );

  if (!works) {
    return <div>Loading</div>;
  }

  return (
    <ReactThreeFiber.Canvas>
      <AxesHelper />
      <AmbientLight />
      <Camera playerPosition={playerPosition} />
      <GridHelper />
      <Player onChangePosition={setPlayerPosition} />
      {works.map((work, key) => (
        <Work key={key} {...work} />
      ))}
    </ReactThreeFiber.Canvas>
  );
};

export default withAdmin(Canvas);
