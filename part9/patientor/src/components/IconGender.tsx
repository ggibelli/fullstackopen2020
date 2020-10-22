import React from 'react';
import { Icon } from 'semantic-ui-react';
import { Gender } from '../types';

const IconGender: React.FC<{ gender: Gender }> = ({ gender }) => {
  switch (gender) {
    case 'male':
      return <Icon name="mars" />;
    case 'female':
      return <Icon name="venus" />;
    case 'other':
      return <Icon name="venus mars" />;
    default:
      return <Icon name="venus mars" />;
  }
};
export default IconGender;
