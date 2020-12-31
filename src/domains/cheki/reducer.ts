import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { Hex, ChekiDecoration, ChekiDirection, ChekiRectangle } from "./models";
import { getDirection, random, updateFrame, updateTrim } from "./utils";
import {
  ChekiFilter,
  CHEKI_DECORATION_COLORS,
  CharacterTag,
  CHEKI_FOCUS_MARGIN,
} from "~/constants/cheki";

import { getImageSizeByDirection } from "~/utils/cheki";
import * as GA from "~/utils/cheki/google-analytics";

export type State = {
  character: {
    dataUrl: string;
    height: number;
    rotate: number;
    scale: number;
    width: number;
    x: number;
    y: number;
  } | null;
  decoration: {
    hex: Hex;
    id: string | null;
  };
  decorations: ChekiDecoration[];
  characterTags: CharacterTag[];
  frame: {
    dataUrl: string;
    index: number;
    ready: boolean;
  };
  focus: {
    x: number;
    y: number;
  } | null;
  image: ChekiRectangle & {
    createdDate: string | null;
    direction: ChekiDirection;
    filter: ChekiFilter | null;
    dataUrl: string;
  };
  layout: {
    displayable: ChekiRectangle;
    frame: ChekiRectangle & {
      viewBoxHeight: number;
      viewBoxWidth: number;
    };
    trim: ChekiRectangle & {
      displayMagnification: number;
      viewBoxHeight: number;
      viewBoxWidth: number;
    };
  };
  ready: boolean;
  splashed: boolean;
  temporaries: {
    cursorOffsetX: number;
    cursorOffsetY: number;
    isImageDragging: boolean;
  };
};

