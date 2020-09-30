import React from 'react';
import { Entry } from "../types";
import { useStateValue } from "../state";

interface Props {
   entries: Entry[];
  }

const Entries: React.FC<Props> = ( { entries } ) => {
    const [{ diagnosis } ] = useStateValue();

    if (entries.length === 0) {
        return (
            <div>
                <h3>This patient does not have any entries.</h3>
            </div>
        );
    }

    const renderDiagnosisCodes = ( e: Entry ) => {
        if (e.diagnosisCodes) {
            return (
                <ul>
                    {e.diagnosisCodes.map(d => <li key={d}>{d} {String(diagnosis[d].name)}</li>)}

                </ul>
            );
        }

        return null;
    };

    return (
        <div>
            <h2>Entries</h2>
            {entries.map(e => <div key={e.id}><p>{e.date} {e.description}</p>{renderDiagnosisCodes(e)}</div> )}
        </div>
    );

};

export default Entries;