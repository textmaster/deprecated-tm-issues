import React from 'react';
import { ButtonsGroup } from 'custom-components';

export default () =>
  <ButtonsGroup
    my={2}
    options={[
      { key: 't:bug', displayValue: 'Bug' },
      { key: 't:question', displayValue: 'Question' },
      { key: 't:improvement', displayValue: 'Improvement' },
    ]}
    name="type"
  />;
