export type Disease = {
  description: string;
  icon: { url: string };
  medicines: Medicine[];
  name: string;
};

export type Medicine = {
  description: string;
  icon: { url: string };
  name: string;
};

export type Patient = {
  image: string;
  name: string;
  screenName: string;
};

export type Prescription = {
  diseases: Disease[];
};
