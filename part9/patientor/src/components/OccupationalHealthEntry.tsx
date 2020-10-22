import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { OccupationalHealthcareEntry } from '../types';

const OccupationHealthEntry: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => (
  <Card>
    <Card.Content>
      <h3>
        {entry.date} <Icon name="stethoscope" /> {entry.employerName}
      </h3>
    </Card.Content>
    <Card.Content description={entry.description} />
    {entry.sickLeave ? (
      <Card.Content extra>
        Sick Leave start: {entry.sickLeave?.startDate}
        <br />
        Sick Leave end: {entry.sickLeave?.endDate}
      </Card.Content>
    ) : null}
  </Card>
);

export default OccupationHealthEntry;
