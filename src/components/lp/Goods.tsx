import styled from "@emotion/styled";
import React from "react";
import GoodsItem from "./GoodsItem";
import { media } from "./variables";

export default function Goods() {
  return (
    <Wrapper>
      <WaveWrapper>
        <Wave1 src="/lp/goods/candy1.svg" />
        <Wave2 src="/lp/goods/candy2.svg" />
      </WaveWrapper>
      <Title src="/lp/title/goods.svg" />
      <GoodsWrapper>
        {Array.from(Array(6)).map((_, i) => (
          <GoodsItem
            key={i}
            link=""
            category="商品カテゴリ"
            thumb="/lp/goods/sample-thumb.jpg"
            title="商品名・商品名・商品名"
            price="¥4,290"
          />
        ))}
      </GoodsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-gap: 52px;
  justify-items: center;
  padding: 180px 0 200px;
  background-color: #faf7d9;
  background-image: repeating-linear-gradient(
    -45deg,
    rgba(0, 0, 0, 0.03) 0 25px,
    transparent 0 50px
  );

  ${media.smallDown} {
    grid-gap: 30px;
    padding: 120px 0 120px;
  }
`;

const WaveWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 1500px;
  height: 100%;
  pointer-events: none;
  transform: translateX(-50%);

  ${media.smallDown} {
    display: none;
  }
`;

const Wave1 = styled.img`
  position: absolute;
  top: 188px;
  left: 0;
  width: 558px;
`;

const Wave2 = styled.img`
  position: absolute;
  top: 218px;
  right: 0;
  width: 508px;
`;

const Title = styled.img`
  display: block;
  width: 420px;

  ${media.smallDown} {
    width: 280px;
  }
`;

const GoodsWrapper = styled.div`
  display: grid;
  grid-gap: 32px;

  ${media.mediumUp} {
    grid-template-columns: repeat(3, auto);
    padding: 0 16px;
  }

  ${media.smallDown} {
    padding: 0 24px;
  }
`;
