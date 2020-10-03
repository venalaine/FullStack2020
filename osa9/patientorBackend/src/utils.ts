/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NewPatientEntry, Gender, Entry, HealthCheckRating, Type, Discharge, Sickleave } from './types';
import { v4 as uuidv4 } from 'uuid';

export const toNewPatientEntry = (object: any): NewPatientEntry => {
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

const parseDescription = (description: any): string => {
    if (!description || !isString(description)) {
        throw new Error(`Incorrect parameter in description: ${description as string}`);
    }
    return description;
};

const parseDate = (date: any): string => {
    if (!date || !isString(date)) {
        throw new Error(`Incorrect parameter in date: ${date as string}`);
    }
    return date;
};

const parseSpecialist = (specialist: any): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error(`Incorrect parameter in specialist: ${specialist as string}`);
    }
    return specialist;
};

const isHealthCheckRating = (healthrating: any): healthrating is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(healthrating);
};


const parseHealthCheckRating = (healthrating: any): HealthCheckRating => {
    if (!healthrating || !isHealthCheckRating(healthrating)) {
        throw new Error(`Incorrect parameter in healthCheckRating: ${healthrating as string}`);
    }

    return healthrating;
};

const isEntryType = (type: any): type is Type => {
    return Object.values(Type).includes(type);
};

const parseEntryType = (type: any): Type => {
    if (!isEntryType(type)) {
        throw new Error(`Wrong type: ${type as string}`);
    }
    return type;
};


const parseDiagnosisCodes = (diagnosisCodes: any[]): string[] => {

    if (diagnosisCodes === undefined) {
        return diagnosisCodes;
    }

    for (let i = 0; i < diagnosisCodes.length; i++) {
        if (!isString(diagnosisCodes[i])) {
            throw new Error(`Incorrect parameter in diagnosisCodes: ${diagnosisCodes[i] as string}`);
        }
    }
    return diagnosisCodes;
};

const parseDischarge = (discharge: any): Discharge => {
    if (!discharge || !isString(discharge.date) || !isString(discharge.criteria)) {
        throw new Error(`Missing or incorrect parameter in discharge`);
    }
    return discharge;
};

const parseEmployerName = (employerName: any): string => {
    if (!employerName || !isString(employerName)) {
        throw new Error(`Incorrect parameter in employerName: ${employerName as string}`);
    }
    return employerName;
};

const parseSickLeave = (sickLeave: any): Sickleave => {
    if (sickLeave === undefined) {
        return sickLeave;
    }
    if (!isString(sickLeave.startDate) || !isString(sickLeave.endDate) ) {
        throw new Error(`Missing or incorrect parameter in sickleave`);
    }
    return sickLeave;
};

export const toNewEntry = (object: any): Entry => {

    const base = {
        id: uuidv4(),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    };

    const entryType = parseEntryType(object.type);

    switch (entryType) {
        case "HealthCheck":
            return {
                ...base,
                type: entryType,
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case "Hospital":  
        return {
            ...base,
            type: entryType,
            discharge: parseDischarge(object.discharge)
        };   
        case "OccupationalHealthcare":
            return {
                ...base,
                type: entryType,
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
            };
        default:
            throw new Error('Unknown type');
    }
};