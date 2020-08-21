import React from "react";
import useSWR from "swr";
import { Canvas } from "~/components/Canvas";
import { Works } from "~/types/contentful";
import { withBasicAuth } from "~/utils/with-basic-auth";
import { getWorks } from "~/utils/contentful";

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

export default CanvasPage;
export const getServerSideProps = withBasicAuth();
