import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useIntersectionObserver } from "./hooks";

interface Props {
  link: string;
  title: string;
  description: string;
  thumb: string;
}

export default function ContentItem({
  link,
  title,
  description,
  thumb,
}: Props) {
  const [targetRef, isIntersected] = useIntersectionObserver<HTMLDivElement>(
    {}
  );

  return (
    <Wrapper ref={targetRef} isIntersected={isIntersected}>
      <Thumb src={thumb} />
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Anchor href={link} target="_blank">
        <Button src="/lp/goods/button.svg" />
      </Anchor>
    </Wrapper>
  );
}

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div<{ isIntersected: boolean }>`
  display: grid;
  grid-gap: 16px;
  line-height: 1;
  color: #fff;
  max-width: 305px;
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}
`;

const Thumb = styled.img`
  display: block;
  width: 100%;
  border-radius: 40px;
`;

const Title = styled.div`
  font-size: 24px;
  margin-top: 8px;
  padding: 0 8px;
`;

const Description = styled.div`
  font-size: 18px;
  line-height: 1.72;
  white-space: pre-line;
  margin-bottom: 8px;
  padding: 0 8px;
`;

const Anchor = styled.a`
  justify-self: center;
  transition: transform 0.16s ease-out;

  &:hover {
    transform: scale(1.04);
  }
`;

const Button = styled.img`
  display: block;
  height: 50px;
  margin: 0 auto;
  padding: 0 8px;
`;
