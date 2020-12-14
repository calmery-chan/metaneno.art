import { NextPage } from "next";
import React, { useState } from "react";
import { AddableDecorationList } from "~/components/Cheki/AddableDecorationList";
import { ChekiModal } from "~/components/Cheki/Modal";
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
