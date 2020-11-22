import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useIntersectionObserver } from "./hooks";
import { colors } from "./variables";

interface Props {
  onClick?: () => void;
  link?: string;
  title: string;
  category: string;
  thumb: string;
  price: string;
}

export default function GoodsItem({
  onClick,
  link,
  title,
  category,
  thumb,
  price,
}: Props) {
  const [targetRef, isIntersected] = useIntersectionObserver<HTMLAnchorElement>(
    {}
  );

  return (
    <Wrapper
      ref={targetRef}
      isIntersected={isIntersected}
      href={link}
      target="_blank"
    >
      <Inner onClick={onClick}>
        <Thumb src={thumb} />
        <Category>{category}</Category>
        <Title>{title}</Title>
        <Price>{price}</Price>
      </Inner>
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

const Wrapper = styled.a<{ isIntersected: boolean }>`
  display: block;
  padding: 18px;
  background-color: ${colors.choco};
  border-radius: 40px;
  max-width: 342px;
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}
`;

const Inner = styled.div`
  display: grid;
  grid-gap: 12px;
  line-height: 1;
  color: #fff;
`;

const Thumb = styled.img`
  display: block;
  width: 100%;
  border-radius: 28px;
`;

const Category = styled.div`
  font-size: 12px;
  padding: 0 8px;
  margin-top: 8px;
`;

const Title = styled.div`
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 8px;
`;

const Price = styled.div`
  font-size: 24px;
  text-align: right;
  padding: 0 8px;
  margin: 8px 0;
`;
