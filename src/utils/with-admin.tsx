import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ping } from "./admin";

// eslint-disable-next-line react/display-name
export const withAdmin = (Component: NextPage) => (
  context: NextPageContext
) => {
  const [props, setProps] = useState<React.ComponentProps<typeof Component>>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (await ping()) {
        setProps((await Component.getInitialProps?.(context)) || {});
        return;
      }

      router.push("/admin/signin");
    })();
  }, []);

  if (!props) {
    return null;
  }

  return <Component {...props} />;
};
