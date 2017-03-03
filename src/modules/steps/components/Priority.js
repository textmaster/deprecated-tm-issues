import React from 'react';
import { ButtonsGroup } from 'custom-components';

export default () =>
  <ButtonsGroup
    my={2}
    options={[
      { key: 'low', displayValue: 'Low' },
      { key: 'normal', displayValue: 'Normal' },
      { key: 'high', displayValue: 'I need a hero' },
    ]}
    name="priority"
    defaultValue="normal"
  />;

