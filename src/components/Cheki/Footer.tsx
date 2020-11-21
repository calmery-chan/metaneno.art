import styled from "@emotion/styled";
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
  <Container className="flex font-bold justify-center" css={Typography.XS}>
    <a href="https://metaneno.art/">めたねのあーと</a>
    <a href="/cheki/terms-of-service">利用規約</a>
    <ExternalLink href="https://forms.gle/3snQ5xwAJJn86Mv69">
      お問い合わせ
    </ExternalLink>
  </Container>
);
