import React from "react";
import { useStateValue } from '../state/state';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField } from "../AddPatientModal/FormField";
import { HealthCheckEntry } from "../types";
import { DiagnosisSelection, NumberField } from '../AddPatientModal/FormField';

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: HealthCheckEntryFormValues) => void;
}

const AddHealthCheckEntryForm: React.FC<Props> = ({ onSubmit }) => {
    const [{ diagnosis }] = useStateValue();

    return (
        <Formik
            initialValues={{
                type: "HealthCheck",
                description: "",
                date: "",
                specialist: "",
                diagnosisCodes: [],
                healthCheckRating: 0,
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
                if (!values.healthCheckRating) {
                    errors.healthCheckRating = requiredError;
                }
                if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
                    errors.healthCheckRating = "Value must be between 0-3";
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
                            label="Healthcheck rating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                        />
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

export default AddHealthCheckEntryForm;