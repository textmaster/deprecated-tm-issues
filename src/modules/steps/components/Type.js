import React from 'react';
import { ButtonsGroup } from 'custom-components';

export default () =>
  <ButtonsGroup
    my={2}
    options={['Bug', 'Performance', 'Documentation', 'Feature Request']}
    name="type"
  />;
