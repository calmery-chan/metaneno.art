import { styled } from "linaria/react";
import React, { useCallback } from "react";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

const Container = styled.div`
  display: flex;
  height: max-content;
  justify-content: center;
  margin-top: ${Spacing.m}px;
`;

const Image = styled.img`
  ${Mixin.clickable};
  cursor: pointer;
`;

export const ChekiShootButton: React.FC = () => {
  const handleOnClick = useCallback(() => {
    console.log("Shoot");
  }, []);

  return (
    <Container>
      <Image alt="撮影する" onClick={handleOnClick} src="/shoot.svg" />
    </Container>
  );
};
