/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { createSelector } from "@reduxjs/toolkit";
import { State } from "../";

export const characterDataUrl = ({ cheki }: State) => cheki.character!.dataUrl;
export const characterHeight = ({ cheki }: State) => cheki.character!.height;
export const characterReady = ({ cheki }: State) => !!cheki.character;
export const characterRotate = ({ cheki }: State) => cheki.character!.rotate;
export const characterScale = ({ cheki }: State) => cheki.character!.scale;
export const characterWidth = ({ cheki }: State) => cheki.character!.width;
export const characterX = ({ cheki }: State) => cheki.character!.x;
export const characterY = ({ cheki }: State) => cheki.character!.y;

// Displayable

const displayableHeight = ({ cheki }: State) => cheki.layout.displayable.height;
const displayableWidth = ({ cheki }: State) => cheki.layout.displayable.width;
const displayableX = ({ cheki }: State) => cheki.layout.displayable.x;
const displayableY = ({ cheki }: State) => cheki.layout.displayable.y;

export const displayable = createSelector(
  displayableHeight,
  displayableWidth,
  displayableX,
  displayableY,
  (height, width, x, y) => ({ height, width, x, y })
);

// Frame

const frameHeight = ({ cheki }: State) => cheki.layout.frame.height;
const frameWidth = ({ cheki }: State) => cheki.layout.frame.width;
const frameViewBoxHeight = ({ cheki }: State) =>
  cheki.layout.frame.viewBoxHeight;
const frameViewBoxWidth = ({ cheki }: State) => cheki.layout.frame.viewBoxWidth;
const frameX = ({ cheki }: State) => cheki.layout.frame.x;
const frameY = ({ cheki }: State) => cheki.layout.frame.y;

export const frameDataUrl = ({ cheki }: State) => cheki.frame.dataUrl;
export const frameIndex = ({ cheki }: State) => cheki.frame.index;
export const frameReady = ({ cheki }: State) => cheki.frame.ready;

export const frame = createSelector(
  frameHeight,
  frameWidth,
  frameViewBoxHeight,
  frameViewBoxWidth,
  frameX,
  frameY,
  (height, width, viewBoxHeight, viewBoxWidth, x, y) => ({
    height,
    width,
    viewBoxHeight,
    viewBoxWidth,
    x,
    y,
  })
);

// Image

const imageHeight = ({ cheki }: State) => cheki.image.height;
const imageWidth = ({ cheki }: State) => cheki.image.width;
const imageX = ({ cheki }: State) => cheki.image.x;
const imageY = ({ cheki }: State) => cheki.image.y;

export const imageDataUrl = ({ cheki }: State) => cheki.image.dataUrl;
export const imageDirection = ({ cheki }: State) => cheki.image.direction;
export const imageFilter = ({ cheki }: State) => cheki.image.filter;

export const image = createSelector(
  imageHeight,
  imageWidth,
  imageX,
  imageY,
  (height, width, x, y) => ({ height, width, x, y })
);

export const ready = ({ cheki }: State) => cheki.ready;

export const splashed = ({ cheki }: State) => cheki.splashed;

// Trim

const trimDisplayMagnification = ({ cheki }: State) =>
  cheki.layout.trim.displayMagnification;
const trimHeight = ({ cheki }: State) => cheki.layout.trim.height;
const trimWidth = ({ cheki }: State) => cheki.layout.trim.width;
const trimViewBoxHeight = ({ cheki }: State) => cheki.layout.trim.viewBoxHeight;
const trimViewBoxWidth = ({ cheki }: State) => cheki.layout.trim.viewBoxWidth;
const trimX = ({ cheki }: State) => cheki.layout.trim.x;
const trimY = ({ cheki }: State) => cheki.layout.trim.y;

export const trim = createSelector(
  trimDisplayMagnification,
  trimHeight,
  trimWidth,
  trimViewBoxHeight,
  trimViewBoxWidth,
  trimX,
  trimY,
  (displayMagnification, height, width, viewBoxHeight, viewBoxWidth, x, y) => ({
    displayMagnification,
    height,
    width,
    viewBoxHeight,
    viewBoxWidth,
    x,
    y,
  })
);
