import patients from '../data/patients';
import { NewPatientEntry, PublicPatient, PatientEntry } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};

const getPatient = (id: string): PublicPatient | undefined => {
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        throw new Error("Patient does not exist.");
    }

    return patient;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    
    const newPatientEntry = { ...entry, id: uuidv4() };
    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default { getPatients, getPatient, addPatient };