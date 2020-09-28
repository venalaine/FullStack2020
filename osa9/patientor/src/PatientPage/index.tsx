import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Patient } from "../types";
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const PatienPage: React.FC = () => {
    const [{ patient }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string | undefined }>();

        const fetchPatient = async () => {
            try {
                const { data: patientFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch({ type: "SET_SINGLE_PATIENT", payload: patientFromApi });
            } catch (e) {
                console.error(e);
            }
        };

        if (patient[id] === undefined) {
            fetchPatient();
        } else if (patient[id] !== undefined && patient[id].id !== id) {
            fetchPatient();
        }
        
    return (
        <>
            {Object.values(patient).map(
                (p: Patient) =>
                    <div key={p.id}>
                        <h3>{p.name}</h3>
                        <p>ssn: {p.ssn}</p>
                        <p>occupation: {p.occupation}</p>
                    </div>

            )}
        </>
    );
};

export default PatienPage;