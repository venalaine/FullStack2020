import patients from '../data/patients';
import { NewPatientEntry, NonSensitivePatientEntry, PatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newPatientEntry = {...entry, id: uuidv4()};
      patients.push(newPatientEntry);
      return newPatientEntry;
};

export default { getPatients, addPatient };