import React from "react";
import { Renderer } from "~/components/renderer";

const Preview: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Renderer />
    </div>
  );
};

export default Preview;
