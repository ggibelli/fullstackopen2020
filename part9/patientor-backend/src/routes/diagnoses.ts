import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnosis());
});

router.post('/', (_req, res) => {
  res.send('saving a diagnose');
});

export default router;
