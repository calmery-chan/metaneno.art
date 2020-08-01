import { Document } from "@contentful/rich-text-types";

export type ContentfulResponse<T> = {
  data: T;
};

export type ContentfulErrorResponse = {
  errors: {
    extensions: {
      contentful: {
        code: string;
        requestId: string;
      };
    };
    message: string;
  };
};

export type WorksCollection = ContentfulResponse<{
  worksCollection: {
    items: {
      title: string;
      description: {
        json: Document;
      };
      thumbnailsCollection: {
        items: {
          url: string;
          width: number;
          height: number;
        }[];
      };
      model: {
        file: {
          url: string;
          size: number;
        };
        positionX: number;
        positionY: number;
        positionZ: number;
        rotateX: number;
        rotateY: number;
        rotateZ: number;
        scaleX: number;
        scaleY: number;
        scaleZ: number;
      };
    }[];
  };
}>;
