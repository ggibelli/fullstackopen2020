import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form, useFormikContext } from 'formik';
import { useStateValue } from '../state';
import {
  DiagnosisSelection,
  SelectField,
  EntryOption,
  NumberField,
} from './FormField';
import { TextField } from '../AddPatientModal/FormField';
import { Entry, EntryType } from '../types';
import assertNever from '../utils';

export type EntryFormValues = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryOptions: EntryOption[] = [
  { value: EntryType.Hospital, label: 'Hospital' },
  { value: EntryType.HealthCheck, label: 'Health Check' },
  {
    value: EntryType.OccupationalHealthcare,
    label: 'Occupational Health Care',
  },
];

const HealthCheckForm: React.FC = () => (
  <Field
    label="healthCheckRating"
    name="healthCheckRating"
    component={NumberField}
    min={0}
    max={3}
  />
);

const HospitalForm: React.FC = () => (
  <>
    <Field
      label="Criteria"
      placeholder="Criteria"
      name="discharge.criteria"
      component={TextField}
    />
    <Field
      label="Discharge date"
      placeholder="YYYY-MM-DD"
      name="discharge.date"
      component={TextField}
    />
  </>
);

const OccupationalHealthcareForm: React.FC = () => (
  <>
    <Field
      label="Employer name"
      placeholder="Employer name"
      name="employerName"
      component={TextField}
    />
    <Field
      label="Sick leave start date"
      placeholder="YYYY-MM-DD"
      name="sickLeave.startDate"
      component={TextField}
    />
    <Field
      label="Sick leave end date"
      placeholder="YYYY-MM-DD"
      name="sickLeave.endDate"
      component={TextField}
    />
  </>
);

const CheckFormik: React.FC = () => {
  const { values } = useFormikContext<EntryFormValues>();
  switch (values.type) {
    case EntryType.Hospital:
      return <HospitalForm />;
    case EntryType.HealthCheck:
      return <HealthCheckForm />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareForm />;
    default:
      return assertNever(values.type);
  }
};

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [''],
        type: EntryType.HealthCheck,
        healthCheckRating: 3,
        employerName: '',
        discharge: {
          date: '',
          criteria: '',
        },
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <SelectField label="Type" name="type" options={entryOptions} />
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
              placeholder="Doctor."
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnosis={Object.values(diagnosis)}
            />
            <CheckFormik />

            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
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
    </Formik>
  );
};

export default AddEntryForm;
