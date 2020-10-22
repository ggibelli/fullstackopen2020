import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnosis = (): Diagnosis[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnosis,
  addDiagnosis,
};
