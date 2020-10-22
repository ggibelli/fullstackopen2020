import { v4 as uuid } from 'uuid';
import patients from '../../data/patients';

import { Patient, PublicPatient, NewPatient, Entry, NewEntry } from '../types';

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): PublicPatient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, patientId: Patient['id']): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  const patient = patients.find((patient) => patient.id === patientId);
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  getPatient,
  addEntry,
};
