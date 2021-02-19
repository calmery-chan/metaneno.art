export type PatientDisease = {
  createdAt: string;
  departmentId: string;
  diseaseId: string;
};

export type PatientRecord = {
  id: string;
  image: string;
  name: string;
  screenName: string;
};

export type Patient = {
  diseases: PatientDisease[];
  record: PatientRecord;
};

export type Prescription = {
  diseases: string[];
};
