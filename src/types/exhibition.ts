export type Transform = {
  x: number;
  y: number;
  z: number;
};

export type Light = {
  color: string;
  position: Transform;
};

export type Area = {
  background: {
    color: string;
  };
  fog: {
    color: string;
  };
  lights: {
    directional: Light;
    points: Light[];
  };
  objects: {
    characters: AreaObject[];
    colliders: AreaObject[];
    decorations: AreaObject[];
    illustrations: AreaIllustrationObject[];
  };
  player: {
    defaultPosition: Transform;
    defaultRotation: Transform;
    defaultScale: Transform;
  };
  sound: {
    url: string;
  };
};

export type AreaObject = {
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
  url: string;
};

export type AreaIllustrationObject = AreaObject & {
  id: string;
  image: {
    url: string;
  };
};

export type GraphicsQuality = "high" | "low" | "middle";
