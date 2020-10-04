import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { HealthCheckEntry, Patient } from "../types";
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatient, addHealthCheckEntry } from '../state';
import { Icon } from 'semantic-ui-react';
import EntryDetails from '../EntryDetails/index';
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from '../AddHealthCheckEntryForm/index';

const PatienPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string | undefined }>();
    const patient = patients[id];

    const fetchPatient = async () => {
        try {
            const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(addPatient(patientFromApi));
        } catch (e) {
            console.error(e);
        }
    };

    if (patients[id] === undefined) {
        fetchPatient();
    } else if (patients[id] !== undefined && patients[id].id !== id) {
        fetchPatient();
    }

    if (!patient) return null;

    const renderIcon = (gender: string) => {
        const iconName = gender === "male" ? "mars" : gender === "female" ? "venus" : "genderless";
        return (
            <div>
                <Icon name={iconName} size="large" />
            </div>
        );
    };

    const submitNewHealthCheckEntry = async (values: HealthCheckEntryFormValues) => {
        try {
            const { data: newHealthCheckEntry } = await axios.post<HealthCheckEntry>(
                `${apiBaseUrl}/patients/${id}/entries`, values
            );
            dispatch(addHealthCheckEntry(id, newHealthCheckEntry));
            fetchPatient();
        } catch (e) {
            console.error(e.response.data);
        }
    };

    return (
        <div>
            <div key={patient.id}>
                <h2>{patient.name} {renderIcon(patient.gender)}</h2>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h2>Entries</h2>
                {patient.entries.map(e => <EntryDetails key={e.id} entry={e} />)}
            </div>
            <AddHealthCheckEntryForm onSubmit={submitNewHealthCheckEntry} />
        </div>
    );
};

export default PatienPage;