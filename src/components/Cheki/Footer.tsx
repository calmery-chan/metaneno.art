import classnames from "classnames";
import { styled } from "linaria/react";
import React from "react";
import { ExternalLink } from "./ExternalLink";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Container = styled.div`
  margin: ${Spacing.l}px 0;

  a {
    color: ${Colors.black};
    margin-right: ${Spacing.s}px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const ChekiFooter: React.FC = () => (
  <Container
    className={classnames("flex font-bold justify-center", Typography.XS)}
  >
    <a href="https://metaneno.art/">めたねのあーと</a>
    <a href="terms-of-service">利用規約</a>
    <ExternalLink href="https://forms.gle/37ucm5pkdZV7L4HAA">
      お問い合わせ
    </ExternalLink>
  </Container>
);
