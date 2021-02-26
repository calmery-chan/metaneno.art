import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AreaName } from "~/types/exhibition";
import * as GA from "~/utils/exhibition/google-analytics";

export type UpdateResponse = UpdatePayload & {
  metaneno: boolean;
  updatedAt: number;
};

export type UpdatePayload = {
  accessory: "fried_egg" | "pancake" | null;
  area: AreaName;
  position: { x: number; y: number; z: number };
  rotation: { y: number };
  state: "idle" | "run" | "walk";
};

//

const createSocket = (token?: string) =>
  io(
    process.env.NODE_ENV === "production"
      ? "https://multiplay.creamsoda.in"
      : "http://localhost:5000",
    {
      autoConnect: false,
      extraHeaders: token
        ? {
            authorization: `Token ${token}`,
          }
        : {},
      path: "/a/dream",
    }
  );

//

export const useMultiplay = () => {
  const [players, setPlayers] = useState<Record<
    string,
    UpdateResponse | null
  > | null>(null);
  const [lastUpdate, setLastUpdate] = useState<UpdatePayload | null>(null);
  const [socket, setSocket] = useState(createSocket());

  //

  useEffect(() => {
    const token = localStorage.getItem("_metaneno");

    if (token) {
      if (socket.connected) {
        socket.disconnect();
      }

      setSocket(createSocket(token));
    }
  }, []);

  //

  const join = useCallback(
    (payload?: string) => {
      socket.connect();
      socket.emit("join", payload);
      GA.multiplay("join");
    },
    [socket]
  );

  const leave = useCallback(() => {
    socket.emit("leave");
    socket.disconnect();
  }, [socket]);

  const update = useCallback(
    (payload: UpdatePayload) => {
      socket.emit("update", payload);
    },
    [socket]
  );

  // Helper

  const convertPlayerIdsToState = useCallback(
    (playerIds: string[]) => {
      return playerIds.reduce(
        (xs, x) => ({ ...xs, [x]: players?.[x] || null }),
        {}
      );
    },
    [players]
  );

  const handleSocketDisconnect = useCallback(() => {
    setPlayers(null);
    GA.multiplay("leave");
  }, []);

  const handleSocketJoin = useCallback(
    (playerIds: string[]) => {
      setPlayers(convertPlayerIdsToState(playerIds));

      if (lastUpdate) {
        update(lastUpdate);
      }
    },
    [convertPlayerIdsToState, lastUpdate, update]
  );

  const handleSocketLeave = useCallback(
    (playerIds?: string[]) => {
      if (!playerIds) {
        return;
      }

      setPlayers(convertPlayerIdsToState(playerIds));
    },
    [convertPlayerIdsToState]
  );

  const handleSocketUpdate = useCallback(
    ({ playerId, payload }: { playerId: string; payload: UpdateResponse }) => {
      if (!players) {
        return;
      }

      setPlayers({
        ...players,
        [playerId]: payload,
      });
    },
    [players]
  );

  // Sockets

  useEffect(() => {
    socket.on("disconnect", handleSocketDisconnect);
    socket.on("joined", handleSocketJoin);
    socket.on("leaved", handleSocketLeave);
    socket.on("updated", handleSocketUpdate);

    return () => {
      socket.off("disconnect", handleSocketDisconnect);
      socket.off("joined", handleSocketJoin);
      socket.off("leaved", handleSocketLeave);
      socket.off("updated", handleSocketUpdate);
    };
  }, [
    handleSocketDisconnect,
    handleSocketJoin,
    handleSocketLeave,
    handleSocketUpdate,
    socket,
  ]);

  // Events

  const handleLeave = useCallback(() => {
    leave();
    setPlayers(null);
  }, [leave]);

  const handleUpdate = useCallback(
    (payload: UpdatePayload) => {
      setLastUpdate(payload);

      if (!socket.connected) {
        return;
      }

      update(payload);
    },
    [socket, update]
  );

  //

  return {
    join,
    leave: handleLeave,
    players,
    update: handleUpdate,
  };
};
