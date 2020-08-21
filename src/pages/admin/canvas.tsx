import React from "react";
import useSWR from "swr";
import { Canvas } from "~/components/Canvas";
import { Works } from "~/types/contentful";
import { getWorks } from "~/utils/contentful";
import { withAdmin } from "~/utils/with-admin";

const CanvasPage: React.FC = () => {
  const { data, error } = useSWR<Works>("/admin/contentful/works", getWorks);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <Canvas {...data} />;
};

export default withAdmin(CanvasPage);
