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
    placeholder="eg, 'Can not link segments with keys'"
  />;
