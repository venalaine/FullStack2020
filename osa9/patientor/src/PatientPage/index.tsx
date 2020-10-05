import React, { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { HealthCheckEntry, HospitalEntry, Patient } from "../types";
import { apiBaseUrl } from '../constants';
import { useStateValue, addPatient, addHealthCheckEntry, addHospitalEntry } from '../state';
import { Icon, Button } from 'semantic-ui-react';
import EntryDetails from '../EntryDetails/index';
import AddHealthCheckEntryForm, { HealthCheckEntryFormValues } from '../AddHealthCheckEntryForm/index';
import AddHospitalEntryForm, { HospitalEntryFormValues } from '../AddHospitalEntry';

const PatienPage: React.FC = () => {
    const [{ patients }, dispatch] = useStateValue();
    const [renderHCE, setRenderHCE] = useState(false);
    const [renderHospital, setRenderHospital] = useState(false);

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

    const submitNewHospitalEntry = async (values: HospitalEntryFormValues) => {
        try {
            const { data: newHospitalEntry } = await axios.post<HospitalEntry>(
                `${apiBaseUrl}/patients/${id}/entries`, values
            );
            dispatch(addHospitalEntry(id, newHospitalEntry));
            fetchPatient();
        } catch (e) {
            console.error(e.response.data);
        }
    };

    const handleRenderHCE = () => {
        setRenderHCE(true);
        setRenderHospital(false);
    };

    const handleRenderHospital = () => {
        setRenderHCE(false);
        setRenderHospital(true);
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
            <br/>
            <Button onClick={handleRenderHCE}>Add healthcheck entry</Button>
            <Button onClick={handleRenderHospital}>Add hospital entry</Button>
            <AddHealthCheckEntryForm onSubmit={submitNewHealthCheckEntry} render={renderHCE} />
            <AddHospitalEntryForm onSubmit={submitNewHospitalEntry} render={renderHospital} />
        </div>
    );
};

export default PatienPage;