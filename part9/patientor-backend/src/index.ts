import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';
import diagnoseRouter from './routes/diagnoses';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnosis', diagnoseRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
