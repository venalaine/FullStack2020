import patients from '../data/patients';
import { NonSensitivePatientEntry } from '../types';

const getPatients = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

export default { getPatients };