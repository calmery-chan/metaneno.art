import React, { useEffect, useState } from "react";
import { fadeIn, fadeOut } from "~/styles/animations";
import { Mixin } from "~/styles/mixin";
import { AreaName } from "~/types/exhibition";

type AnimationType =
  | "anywhere-to-cloud"
  | "cloud-to-anywhere"
  | "meadow-to-sea"
  | "sea-to-meadow";

const getUrl = (animatioType: string, index: number) =>
  `/exhibition/3d/loading/${animatioType}/${index}.jpg`;

export const preload = () =>
  Promise.all(
    ["anywhere-to-cloud", "cloud-to-anywhere", "meadow-to-sea", "sea-to-meadow"]
      .map((type) => [getUrl(type, 0), getUrl(type, 1), getUrl(type, 2)])
      .flat()
      .map((url) => fetch(url))
  );

const detect = (previous: AreaName, next: AreaName): AnimationType => {
  if (next === "cloud") {
    return "anywhere-to-cloud";
  }

  if (previous === "cloud") {
    return "cloud-to-anywhere";
  }

  if (previous === "meadow" && next === "sea") {
    return "meadow-to-sea";
  }

  if (previous === "sea" && next === "meadow") {
    return "sea-to-meadow";
  }

  if (previous === "meadow" && next === "meadow") {
    return "sea-to-meadow";
  }

  return "meadow-to-sea";
};

const Animation = React.memo<{ animationType: string }>(({ animationType }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (frame >= 2) {
        setFrame(0);
        return;
      }

      setFrame(frame + 1);
    }, 400);
  }, [frame]);

  return (
    <img
      className="h-full object-contain w-full"
      src={getUrl(animationType, frame)}
    />
  );
});

export const Exhibition3dLoading = React.memo<{
  loading: {
    previous: AreaName;
    next: AreaName;
  } | null;
}>(({ loading }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timer, setTimer] = useState<number | null>(null);
  const [animationType, setAnimationType] = useState<AnimationType | null>(
    null
  );

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    if (loading) {
      console.log(
        loading.previous,
        loading.next,
        detect(loading.previous, loading.next)
      );
      setAnimationType(detect(loading.previous, loading.next));
      setIsVisible(true);
    } else {
      setTimer(
        window.setTimeout(() => {
          setIsVisible(false);
        }, Mixin.ANIMATION_DURATION.milliseconds)
      );
    }
  }, [loading]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="bg-white bottom-0 fixed h-full left-0 right-0 top-0 w-full"
      css={loading ? fadeIn : fadeOut}
    >
      {animationType && <Animation animationType={animationType} />}
    </div>
  );
});
