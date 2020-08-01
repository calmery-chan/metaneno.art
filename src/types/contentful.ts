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

export type WorkCollection = ContentfulResponse<{
  worksCollection: {
    total: number;
  };
}>;
