import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useIntersectionObserver } from "./hooks";
import { colors, media } from "./variables";

interface Props {
  name: string;
  iconUrl: string;
  comment: string;
}

export default function CreatorComment({ name, iconUrl, comment }: Props) {
  const [targetRef, isIntersected] = useIntersectionObserver<HTMLDivElement>(
    {}
  );

  return (
    <Wrapper ref={targetRef} isIntersected={isIntersected}>
      <Icon src={iconUrl} />
      <Name>{name}</Name>
      <Comment>{comment}</Comment>
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
  max-width: 580px;
  display: grid;
  grid-gap: 14px 24px;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "icon name"
    "icon comment";
  justify-items: start;
  align-items: start;
  color: ${colors.yume};
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}
`;

const Icon = styled.img`
  grid-area: icon;
  display: block;
  width: 96px;
  height: 96px;
  background-color: #fff;
  border-radius: 50%;

  ${media.smallDown} {
    width: 80px;
    height: 80px;
  }
`;

const Name = styled.div`
  grid-area: name;
  display: grid;
  align-items: center;
  padding: 0 16px;
  font-size: 16px;
  height: 24px;
  background-color: #fff;
  border-radius: 12px;

  ${media.smallDown} {
    font-size: 14px;
  }
`;

const Comment = styled.div`
  grid-area: comment;
  position: relative;
  padding: 16px;
  font-size: 20px;
  background-color: #fff;
  border-radius: 12px;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    border: solid 14px transparent;
    border-right-color: #fff;
    transform: translate(-98%, 18px);
  }

  ${media.smallDown} {
    font-size: 16px;

    &::before {
      border-width: 10px;
      transform: translate(-98%, 12px);
    }
  }
`;
