/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Gender,
  NewPatient,
  NewEntry,
  EntryType,
  HealthCheckRating,
  NewHospitalEntryUtils,
  NewHealthCheckEntryUtils,
  NewOccupationalHealthcareEntryUtils,
} from './types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const isLeaveValid = (
  sickLeave: NewOccupationalHealthcareEntryUtils['sickLeave']
): boolean => {
  if (!sickLeave) {
    return false;
  }
  return Boolean(
    Date.parse(sickLeave.startDate) < Date.parse(sickLeave.endDate)
  );
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name ${name}`);
  }

  return name;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description ${description}`);
  }

  return description;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation ${occupation}`);
  }

  return occupation;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing specialist ${specialist}`);
  }

  return specialist;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn ${ssn}`);
  }

  return ssn;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }

  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }

  return gender;
};

const parseType = (type: any): EntryType => {
  if (!type || !isType(type)) {
    throw new Error(`Incorrect or missing type: ${type}`);
  }
  return type;
};

const parseDiagnosisCode = (codes: any): string[] | undefined => {
  if (!Array.isArray(codes) || !codes.every(isString)) {
    throw new Error(`Diagnosis codes must be an array of strings`);
  }
  return codes;
};

const parseHospitalEntry = (params: any): NewHospitalEntryUtils => {
  if (!params.discharge.date || !isDate(params.discharge.date)) {
    throw new Error(
      `Incorrect or missing discharge date: ${params.discharge.date}`
    );
  } else if (
    !params.discharge.criteria ||
    !isString(params.discharge.criteria)
  ) {
    throw new Error(
      `Incorrect or missing discharge criteria: ${params.discharge.criteria}`
    );
  }
  return {
    discharge: params.discharge,
  };
};

const parseHealthCheckEntry = (params: any): NewHealthCheckEntryUtils => {
  if (
    params.healthCheckRating === undefined ||
    !isHealthCheckRating(params.healthCheckRating)
  ) {
    throw new Error(
      `Incorrect or missing health check rating: ${params.healthCheckRating}`
    );
  }
  return {
    healthCheckRating: params.healthCheckRating,
  };
};

const parseOccupationalHealthCareEntry = (
  params: any
): NewOccupationalHealthcareEntryUtils => {
  if (!params.employerName || !isString(params.employerName)) {
    throw new Error(
      `Incorrect or missing employer name: ${params.employerName}`
    );
  }
  if (!params.sickLeave.startDate && !params.sickLeave.endDate) {
    return {
      employerName: params.employerName,
    };
  } else if (
    !isDate(params.sickLeave.startDate) ||
    !isDate(params.sickLeave.endDate) ||
    !isLeaveValid(params.sickLeave)
  ) {
    throw new Error(`Incorrect sick leave`);
  }
  return {
    employerName: params.employerName,
    sickLeave: params.sickLeave,
  };
};

export const toNewEntry = (object: any): NewEntry => {
  const {
    type,
    description,
    specialist,
    diagnosisCodes,
    date,
    ...restParams
  } = object;

  let newEntry = {
    type: parseType(type),
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: parseDiagnosisCode(diagnosisCodes),
  } as NewEntry;

  switch (newEntry.type) {
    case EntryType.Hospital:
      newEntry = {
        ...newEntry,
        ...parseHospitalEntry(restParams),
      };
      break;
    case EntryType.HealthCheck:
      newEntry = {
        ...newEntry,
        ...parseHealthCheckEntry(restParams),
      };
      break;
    case EntryType.OccupationalHealthcare:
      newEntry = {
        ...newEntry,
        ...parseOccupationalHealthCareEntry(restParams),
      };
      break;
    default:
      assertNever(newEntry);
  }
  return newEntry;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    ssn: parseSsn(object.ssn),
    entries: [],
  };
};
