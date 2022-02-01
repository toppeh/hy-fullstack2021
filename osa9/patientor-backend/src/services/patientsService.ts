import { patientsData } from '../../data/patients';
import { Patient, PatientSsnOmitted } from '../types';

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

export default {
  getPatients
};