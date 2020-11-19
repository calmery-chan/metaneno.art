import * as url from "url";
import blueimpLoadImage from "blueimp-load-image";
import { DefaultSeoProps } from "next-seo";
import { useCallback, useEffect, useRef } from "react";
import { get, Response } from "./api";
import {
  CHEKI_HORIZONTAL_IMAGE_HEIGHT,
  CHEKI_VERTICAL_IMAGE_HEIGHT,
  CHEKI_HORIZONTAL_IMAGE_WIDTH,
  CHEKI_VERTICAL_IMAGE_WIDTH,
  CHEKI_HORIZONTAL_FRAME_HEIGHT,
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
  CHEKI_VERTICAL_FRAME_WIDTH,
  SHARE_RANDOM_HASHTAGS,
} from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";

export const getShareImage = (id: string) =>
  get<Response<{ image_url: string; og_image_url: string }>>(
    `/cheki/images/${id}`
  );

const convertImageToDataUrl = (
  image: HTMLImageElement,
  type: "image/jpg" | "image/png" = "image/png"
) => {
  const canvas = document.createElement("canvas");
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const context = canvas.getContext("2d")!;

  canvas.height = image.height;
  canvas.width = image.width;

  context.drawImage(image, 0, 0);

  return canvas.toDataURL(type);
};

const convertUrlToImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const i = new Image();

    i.onerror = reject;
    i.onload = () => resolve(i);

    i.src = url;
  });

const getEndpointUrl = (path: string) =>
  url.resolve(
    process.env.NODE_ENV === "production"
      ? "https://creamsoda.in/a/dream/"
      : "http://localhost:5000/",
    path.startsWith("/") ? path.slice(1) : path
  );

const isTouchRelatedEvent = (
  event: MouseRelatedEvent | TouchRelatedEvent
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): event is TouchRelatedEvent => !!(event as any).touches;

export const convertFileToUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    blueimpLoadImage(
      file,
      async (canvas) => {
        if (canvas instanceof Event && canvas.type === "error") {
          return reject(canvas);
        }

        resolve((canvas as HTMLCanvasElement).toDataURL("image/png"));
      },
      { canvas: true, orientation: true }
    );
  });

export type CursorPosition = { x: number; y: number };
export type MouseRelatedEvent = MouseEvent | React.MouseEvent;
export type TouchRelatedEvent = React.TouchEvent | TouchEvent;

export const convertEventToCursorPositions = (
  event: MouseRelatedEvent | TouchRelatedEvent
): CursorPosition[] => {
  const positions = [];

  if (isTouchRelatedEvent(event)) {
    for (let i = 0; i < event.touches.length; i++) {
      positions.push({
        x: event.touches[i].clientX,
        y: event.touches[i].clientY,
      });
    }
  } else {
    positions.push({
      x: event.clientX,
      y: event.clientY,
    });
  }

  return positions;
};

export const convertSvgToDataUrl = (
  svgText: string,
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const svg = new Blob([svgText], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svg);
    const image = new Image();

    image.onerror = (e) => reject(e);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");

      if (context === null) {
        return reject();
      }

      // Safari で `context.drawImage` するとたまに内部の image 要素が描写されないことがある
      // 800ms 程度待ってみる
      setTimeout(() => {
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/png"));
      }, 800);
    };

    image.src = url;
  });
};

export const getFrameSizeByDirection = (direction: ChekiDirection) => ({
  height:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_FRAME_HEIGHT
      : CHEKI_VERTICAL_FRAME_HEIGHT,
  width:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_FRAME_WIDTH
      : CHEKI_VERTICAL_FRAME_WIDTH,
});

export const getImageSizeByDirection = (direction: ChekiDirection) => ({
  height:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_IMAGE_HEIGHT
      : CHEKI_VERTICAL_IMAGE_HEIGHT,
  width:
    direction === "horizontal"
      ? CHEKI_HORIZONTAL_IMAGE_WIDTH
      : CHEKI_VERTICAL_IMAGE_WIDTH,
});

export const upload = async (imageUrl: string): Promise<string> => {
  const dataUrl = convertImageToDataUrl(await convertUrlToImage(imageUrl));
  const formData = new FormData();

  const splited = dataUrl.split(",");
  const bstr = atob(splited[1]);

  let i = bstr.length;
  const uInt8Array = new Uint8Array(i);

  while (i--) uInt8Array[i] = bstr.charCodeAt(i);

  formData.append(
    "image",
    new File([uInt8Array], "cheki.png", {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      type: splited[0]!.match(/:(.*?);/)![1],
    })
  );

  const response = await fetch(getEndpointUrl("/cheki/images"), {
    body: formData,
    method: "POST",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const { data } = await response.json();

  return data.id;
};

export const getShareUrlById = (id: string) =>
  `http://twitter.com/share?url=${`${window.location.origin}/cheki/share/${id}`}&related=metanen0x0&hashtags=%E3%83%8E%E3%83%8D%E3%83%A1%E3%81%A1%E3%82%83%E3%82%93%E3%83%81%E3%82%A7%E3%82%AD,${
    SHARE_RANDOM_HASHTAGS[
      Math.floor(Math.random() * SHARE_RANDOM_HASHTAGS.length)
    ]
  }`;

// Hooks

export const useDisplayable = <T extends HTMLElement>(
  onUpdate: (rect: {
    height: number;
    width: number;
    x: number;
    y: number;
  }) => void
) => {
  const ref = useRef<T>(null);

  const handleOnUpdateDisplayable = useCallback(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    const { height, width, x, y } = current.getBoundingClientRect();

    onUpdate({ height, width, x, y });
  }, [onUpdate]);

  useEffect(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleOnUpdateDisplayable);

    resizeObserver.observe(current);
    handleOnUpdateDisplayable();

    return () => {
      resizeObserver.unobserve(current);
      resizeObserver.disconnect();
    };
  }, [ref]);

  return ref;
};

export const defaultSeoProps: DefaultSeoProps = {
  canonical: "https://metaneno.art/cheki",
  description: "ノネメちゃんと一緒に写真を撮ろう！",
  nofollow: true, // Top ページ以外は基本 nofollow にする
  noindex: true, // Top ページ以外は基本 noindex にする
  title: "ノネメちゃんチェキ | めたねのあーと",

  // Twitter
  twitter: {
    cardType: "summary_large_image",
    // @username for the content creator / author (outputs as `twitter:creator`)
    handle: "@metanen0x0",
    // @username for the website used in the card footer
    site: "@metanen0x0",
  },

  // OGP
  openGraph: {
    description: "ノネメちゃんと一緒に写真を撮ろう！",
    images: [
      {
        height: 630,
        url: "https://metaneno.art/cheki/og.png",
        width: 1200,
      },
    ],
    locale: "ja_JP",
    site_name: "ノネメチェキ",
    title: "ノネメちゃんチェキ | めたねのあーと",
    type: "website",
    url: "https://metaneno.art/cheki",
  },
};
