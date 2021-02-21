import React from "react";
import { Fanarts } from "./Item/Fanarts";

export const Exhibition3dItem = React.memo<{ id: string; onClose: () => void }>(
  ({ id, onClose }) => {
    switch (id) {
      case "fanarts":
        return <Fanarts onClose={onClose} />;

      default:
        return null;
    }
  }
);
