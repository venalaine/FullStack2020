import React from "react";
import { useStateValue } from '../state/state';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField } from "../AddPatientModal/FormField";
import { OccupationalHealthcareEntry } from "../types";
import { DiagnosisSelection } from '../AddPatientModal/FormField';

export type OccupationalEntryFormValues = Omit<OccupationalHealthcareEntry, "id">;

interface Props {
    onSubmit: (values: OccupationalEntryFormValues) => void;
    render: boolean;
}

const AddOccupationalEntryForm: React.FC<Props> = ({ onSubmit, render }) => {
    const [{ diagnosis }] = useStateValue();
    const [startDateError, setStartDateError] = React.useState<string | undefined>();
    const [endDateError, setEndDateError] = React.useState<string | undefined>();

    if (!render) {
        return null;
    }

    const handleStartDateError = () => {
        setStartDateError("Date must be typed YYYY-MM-DD");
        setTimeout(() => {
            setStartDateError(undefined);
        }, 3000);
    };

    const handleEndDateError = () => {
        setEndDateError("Date must be typed YYYY-MM-DD");
        setTimeout(() => {
            setEndDateError(undefined);
        }, 3000);
    };

    return (
        <Formik
            initialValues={{
                type: "OccupationalHealthcare",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                employerName: "",
                sickLeave: {
                    startDate: "",
                    endDate: "",
                }
            }}
            onSubmit={onSubmit}
            validate={values => {
                const dateError = "Date must be typed YYYY-MM-DD";
                const requiredError = "Field is required";
                const errors: { [field: string]: string } = {};

                // StackOverflowsta kaivettu. Ei ehkä maailman paras validaattori, mutta varmaan tyhjää parempi. 
                // Puuttuu ainakin siihen, jos ei ole muodossa YYYY-MM-DD ja jos ei ole numeroita. 
                const testDateError = (date: string): boolean => {
                    return /^\d{4}-\d{2}-\d{2}$/.test(date);
                };

                if (!values.description) {
                    errors.description = requiredError;
                }
                if (!values.date) {
                    errors.date = requiredError;
                }
                if (!testDateError(values.date)) {
                    errors.date = dateError;
                }
                if (!values.specialist) {
                    errors.specialist = requiredError;
                }
                if (!values.employerName) {
                    errors.employerName = requiredError;
                }
                if (values.sickLeave?.startDate !== undefined && !testDateError(values.sickLeave.startDate)) {
                    handleStartDateError();
                }
                if (values.sickLeave?.endDate !== undefined && !testDateError(values.sickLeave.endDate)) {
                    handleEndDateError();
                }
                return errors;
            }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <br />
                        <h1>Add new healthcheck entry</h1>
                        <br />
                        <Field
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field
                            label="Specialist"
                            placeholder="Specialist"
                            name="specialist"
                            component={TextField}
                        />
                        <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnosis)}
                        />
                        <Field
                            label="Employer name"
                            placeholder="Employer name"
                            name="employerName"
                            component={TextField}
                        />
                        <h3>Sickleave</h3>
                        <Field
                            label="Start date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.startDate"
                            component={TextField}
                        />
                        <div style={{ color: "red" }}>
                            {startDateError}
                        </div>
                        <Field
                            label="End sate"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.endDate"
                            component={TextField}
                        />
                        <div style={{ color: "red" }}>
                            {endDateError}
                        </div>
                        <Grid>
                            <Grid.Column floated="right" width={5}>
                                <Button
                                    type="submit"
                                    floated="right"
                                    color="green"
                                    disabled={!dirty || !isValid}
                                >
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik >
    );
};

export default AddOccupationalEntryForm;