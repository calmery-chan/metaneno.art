import styled from "@emotion/styled";
import React from "react";
import ContentItem from "./ContentItem";
import ContentTitle from "./Title/ContentTitle";
import { media } from "./variables";

export default function Content() {
  return (
    <Wrapper>
      <WaveWrapper>
        <Wave1 src="/lp/content/wave1.svg" />
        <Wave2 src="/lp/content/wave2.svg" />
      </WaveWrapper>
      <ContentTitle />
      <ContentWrapper>
        {Array.from(Array(2)).map((_, i) => (
          <ContentItem
            key={i}
            link=""
            thumb="/lp/goods/sample-thumb.jpg"
            title="タイトルタイトル"
            description="説明文説明文説明文説明文説明文説説明文説明文説明文説明文説明文説説明文説明文説明文"
          />
        ))}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-gap: 96px;
  justify-items: center;
  padding: 140px 0 200px;
  background-color: #dd7a90;

  ${media.smallDown} {
    grid-gap: 72px;
    padding: 80px 0 120px;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 36px;
    background: url(/lp/decoration/wave-pink.png) center / auto 100% repeat-x;
    transform: translateY(-100%);

    ${media.smallDown} {
      height: 24px;
    }
  }
`;

const WaveWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1200px;
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
  top: 168px;
  right: 0;
  width: 222px;
`;

const ContentWrapper = styled.div`
  display: grid;

  ${media.mediumUp} {
    grid-gap: 32px;
    grid-template-columns: repeat(2, auto);
  }

  ${media.smallDown} {
    grid-gap: 82px;
  }
`;
