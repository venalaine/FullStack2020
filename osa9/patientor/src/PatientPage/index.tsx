import React from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Patient } from "../types";
import { apiBaseUrl } from '../constants';
import { useStateValue, setSinglePatient } from '../state';
import { Icon } from 'semantic-ui-react';
import EntryDetails from '../EntryDetails/index';

const PatienPage: React.FC = () => {
    const [{ patient }, dispatch] = useStateValue();

    const { id } = useParams<{ id: string | undefined }>();

    const fetchPatient = async () => {
        try {
            const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(setSinglePatient(patientFromApi));
        } catch (e) {
            console.error(e);
        }
    };

    if (patient[id] === undefined) {
        fetchPatient();
    } else if (patient[id] !== undefined && patient[id].id !== id) {
        fetchPatient();
    }

    const renderIcon = (gender: string) => {
        const iconName = gender === "male" ? "mars" : gender === "female" ? "venus" : "genderless";
        return (
            <div>
                <Icon name={iconName} size="large" />
            </div>
        );
    };

    return (
            <div>
                {Object.values(patient).map(
                    (p: Patient) =>
                        <div key={p.id}>
                            <h2>{p.name} {renderIcon(p.gender)}</h2>
                            <p>ssn: {p.ssn}</p>
                            <p>occupation: {p.occupation}</p>
                            <h2>Entries</h2>
                            {p.entries.map(e => <EntryDetails key={e.id} entry={e}/>)}
                        </div>
                )}
            </div>
    );
};

export default PatienPage;