import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import {v1 as uuid} from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find((patient: Patient) => patient.id === id);
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
  findById,
  addPatient
};