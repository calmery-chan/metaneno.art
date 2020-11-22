import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useIntersectionObserver } from "./hooks";
import illustList from "./illustList";
import { media } from "./variables";

export default function Illust() {
  return (
    <Wrapper>
      <WaveWrapper>
        <Wave1 src="/lp/illust/wave1.svg" />
        <Wave2 src="/lp/illust/wave2.svg" />
      </WaveWrapper>
      <Title src="/lp/title/illust.svg" />
      <IllustWrapper>
        <div>
          {illustList.map(
            ({ thumb, link }, i) =>
              i % 2 === 0 && (
                <Anchor href={link} target="_blank" key={i}>
                  <Thumb src={thumb} />
                </Anchor>
              )
          )}
        </div>
        <div>
          {illustList.map(
            ({ thumb, link }, i) =>
              i % 2 !== 0 && (
                <Anchor href={link} target="_blank" key={i}>
                  <Thumb src={thumb} />
                </Anchor>
              )
          )}
        </div>
      </IllustWrapper>
    </Wrapper>
  );
}

const WaveWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1290px;
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

const IllustWrapper = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(2, 1fr);
  max-width: 980px;
  padding: 0 24px;

  ${media.smallDown} {
    grid-gap: 8px;
    padding: 0 8px;
  }
`;

function Thumb({ src }: { src: string }) {
  const [targetRef, isIntersected] = useIntersectionObserver<HTMLImageElement>(
    {}
  );

  return <Image src={src} ref={targetRef} isIntersected={isIntersected} />;
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

const Anchor = styled.a`
  display: block;
  transition: opacity 0.3s ease-out;

  &:hover {
    opacity: 0.7;
  }
`;

const Image = styled.img<{ isIntersected: boolean }>`
  display: block;
  width: 100%;
  margin-bottom: 24px;
  opacity: 0;

  ${media.smallDown} {
    margin-bottom: 8px;
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}
`;

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-gap: 96px;
  justify-items: center;
  padding: 140px 0 200px;
  background-color: #e0b641;
  z-index: 1;

  ${media.smallDown} {
    grid-gap: 72px;
    padding: 80px 0 120px;
  }

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 36px;
    background: url(/lp/decoration/wave-yellow.png) center / auto 100% repeat-x;
    transform: translateY(-100%);

    ${media.smallDown} {
      height: 24px;
    }
  }
  &::before {
    top: 0;
  }
  &::after {
    bottom: 0;
    transform: translateY(100%) rotate(0.5turn);
  }
`;

const Title = styled.img`
  display: block;
  width: 420px;

  ${media.smallDown} {
    width: 280px;
  }
`;
