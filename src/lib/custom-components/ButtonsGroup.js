import R from 'ramda';
import React, { PropTypes } from 'react';
import { Button, ButtonOutline, Container } from 'rebass';
import { Field } from 'redux-form';
import defaultValueEnhancer from './default-value-enhancer';

const selectedProps = {
  color: 'white',
  inverted: true,
};

const ButtonsGroup = defaultValueEnhancer(({
  input: { onChange, value },
  originalProps: { options, disabled = false, ...otherProps },
}) =>
  <Container {...otherProps}>
    {options.map((option, idx) => {
      const key = option.key || option;
      const displayValue = option.displayValue || option;
      const isFirst = idx === 0;
      const isLast = idx === options.length - 1;
      const isSelected = value === key;
      const rounded = !isFirst && !isLast ? false :
                      isFirst && isLast ? true :
                      isFirst ? 'left' : 'right';
      const style = { marginLeft: isFirst ? undefined : -1 };

      const props = R.merge(
        {
          color: 'primary',
          rounded,
          style,
          onClick: () => !disabled && onChange(key),
        },
        isSelected ? selectedProps : {},
      );

      const Component = isSelected ? Button : ButtonOutline;

      return <Component key={key} {...props} type="button" >{displayValue}</Component>;
    })}
  </Container>);

ButtonsGroup.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  originalProps: PropTypes.shape({
    options: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        displayValue: PropTypes.string.isRequired,
      })),
    ]),
    disabled: PropTypes.bool,
  }).isRequired,
};


const FormButtonsGroup = props =>
  <Field component={ButtonsGroup} name={props.name} originalProps={props} />;

FormButtonsGroup.propTypes = { name: PropTypes.string.isRequired };

export default FormButtonsGroup;
