import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { withBasicAuth } from "~/utils/with-basic-auth";
import { WorksCollection } from "~/types/contentful";
import { NextPage } from "next";

const Work = styled.div`
  background: rgba(245, 245, 245, 1);
  margin: 24px;
  padding: 24px;
`;

const WorkTitle = styled.h1`
  margin: 0;
`;

const WorkSubTitle = styled.h2`
  margin: 0;
  margin-top: 16px;
`;

const WorkContent = styled.div`
  margin-top: 8px;
`;

const WorkThumbnail = styled.img`
  height: 300px;
  margin-right: 8px;
`;

const WorkDescription = styled.div`
  background: #fff;
  border: 1px solid rgba(200, 200, 200, 1);
  border-radius: 4px;
  padding: 16px;

  h2,
  p {
    margin: 0;
  }
`;

const path = "/api/contentful/works";
const fetcher = (): Promise<WorksCollection> =>
  fetch(path).then((r) => r.json());

const Works: NextPage = () => {
  const { data, error } = useSWR<WorksCollection>(path, fetcher);

  if (error) {
    return <div>Error</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data.data.worksCollection.items.map(
        ({ title, description, thumbnailsCollection, model }, key) => (
          <Work key={key}>
            <WorkTitle>{title}</WorkTitle>
            <WorkSubTitle>Description</WorkSubTitle>
            <WorkContent>
              <WorkDescription
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(description.json),
                }}
              />
            </WorkContent>
            <WorkSubTitle>Thumbnails</WorkSubTitle>
            <WorkContent>
              {thumbnailsCollection.items.map(({ url }, key) => (
                <WorkThumbnail src={url} key={key} />
              ))}
            </WorkContent>
            <WorkSubTitle>3D Model</WorkSubTitle>
            <WorkContent>
              <a href={model.file.url} download>
                Download ({model.file.size / (1000 * 1000)}MB)
              </a>
            </WorkContent>
            <WorkSubTitle>Position</WorkSubTitle>
            <WorkContent>
              <ul>
                <li>X: {model.positionX}</li>
                <li>Y: {model.positionY}</li>
                <li>Z: {model.positionZ}</li>
              </ul>
            </WorkContent>
            <WorkSubTitle>Rotate</WorkSubTitle>
            <WorkContent>
              <ul>
                <li>X: {model.rotateX}</li>
                <li>Y: {model.rotateY}</li>
                <li>Z: {model.rotateZ}</li>
              </ul>
            </WorkContent>
            <WorkSubTitle>Scale</WorkSubTitle>
            <WorkContent>
              <ul>
                <li>X: {model.scaleX}</li>
                <li>Y: {model.scaleY}</li>
                <li>Z: {model.scaleZ}</li>
              </ul>
            </WorkContent>
          </Work>
        )
      )}
    </>
  );
};

export default Works;
export const getServerSideProps = withBasicAuth();
