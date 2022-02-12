import React from 'react';
import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, updatePatient } from '../state';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

type GenderProps = {
  gender: string
};

const GenderIcon = ({ gender }: GenderProps) => {
  if (gender === "male"){
    return ( <Icon name="mars" /> );
  } else if (gender === "female"){
    return ( <Icon name="venus" /> );
   } else {
    return ( <Icon name="genderless" /> );
  }
};

const PatientInfoPage = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (patients[id].ssn === undefined){
      void fetchPatient();
    } else {
      return;
    }
  }, [dispatch]);
  
  
  

  return (
    <div>
      <p><b>{patients[id].name}</b> <GenderIcon gender={patients[id].gender} /></p>
      <p>ssn: {patients[id].ssn}</p>
      <p>occupation: {patients[id].occupation}</p>
    </div>  
  );
};

export default PatientInfoPage;