import React from 'react';
import { ButtonsGroup } from 'custom-components';

export default () =>
  <ButtonsGroup
    mt={2}
    options={['iOS', 'Android', 'All Mobile Devices', 'Desktop', 'All Platforms']}
    name="platform"
  />;
