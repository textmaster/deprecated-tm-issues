import React from 'react';
import { ButtonsGroup } from 'custom-components';

export default () =>
  <ButtonsGroup
    my={2}
    options={[
      { key: 'p:casual', displayValue: 'Casual' },
      { key: 'p:help', displayValue: 'Help' },
      { key: 'p:blocker', displayValue: 'Blocker' },
      { key: 'p:broken', displayValue: 'Broken' },
      { key: 'p:critical', displayValue: 'Critical' },
    ]}
    name="priority"
  />;

