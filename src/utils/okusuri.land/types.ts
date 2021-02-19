export type Disease = {
  description: string;
  id: string;
  medicines: Medicine[];
  name: string;
};

export type Department = {
  description: string;
  diseases: Disease[];
  id: string;
  icon: { url: string };
  name: string;
  url: string;
};

export type Medicine = {
  description: string;
  icon: { url: string };
  name: string;
};

// Patient

export type Patient = {
  diseases: PatientDisease[];
  record: PatientRecord;
};

export type PatientDisease = {
  departmentId: string;
  diseaseId: string;
  createdAt: string;
};

export type PatientRecord = {
  image: string;
  name: string;
  screenName: string;
};

// Prescription

export type Prescription = {
  prescription: {
    diseaseIds: string[];
  };
};
