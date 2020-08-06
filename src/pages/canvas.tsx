import React from "react";
import useSWR from "swr";
import { Canvas } from "~/components/Canvas";
import { WorksCollection } from "~/types/contentful";
import { withBasicAuth } from "~/utils/with-basic-auth";

const fetcher = (): Promise<WorksCollection> =>
  fetch("/api/contentful/works").then((r) => r.json());

const CanvasPage: React.FC = () => {
  const { data, error } = useSWR<WorksCollection>(
    "/api/contentful/works",
    fetcher
  );

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
