import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import CreditTitle from "./Title/CreditTitle";
import { useIntersectionObserver } from "./hooks";
import supporterList from "./supporterList";
import { colors, media } from "./variables";

export default function Credit() {
  const [subTitle1Ref, isSubTitle1Intersected] = useIntersectionObserver<
    HTMLImageElement
  >({});
  const [subTitle2Ref, isSubTitle2Intersected] = useIntersectionObserver<
    HTMLImageElement
  >({});

  return (
    <Wrapper>
      <WaveWrapper>
        <Wave1 src="/lp/credit/candy1.svg" />
        <Wave2 src="/lp/credit/candy2.svg" />
      </WaveWrapper>
      <CreditTitle />
      <div>
        <SubTitle
          src="/lp/sub-title/editor.svg"
          ref={subTitle1Ref}
          isIntersected={isSubTitle1Intersected}
        />
        <EditorWrapper>
          <EditorComponent
            name="めたねのおくすり"
            iconUrl="/lp/credit/metaneno.jpg"
            link="https://twitter.com/metanen0x0"
          />
          <EditorComponent
            name="Calmery"
            iconUrl="/lp/credit/calmery.jpg"
            link="https://twitter.com/calmeryme"
          />
        </EditorWrapper>
      </div>
      <div>
        <SubTitle
          src="/lp/sub-title/supporter.svg"
          ref={subTitle2Ref}
          isIntersected={isSubTitle2Intersected}
        />
        <SupporterWrapper>
          {supporterList.map(({ name, link }, i) => (
            <SupporterComponent link={link} name={name} key={i} />
          ))}
        </SupporterWrapper>
      </div>
    </Wrapper>
  );
}

function EditorComponent({
  link,
  name,
  iconUrl,
}: {
  link: string;
  name: string;
  iconUrl: string;
}) {
  const [targetRef, isIntersected] = useIntersectionObserver<HTMLAnchorElement>(
    {}
  );

  return (
    <Editor
      ref={targetRef}
      href={link}
      target="_blank"
      isIntersected={isIntersected}
    >
      <Icon src={iconUrl} />
      <Name>{name}</Name>
    </Editor>
  );
}

function SupporterComponent({ link, name }: { link: string; name: string }) {
  const [targetRef, isIntersected] = useIntersectionObserver<HTMLAnchorElement>(
    {}
  );

  return (
    <Supporter
      ref={targetRef}
      href={link}
      target="_blank"
      isIntersected={isIntersected}
    >
      {name}
    </Supporter>
  );
}

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
  width: 278px;
`;

const Wave2 = styled.img`
  position: absolute;
  top: 178px;
  right: 0;
  width: 278px;
`;

const EditorWrapper = styled.div`
  display: grid;
  grid-gap: 48px;

  ${media.mediumUp} {
    grid-template-columns: repeat(2, auto);
  }
`;

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

const Editor = styled.a<{ isIntersected: boolean }>`
  display: grid;
  grid-gap: 12px;
  justify-items: center;
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}

  &:hover {
    text-decoration: underline;
  }
`;

const Icon = styled.img`
  display: block;
  width: 92px;
  height: 92px;
  border-radius: 50%;
`;

const Name = styled.div`
  font-size: 22px;
  color: ${colors.choco};
  text-align: center;
`;

const SupporterWrapper = styled.div`
  display: grid;
  grid-gap: 24px;
  justify-items: center;

  ${media.mediumUp} {
    grid-template-columns: repeat(3, auto);
  }
`;

const Supporter = styled.a<{ isIntersected: boolean }>`
  display: block;
  font-size: 20px;
  color: ${colors.choco};
  opacity: 0;

  &:hover {
    text-decoration: underline;
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

const SubTitle = styled.img<{ isIntersected: boolean }>`
  display: block;
  height: 58px;
  margin: 52px auto;
  opacity: 0;

  ${media.smallDown} {
    height: 40px;
    margin: 42px auto;
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${slideIn} 0.7s cubic-bezier(0, 0, 0.17, 0.99) 0s forwards;
    `}
`;