const initialState: State = {
  character: null,
  decoration: {
    hex: CHEKI_DECORATION_COLORS[0],
    id: null,
  },
  decorations: [],
  characterTags: [],
  frame: {
    dataUrl: "",
    index: 0,
    ready: false,
  },
  focus: null,
  image: {
    createdDate: null,
    direction: "horizontal",
    filter: null,
    height: 0,
    dataUrl: "",
    width: 0,
    x: 0,
    y: 0,
  },
  layout: {
    displayable: {
      height: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    frame: {
      height: 0,
      viewBoxHeight: 0,
      viewBoxWidth: 0,
      width: 0,
      x: 0,
      y: 0,
    },
    trim: {
      displayMagnification: 1,
      height: 0,
      viewBoxHeight: 0,
      viewBoxWidth: 0,
      width: 0,
      x: 0,
      y: 0,
    },
  },
  ready: false,
  splashed: false,
  temporaries: {
    cursorOffsetX: 0,
    cursorOffsetY: 0,
    isImageDragging: false,
  },
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.addDecoration.fulfilled, (state, action) => {
      GA.addDecoration(action.payload.decoration.id);

      return {
        ...state,
        decorations: [...state.decorations, action.payload.decoration],
      };
    })
    .addCase(actions.addImage.fulfilled, (state, action) => {
      const { createdDate, dataUrl, height, width } = action.payload;
      const { layout } = state;

      const direction = getDirection(height, width);

      GA.addImage(direction);

      return {
        ...state,
        image: {
          ...initialState.image,
          createdDate,
          dataUrl,
          direction,
          height,
          width,
        },
        layout: {
          ...layout,
          ...updateFrame(layout.displayable, direction),
        },
        temporaries: initialState.temporaries,
      };
    })
    .addCase(actions.changeDecorationColor, (state, actions) => ({
      ...state,
      decoration: {
        ...state.decoration,
        ...actions.payload,
      },
    }))
    .addCase(actions.changeCharacterTags, (state, action) => {
      const { tag } = action.payload;

      let nextTags = [...state.characterTags, action.payload.tag].sort();

      if (state.characterTags.includes(tag)) {
        nextTags = state.characterTags.filter((t) => t !== tag).sort();
      }

      GA.changeCharacterFilter(nextTags);

      return {
        ...state,
        characterTags: nextTags,
      };
    })
    .addCase(actions.changeFilter, (state, action) => {
      GA.changeFilter(action.payload.filter || "none");

      return {
        ...state,
        image: {
          ...state.image,
          ...action.payload,
        },
      };
    })
    .addCase(actions.changeFrame.fulfilled, (state, action) => {
      return {
        ...state,
        frame: {
          ...state.frame,
          ...action.payload,
          ready: true,
        },
      };
    })
    .addCase(actions.complete, (state) => {
      if (state.temporaries.isImageDragging) {
        GA.transform();
      }

      return {
        ...state,
        temporaries: initialState.temporaries,
      };
    })
    .addCase(actions.focus, (state, action) => {
      const { trim } = state.layout;
      const [{ x, y }] = action.payload.cursorPositions;
      const cursorX = (x - trim.x) * trim.displayMagnification;
      const cursorY = (y - trim.y) * trim.displayMagnification;

      GA.focus();

      return {
        ...state,
        focus: { x: cursorX, y: cursorY },
      };
    })
    .addCase(actions.ready, (state, action) => ({
      ...state,
      ...action.payload,
    }))
    .addCase(actions.removeDecoration, (state, action) => {
      GA.removeDecoration(action.payload.decorationId);

      return {
        ...state,
        decorations: state.decorations.filter(
          (decoration) => decoration.id !== action.payload.decorationId
        ),
      };
    })
    .addCase(actions.removeImage, () => {
      GA.removeImage();

      return {
        ...initialState,
        splashed: true,
      };
    })
    .addCase(actions.resetCharacterTags, (state) => ({
      ...state,
      characterTags: [],
    }))
    .addCase(actions.splashed, (state) => ({
      ...state,
      splashed: true,
    }))
    .addCase(actions.startImageDragging, (state, action) => {
      const { cursorPositions } = action.payload;
      const { image, layout } = state;
      const { trim } = layout;

      const [{ x, y }] = cursorPositions;

      const cursorOffsetX = (x - trim.x) * trim.displayMagnification - image.x;
      const cursorOffsetY = (y - trim.y) * trim.displayMagnification - image.y;

      return {
        ...state,
        temporaries: {
          ...state.temporaries,
          cursorOffsetX,
          cursorOffsetY,
          isImageDragging: true,
        },
      };
    })
    .addCase(actions.take.fulfilled, (state, action) => {
      const { character } = action.payload;
      const { focus, image } = state;
      const { height, width } = getImageSizeByDirection(image.direction);

      let x = random(0, width - character.width);
      let y = random(0, height - character.height);

      if (focus) {
        const maxX = width - character.width;
        const maxY = height - character.height;

        let startX = focus.x - CHEKI_FOCUS_MARGIN - character.width / 2;
        let startY = focus.y - CHEKI_FOCUS_MARGIN - character.height / 2;
        let endX = focus.x + CHEKI_FOCUS_MARGIN - character.width / 2;
        let endY = focus.y + CHEKI_FOCUS_MARGIN - character.height / 2;

        startX = startX < 0 ? 0 : startX;
        startY = startY < 0 ? 0 : startY;

        // 座標の範囲、最大値が表示領域内に収まるようにする
        endX = endX > maxX ? maxX : endX;
        endY = endY > maxY ? maxY : endY;
        endX = endX < 0 ? 0 : endX;
        endY = endY < 0 ? 0 : endY;

        // 最大座標よりも開始座標の値が大きいとき、最大座標に合わせる
        startX = startX > endX ? endX : startX;
        startY = startY > endY ? endY : startY;

        x = random(startX, endX);
        y = random(startY, endY);
      }

      if (character.fixed.bottom) {
        y = height - character.height;
      } else if (character.fixed.top) {
        y = 0;
      }

      if (character.fixed.right) {
        x = width - character.width;
      } else if (character.fixed.left) {
        x = 0;
      }

      return {
        ...state,
        character: {
          dataUrl: character.url,
          height: character.height,
          rotate: random(character.rotate.min, character.rotate.max),
          scale:
            random(character.scale.min * 10, character.scale.max * 10) / 10,
          width: character.width,
          x,
          y,
        },
      };
    })
    .addCase(actions.tick, (state, action) => {
      const { cursorPositions } = action.payload;
      const { image, layout, temporaries } = state;
      const { trim } = layout;

      const [{ x, y }] = cursorPositions;

      if (temporaries.isImageDragging) {
        const cursorX = (x - trim.x) * trim.displayMagnification;
        const cursorY = (y - trim.y) * trim.displayMagnification;

        let nextX = cursorX - temporaries.cursorOffsetX;
        let nextY = cursorY - temporaries.cursorOffsetY;

        if (nextX > 0) {
          nextX = 0;
        }

        if (nextY > 0) {
          nextY = 0;
        }

        const { width, height } = getImageSizeByDirection(image.direction);

        if (width - image.width > nextX) {
          nextX = width - image.width;
        }

        if (height - image.height > nextY) {
          nextY = height - image.height;
        }

        return {
          ...state,
          image: {
            ...image,
            x: nextX,
            y: nextY,
          },
        };
      }

      return state;
    })
    .addCase(actions.unfocus, (state) => {
      GA.unfocus();

      return {
        ...state,
        focus: null,
      };
    })
    .addCase(actions.updateDisplayable, (state, action) => {
      const { payload: displayable } = action;
      const {
        image: { direction },
      } = state;

      return {
        ...state,
        layout: {
          ...state.layout,
          ...updateFrame(displayable, direction),
          ...updateTrim(displayable, direction),
          displayable,
        },
      };
    });
});
