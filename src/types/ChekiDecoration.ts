export type ChekiDynamicDecoration = {
  component: React.FC;
  id: string;
};

type ChekiStaticDecorationLayer = {
  height: number;
  url: string;
  width: number;
  x: number;
  y: number;
};

export type ChekiStaticDecoration = {
  horizontal: ChekiStaticDecorationLayer[];
  id: string;
  vertical: ChekiStaticDecorationLayer[];
};

export type ChekiDecoration = ChekiDynamicDecoration | ChekiStaticDecoration;
