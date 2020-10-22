import React from 'react';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthEntry from './OccupationalHealthEntry';
import { Entry, EntryType } from '../types';
import assertNever from '../utils';

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />;
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};
export default EntryComponent;
