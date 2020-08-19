import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "./axios";

export const withAdmin = (Component: NextPage) => (
  context: NextPageContext
) => {
  const [props, setProps] = useState<React.ComponentProps<typeof Component>>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await axios.get("/admin");
        setProps((await Component.getInitialProps?.(context)) || {});
      } catch (_) {
        router.push("/admin/signin");
      }
    })();
  }, []);

  if (!props) {
    return null;
  }

  return <Component {...props} />;
};
