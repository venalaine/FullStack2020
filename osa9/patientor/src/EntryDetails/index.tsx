import React from 'react';
import { Entry } from "../types";
import HospitalEntryComponent from './HospitalEntryComponent';
import HealthCheckEntryComponent from './HealtCheckEntryComponent';
import OccupationalHealthcareEntryComponent from './OccupationalHealthcareEntryComponent';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryComponent entry={entry} />;
        case "HealthCheck":
            return <HealthCheckEntryComponent entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntryComponent entry={entry} />;
        default:
            return null;
    }

};

export default EntryDetails;