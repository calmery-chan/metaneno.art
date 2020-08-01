import React from "react";
import { withBasicAuth } from "../helpers/with-basic-auth";

const Preview = () => <div>{process.env.NODE_ENV}</div>;

export default Preview;
export const getServerSideProps = withBasicAuth();
