import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Works } from "~/types/contentful";
import { application } from "~/utils/canvas";

const Axes = styled.div`
  display: flex;
  margin-bottom: 8px;
  color: #fff;

  div {
    margin-right: 8px;
  }
`;

const Direction = css`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

const Red = styled.div`
  ${Direction};

  background: red;
`;

const Green = styled.div`
  ${Direction};

  background: green;
`;

const Blue = styled.div`
  ${Direction};

  background: blue;
`;

const ModelInformation = styled.div`
  margin-bottom: 8px;
  padding: 8px;
  background: rgba(235, 235, 235, 1);
`;

export const Canvas: React.FC<Works> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [modelInformation, setModelInformation] = useState<
    {
      title: string;
      model: {
        position: {
          x: number;
          y: number;
          z: number;
        };
        rotate: {
          x: number;
          y: number;
          z: number;
        };
        scale: {
          x: number;
          y: number;
          z: number;
        };
        size: {
          x: number;
          y: number;
          z: number;
        };
      };
    }[]
  >();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useEffect(() => {
    (async () => {
      const modelInformation = await application(ref.current!, props);
      setModelInformation(modelInformation);
    })();
  }, []);

  return (
    <div>
      <Axes>
        <Red>X</Red>
        <Green>Y</Green>
        <Blue>Z</Blue>
      </Axes>
      <div>グリッドは 0.1 ずつ配置されています</div>
      <div ref={ref} />
      {modelInformation && (
        <div>
          {modelInformation.map(({ title, model }, key) => {
            return (
              <ModelInformation key={key}>
                <div>{title}</div>
                <div>
                  Position: ({model.position.x}, {model.position.y},{" "}
                  {model.position.z})
                </div>
                <div>
                  Rotate: ({model.rotate.x}, {model.rotate.y}, {model.rotate.z})
                </div>
                <div>
                  Scale: ({model.scale.x}, {model.scale.y}, {model.scale.z})
                </div>
                <div>
                  Actual Size: ({model.size.x}, {model.size.y}, {model.size.z})
                </div>
              </ModelInformation>
            );
          })}
        </div>
      )}
    </div>
  );
};
