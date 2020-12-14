import { NextPage } from "next";
import React, { useState } from "react";
import { ChekiModal } from "~/components/Cheki/Modal";
import { AddableDecorationList } from "~/containers/Cheki/AddableDecorationList";
import { ChekiApp } from "~/containers/Cheki/App";

const Decorations: NextPage = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ChekiApp>
        <button onClick={() => setOpen(true)}>Open</button>
      </ChekiApp>

      <ChekiModal onClickCloseButton={() => setOpen(false)} visible={isOpen}>
        <AddableDecorationList />
      </ChekiModal>
    </>
  );
};

export default Decorations;
