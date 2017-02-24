import React from 'react';
import { FormTextarea } from 'custom-components';

export default () =>
  <FormTextarea
    label="description"
    hideLabel
    my={2}
    name="description"
    placeholder="What is the issue about? Is it a bug, how can we reproduce it?"
  />;
