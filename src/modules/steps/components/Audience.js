import React from 'react';
import { ButtonsGroup } from 'custom-components';

export default () =>
  <ButtonsGroup
    my={2}
    options={['Author', 'Client', 'Admin', 'Api', 'Prod', 'Marketing']}
    name="audience"
  />;

