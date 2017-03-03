import React from 'react';
import { FormTextarea } from 'custom-components';

export default () =>
  <FormTextarea
    label="description"
    hideLabel
    my={2}
    name="description"
    rows="12"
    defaultValue={
`### Expected behaviour


### Current behaviour


### Possible solution


### Steps to reproduce


`}
  />;
