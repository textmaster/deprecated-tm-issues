import React, { PropTypes } from 'react';
import { Field } from 'redux-form';
import defaultValueEnhancer from './default-value-enhancer';

export default (RebassComponent) => {
  const Component = defaultValueEnhancer(({ input: { onChange, ...inputProps }, originalProps }) =>
    <RebassComponent
      onChange={(e) => { onChange(e.target.value); }}
      {...inputProps}
      {...originalProps}
    />);

  Component.propTypes = {
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
    }).isRequired,
    originalProps: PropTypes.object.isRequired,
  };

  const FormComponent = props =>
    <Field component={Component} name={props.name} originalProps={props} />;

  FormComponent.propTypes = { name: PropTypes.string.isRequired };

  return FormComponent;
};
