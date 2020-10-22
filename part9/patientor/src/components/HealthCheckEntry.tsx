import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';
import HealthRating from './HealthRatingBar';

const HealthCheckEntryComponent: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => (
  <Card>
    <Card.Content>
      <h3>
        {entry.date} <Icon name="doctor" />
      </h3>
    </Card.Content>

    <Card.Content description={entry.description} />
    <Card.Content extra>
      <HealthRating showText={true} rating={entry.healthCheckRating} />
    </Card.Content>
  </Card>
);
export default HealthCheckEntryComponent;
