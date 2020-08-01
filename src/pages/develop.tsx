import React from "react";
import { withBasicAuth } from "../helpers/with-basic-auth";

const Develop = () => <div>Hello World</div>;

export default Develop;
export const getServerSideProps = withBasicAuth();
