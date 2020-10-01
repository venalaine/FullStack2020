import React from 'react';
import { HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react';

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const [{ diagnosis }] = useStateValue();

    const renderDiagnosisCodes = () => {
        if (entry.diagnosisCodes) {
            return (
                <ul>
                    {entry.diagnosisCodes.map(d => <li key={d}>{d} {String(diagnosis[d].name)}</li>)}
                </ul>
            );
        }
        return null;
    };

    const renderHealthCheckIcon = () => {
        if (entry.healthCheckRating === 0) {
            return "green";
        } else if (entry.healthCheckRating === 1) {
            return "yellow";
        } else if (entry.healthCheckRating === 2) {
            return "orange";
        } else {
            return "red";
        }
    };

    return (
        <div style={{ border: 'groove' }}>
            <b>{entry.date}</b> <Icon name={"doctor"} size="large" /><br />
            {entry.description} <br />
            <Icon name={"heart"} color={renderHealthCheckIcon()} />
            <br />
            {renderDiagnosisCodes()}
        </div>
    );

};

export default HealthCheckEntryComponent;