import { useCallback, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
  path: "/a/dream",
});

export const useMultiplay = () => {
  const [players, setPlayers] = useState<string[] | null>(null);

  // Sockets

  socket.on("joined", setPlayers);

  socket.on("leaved", (players?: string[]) => {
    if (!players) {
      return;
    }

    setPlayers(players);
  });

  // Events

  const handleJoin = useCallback((payload: string) => {
    socket.connect();
    socket.emit("join", payload);
  }, []);

  const handleLeave = useCallback((payload: string) => {
    socket.emit("leave", payload);
    socket.disconnect();
    setPlayers(null);
  }, []);

  const handleUpdate = useCallback(
    (payload: {
      position: { x: number; z: number };
      rotation: { y: number };
    }) => {
      if (!socket.connected) {
        return;
      }

      socket.emit("update", payload);
    },
    []
  );

  //

  return {
    join: handleJoin,
    leave: handleLeave,
    players,
    update: handleUpdate,
  };
};
