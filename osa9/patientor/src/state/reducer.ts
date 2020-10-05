import { State } from "./state";
import { Patient, Diagnosis, HealthCheckEntry, HospitalEntry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_HEALTCHECKENTRY";
    payload: {
      id: string;
      entry: HealthCheckEntry;
    };
  }
  | {
    type: "ADD_HOSPITALENTRY";
    payload: {
      id: string;
      entry: HospitalEntry;
    };
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_HEALTCHECKENTRY":
      const patient = state.patients[action.payload.id];
      patient.entries = [...patient.entries, action.payload.entry];
      return {
        ...state,
      };
    case "ADD_HOSPITALENTRY":
      const patient2 = state.patients[action.payload.id];
      patient2.entries = [...patient2.entries, action.payload.entry];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const setDiagnosisList = (diagnosis: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnosis,
  };
};

export const addHealthCheckEntry = (id: string, entry: HealthCheckEntry): Action => {
  return {
    type: "ADD_HEALTCHECKENTRY",
    payload: { id: id, entry },
  };
};

export const addHospitalEntry = (id: string, entry: HospitalEntry): Action => {
  return {
    type: "ADD_HOSPITALENTRY",
    payload: { id: id, entry },
  };
};