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
    works: AreaWorkObject[];
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

export type AreaWorkObject = AreaObject & {
  characters: string[];
  comment: string;
  date: string;
  id: string;
  imageUrl: string;
  title: string
};

export type GraphicsQuality = "high" | "low" | "middle";
