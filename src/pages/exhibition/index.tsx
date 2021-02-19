import { NextPage } from "next";
import { Exhibition3dWork } from "~/components/Exhibition/3d/Work";

const Exhibition: NextPage = () => (
  <Exhibition3dWork
    onClose={() => {
      console.log;
    }}
  />
);

export default Exhibition;
