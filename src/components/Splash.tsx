import classnames from "classnames";
import { styled } from "linaria/lib/react";
import React from "react";
import { Page } from "./Page";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Image = styled.img`
  height: 196px;
  width: 196px;
`;

const Comment = styled.div`
  bottom: ${Spacing.l}px;
  color: ${Colors.black};

  img {
    display: inline-block;
    vertical-align: middle;
  }
`;

export const Splash: React.FC = () => (
  <Page className="bottom-0 flex items-center justify-center left-0 right-0 top-0">
    <Image alt="ロゴ" src="" />
    <Comment className={classnames("absolute font-bold", Typography.XS)}>
      Made with <img src="/heart.svg" /> by めたねのおくすり
    </Comment>
  </Page>
);
