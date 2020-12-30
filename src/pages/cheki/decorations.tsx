import { NextPage } from "next";
import React, { useState } from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiModal } from "~/components/Cheki/Modal";
import { AddableDecorationList } from "~/containers/Cheki/AddableDecorationList";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";

const Decorations: NextPage = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <ChekiApp>
        <ChekiFlexColumn>
          <ChekiHeader />
          <ChekiCanvas />
          <ChekiColumn>
            <button onClick={() => setOpen(true)}>Open</button>
          </ChekiColumn>
          <ChekiNavigation />
        </ChekiFlexColumn>
      </ChekiApp>

      <ChekiModal onClickCloseButton={() => setOpen(false)} visible={isOpen}>
        <AddableDecorationList />
      </ChekiModal>
    </>
  );
};

export default Decorations;
