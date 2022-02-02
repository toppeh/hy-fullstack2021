import patientsData from '../../data/patients';
import { Patient, PatientSsnOmitted, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Array<PatientSsnOmitted> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patientInfo: NewPatient): Patient => {
  const newPatient: Patient = {
    ...patientInfo,
    id: uuid()
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  addPatient
};