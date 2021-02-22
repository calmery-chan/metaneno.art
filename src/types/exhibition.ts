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
  areas: {
    [key in "meadow" | "sea" | "cloud"]?: {
      minimumX: number;
      minimumZ: number;
      maximumX: number;
      maximumZ: number;
    };
  };
  background: {
    color: string;
  };
  collider: AreaObject;
  fog: {
    color: string;
  };
  lights: {
    directional: Light;
    points: Light[];
  };
  objects: {
    characters: AreaCharacterObject[];
    components: { name: string; props: Record<string, any> }[];
    decorations: AreaObject[];
    items: AreaItemObject[];
    works: AreaWorkObject[];
  };
  player: {
    defaultPosition: Transform;
    defaultRotation: Transform;
    defaultScale: Transform;
    url: string;
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

export type AreaCharacterObject = AreaObject & {
  id: string;
  name: string;
  scenarios: Scenario[];
};

export type AreaItemObject = AreaObject & {
  id: string;
};

export type AreaWorkObject = AreaObject & {
  characters: string[];
  comment: string;
  date: string;
  id: string;
  imageUrl: string;
  title: string;
};

export type Fanart = {
  imageUrl: string;
  referenceUrl: string;
  user: {
    iconUrl: string;
    name: string;
    url: string;
  };
};

export type GraphicsQuality = "high" | "low" | "middle";

export type Scenario = {
  actions?: string[];
  animations?: string[][];
  branches?: {
    message: string;
    scenarios: Scenario[];
  }[];
  message: string;
  name?: string | null;
};
