import React from 'react';
import { ButtonsGroup } from 'custom-components';

export default () =>
  <ButtonsGroup
    my={2}
    options={[{
      key: 'blocking emergency',
      displayValue: 'Emergency',
    }, {
      key: 'bug',
      displayValue: 'Bug',
    }, {
      key: 'enhancement',
      displayValue: 'Enhancement',
    }, {
      key: 'question',
      displayValue: 'Question',
    }]}
    name="type"
  />;
