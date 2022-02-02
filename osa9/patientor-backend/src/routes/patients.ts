import express from 'express';
import patientsService from '../services/patientsService';
import { Patient } from '../types';
import { validateNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

router.post('/', (req, res) => {
  try {
    //const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const toBeAddedPatient = validateNewPatient(req.body);
    const addedPatient: Patient = patientsService.addPatient(toBeAddedPatient);
    res.send(addedPatient);
} catch (error: unknown){
  let errorMessage = 'Something went wrong.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  res.status(400).send(errorMessage);
}
});

export default router;