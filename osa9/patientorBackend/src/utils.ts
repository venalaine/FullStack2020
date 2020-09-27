/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatientEntry, Gender } from './types';

const toNewPatientEntry = (object: any): NewPatientEntry => {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDoB(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: [],
    };
};

const parseName = (name: any): string => {
    if (!name || !isString(name)) {
        throw new Error(`Incorrect parameter in name: ${name as string}`);
    }
    return name;
};

const parseDoB = (dateOfBirth: any): string => {
    if (!dateOfBirth || !isString(dateOfBirth)) {
        throw new Error(`Incorrect parameter in date of birth: ${dateOfBirth as string}`);
    }
    return dateOfBirth;
};

const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Incorrect parameter in ssn: ${ssn as string}`);
    }
    return ssn;
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Incorrect parameter in gender: ${gender as string}`);
    }
    return gender;
};

const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Incorrect parameter in occupation: ${occupation as string}`);
    }
    return occupation;
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
};

export default toNewPatientEntry;