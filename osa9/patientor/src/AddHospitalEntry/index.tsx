import React from "react";
import { useStateValue } from '../state/state';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "../AddPatientModal/FormField";
import { HospitalEntry } from "../types";
import { DiagnosisSelection } from '../AddPatientModal/FormField';

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    render: boolean;
}

const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, render }) => {
    const [{ diagnosis }] = useStateValue();
    const [dischargeCriteriaError, setDischargeCriteriaError] = React.useState<string | undefined>();
    const [dischargeDateError, setDischargeDateError] = React.useState<string | undefined>();

    if (!render) {
        return null;
    }

    const handleDischargeCriteriaError = () => {
        setDischargeCriteriaError("Field criteria is required");
        setTimeout(() => {
            setDischargeCriteriaError(undefined);
        }, 3000);
    };

    const handleDischargeDateError = () => {
        setDischargeDateError("Date must be typed YYYY-MM-DD");
        setTimeout(() => {
            setDischargeDateError(undefined);
        }, 3000);
    };

    return (
        <Formik
            initialValues={{
                type: "Hospital",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                discharge: {
                    date: "",
                    criteria: "",
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
                if (!testDateError(values.discharge.date)) {
                    handleDischargeDateError();
                }
                if (!values.discharge.criteria) {
                    handleDischargeCriteriaError();
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
                        <h3>Discharge information</h3>
                        <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                        />
                        <div style={{ color: "red" }}>
                            {dischargeDateError}
                        </div>
                        <Field
                            label="Criteria"
                            placeholder="Criteria"
                            name="discharge.criteria"
                            component={TextField}
                        />
                        <div style={{ color: "red" }}>
                            {dischargeCriteriaError}
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

export default AddHospitalEntryForm;