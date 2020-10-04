import React from 'react';
import { HospitalEntry } from "../types";
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react';

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
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

    return (
        <div style={{border: 'groove'}}>
            <b>{entry.date}</b> <Icon name={"hospital"} size="large" /><br />
            {entry.description} <br />
            {entry.discharge.date} {entry.discharge.criteria}
            <br/>
            {renderDiagnosisCodes()}
        </div>
    );

};

export default HospitalEntryComponent;