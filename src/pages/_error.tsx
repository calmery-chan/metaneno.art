import { css } from "@emotion/react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Error: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
  const { push } = useRouter();

  const handleOnClick = useCallback(() => push("/"), []);

  return (
    <div
      className="flex font-bold h-full items-center justify-center text-center w-full"
      css={css`
        ${Typography.S};
        color: ${Colors.black};
      `}
    >
      <div>
        {statusCode === 404 && <>お探しのページは見つかりませんでした</>}
        {statusCode !== 404 && <>エラーが発生しました（${statusCode}）</>}
        <div
          className="underline"
          css={css`
            ${Mixin.clickable};
            margin-top: ${Spacing.m}px;
          `}
          onClick={handleOnClick}
        >
          トップページに戻る
        </div>
      </div>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
