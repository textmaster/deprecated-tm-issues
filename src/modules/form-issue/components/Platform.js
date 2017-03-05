import React from 'react';
import { ButtonsGroup } from 'custom-components';

export default () =>
  <ButtonsGroup
    mt={2}
    options={['Chrome', 'Firefox', 'IE', 'Edge', 'Other']}
    name="platform"
  />;
