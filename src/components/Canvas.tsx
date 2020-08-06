import React, { useEffect, useRef } from "react";
import { WorksCollection } from "~/types/contentful";
import { application } from "~/utils/canvas";

export const Canvas: React.FC<WorksCollection> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useEffect(() => application(ref.current!, props), []);

  return <div ref={ref} />;
};
