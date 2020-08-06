import React from "react";
import useSWR from "swr";
import { WorksCollection } from "~/types/contentful";
import { Canvas } from "~/components/Canvas";

const fetcher = (): Promise<WorksCollection> =>
  fetch("/api/contentful/works").then((r) => r.json());

const Contentful: React.FC = () => {
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

export default Contentful;
