import { css } from "linaria";
import { NextPage } from "next";
import React from "react";
import { ChekiCanvas } from "~/components/ChekiCanvas";

// Styles

const cheki = css`
  flex-grow: 1;
  height: fit-content;
`;

const column = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const footer = css`
  background: blue;
  height: 32px;
  flex-shrink: 0;
`;

const header = css`
  background: red;
  height: 16px;
  flex-shrink: 0;
`;

// Page

const Cheki: NextPage = () => {
  return (
    <div className="container h-full mx-auto">
      <div className={column}>
        <div className={header} />
        <div className={cheki}>
          <ChekiCanvas />
        </div>
        <div className={footer} />
      </div>
    </div>
  );
};

export default Cheki;
