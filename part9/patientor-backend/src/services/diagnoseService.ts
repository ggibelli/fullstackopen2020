import diagnoses from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
