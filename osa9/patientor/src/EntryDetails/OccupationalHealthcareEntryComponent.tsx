import React from 'react';
import { OccupationalHealthcareEntry } from "../types";
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react';

const OccupationalHealthcareEntryComponent: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    const [{ diagnosis }] = useStateValue();

    const renderDiagnosisCodes = () => {
        if (entry.diagnosisCodes !== undefined) {
            return (
                <ul>
                    {entry.diagnosisCodes.map(d => <li key={d}>{d} {diagnosis[d].name}</li>)}
                </ul>
            );
        }
        return null;
    };

    const renderSickLeave = () => {
        if (entry.sickLeave) {
            return (
                <ul>
                    {entry.sickLeave.startDate} {entry.sickLeave.endDate}
                </ul>
            );
        }
        return null;
    };

    return (
        <div style={{border: 'groove'}}>
            <b>{entry.date}</b> <Icon name={"stethoscope"} size="large" /><br />
            {entry.description} <br />
            {entry.employerName}
            {renderSickLeave()}
            {renderDiagnosisCodes()}
        </div>
    );
};

export default OccupationalHealthcareEntryComponent;