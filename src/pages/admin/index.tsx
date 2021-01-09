import { css } from "@emotion/react";
import moment from "moment";
import { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";

// Styles

const currentStyle = css`
  color: #3c3c3c;
  font-family: "Meiryo", sans-serif;
  font-size: 64px;
  font-weight: bold;
  line-height: 64px;
`;

const gridStyle = css`
  gap: 4px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const labelStyle = css`
  color: #3c3c3c;
  font-family: "Meiryo", sans-serif;
  font-size: 24px;
  font-weight: bold;
`;

const timeStyle = css`
  width: 128px;
`;

// Constants

const TIME_LIMIT = moment("2021-02-21");

// Main

const Time: React.FC<{ current: string; label: string }> = ({
  current,
  label,
}) => (
  <div className="w-full text-center" css={timeStyle}>
    <div css={currentStyle}>{current}</div>
    <div css={labelStyle}>{label}</div>
  </div>
);

const AdminIndex: NextPage = () => {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [milliseconds, setMilliseconds] = useState("");

  // Events

  const handleOnTick = useCallback(() => {
    const duration = moment.duration(TIME_LIMIT.diff(moment()));

    setDays(Math.floor(duration.asDays()).toString().padStart(2, "0"));
    setHours(duration.hours().toString().padStart(2, "0"));
    setMilliseconds(duration.milliseconds().toString().padStart(3, "0"));
    setMinutes(duration.minutes().toString().padStart(2, "0"));
    setSeconds(duration.seconds().toString().padStart(2, "0"));

    requestAnimationFrame(handleOnTick);
  }, []);

  // Side Effects

  useEffect(() => {
    handleOnTick();
  }, []);

  // Render

  return (
    <div className="flex h-full items-center justify-center w-full">
      <div className="grid" css={gridStyle}>
        <Time current={days} label="日" />
        <Time current={hours} label="時間" />
        <Time current={minutes} label="分" />
        <Time current={seconds} label="秒" />
        <Time current={milliseconds} label="ミリ秒" />
      </div>
    </div>
  );
};

export default AdminIndex;
