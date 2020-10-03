import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatient(req.params.id));
});

router.post('/', (req, res) => {

  try {
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);

  } catch (e) {
    const message = e instanceof Error ? e.message : 'some error';
    res.status(400).send(message);
  }
});

router.post('/:id/entries', (req, res) => {

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntries = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntries);
    res.json(addedEntry);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'some error';
    res.status(400).send(message);
  }
});

export default router;  