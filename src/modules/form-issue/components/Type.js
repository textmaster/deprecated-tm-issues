import React from 'react';
import { ButtonsGroup } from 'custom-components';

export default () =>
  <ButtonsGroup
    my={2}
    options={[
      'Bug', 'Enhancement', 'Feature Request',
      'Design', 'UX', 'Question', 'Chore',
    ]}
    name="type"
  />;
