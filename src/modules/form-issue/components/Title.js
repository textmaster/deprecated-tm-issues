import React from 'react';
import { FormInput } from 'custom-components';

export default () =>
  <FormInput
    autoOff
    hideLabel
    label=""
    my={2}
    name="title"
    type="text"
    placeholder="eg, 'Cannot launch project TR-4B8-35802'"
  />;
