import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import ShareTitle from "./Title/ShareTitle";
import { useIntersectionObserver } from "./hooks";
import { media } from "./variables";

const fullTwitterShare = (text: string, url: string) =>
  `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

const fullFacebookShare = (url: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${url}`;

export default function Share() {
  const [iconWrapperRef, isIconWrapperIntersected] = useIntersectionObserver<
    HTMLDivElement
  >({});
  const [tagWrappertRef, isTagWrapperIntersected] = useIntersectionObserver<
    HTMLDivElement
  >({});

  return (
    <Wrapper>
      <WaveWrapper>
        <Wave1 src="/lp/share/wave1.svg" />
        <Wave2 src="/lp/share/wave2.svg" />
      </WaveWrapper>
      <ShareTitle />
      <IconWrapper ref={iconWrapperRef}>
        <Anchor
          href={fullTwitterShare(
            "めたねのおくすり個展 特設サイト%20%23めたねのあーと",
            "https://metaneno.art"
          )}
          target="_blank"
          isIntersected={isIconWrapperIntersected}
        >
          <Icon src="/lp/share/twitter.svg" />
        </Anchor>
        <Anchor
          href={fullFacebookShare("https://metaneno.art")}
          target="_blank"
          isIntersected={isIconWrapperIntersected}
        >
          <Icon src="/lp/share/facebook.svg" />
        </Anchor>
      </IconWrapper>
      <TagWrapper ref={tagWrappertRef}>
        <Label isIntersected={isTagWrapperIntersected}>ハッシュタグ</Label>
        <Tag isIntersected={isTagWrapperIntersected}>
          <a
            href="https://twitter.com/hashtag/%E3%82%81%E3%81%9F%E3%81%AD%E3%81%AE%E3%81%82%E3%83%BC%E3%81%A8"
            rel="noopener noreferrer"
            target="_blank"
          >
            #めたねのあーと
          </a>
        </Tag>
      </TagWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-gap: 58px;
  justify-items: center;
  padding: 140px 0 200px;
  background-color: #38b2ce;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 36px;
    background: url(/lp/decoration/wave-blue.png) center / auto 100% repeat-x;
    transform: translateY(-100%);
  }

  ${media.smallDown} {
    padding: 80px 0 120px;

    &::before {
      height: 24px;
    }
  }
`;

const WaveWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1180px;
  height: 100%;
  pointer-events: none;
  transform: translateX(-50%);

  ${media.smallDown} {
    display: none;
  }
`;

const Wave1 = styled.img`
  position: absolute;
  top: 158px;
  left: 0;
  width: 242px;
`;

const Wave2 = styled.img`
  position: absolute;
  top: 178px;
  right: 0;
  width: 222px;
`;

const IconWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-gap: 42px;

  ${media.smallDown} {
    grid-gap: 36px;
  }
`;

const popin = keyframes`
  from {
    opacity: 0;
  }
  50%,
  to {
    opacity: 1;
  }

  from {
    transform: translateY(18px);
  }
  50% {
    transform: translateY(-6px);
  }
  to {
    transform: translateY(0);
  }
`;

const Anchor = styled.a<{ isIntersected: boolean }>`
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${popin} 0.5s ease-out 0s forwards;

      &:last-of-type {
        animation-delay: 0.1s;
      }
    `}
`;

const Icon = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  transition: transform 0.16s ease-out;

  ${media.smallDown} {
    width: 60px;
    height: 60px;
  }

  &:hover {
    transform: scale(1.08);
  }
`;

const TagWrapper = styled.div`
  display: grid;
  grid-gap: 12px;
  justify-items: center;
  color: #fff;

  ${media.smallDown} {
    font-size: 8px;
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Label = styled.div<{ isIntersected: boolean }>`
  font-size: 20px;
  opacity: 0;

  ${media.smallDown} {
    font-size: 16px;
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}
`;

const Tag = styled.div<{ isIntersected: boolean }>`
  font-size: 36px;
  opacity: 0;

  ${media.smallDown} {
    font-size: 24px;
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}
`;
