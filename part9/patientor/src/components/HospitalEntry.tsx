import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

import { HospitalEntry } from '../types';

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({
  entry,
}) => (
  <Card>
    <Card.Content>
      <h3>
        {entry.date} <Icon name="hospital" />
      </h3>
    </Card.Content>

    <Card.Content description={entry.description} />
    <Card.Content extra>
      Discharge reason: {entry.discharge.criteria}
      <br />
      Discharge date: {entry.discharge.date}
    </Card.Content>
  </Card>
);
export default HospitalEntryComponent;
