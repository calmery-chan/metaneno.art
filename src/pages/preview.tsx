import React from "react";
import useSWR from "swr";
import { withBasicAuth } from "~/utils/with-basic-auth";
import { WorkCollection } from "~/types/contentful";

const path = "/api/contentful/works";
const fetcher = (): Promise<WorkCollection> =>
  fetch(path).then((r) => r.json());

const Preview = () => {
  const { data, error } = useSWR<WorkCollection>(path, fetcher);

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>{data.data.worksCollection.total}</div>;
};

export default Preview;
export const getServerSideProps = withBasicAuth();
