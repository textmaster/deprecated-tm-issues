import R from 'ramda';
import React, { PropTypes } from 'react';
import { Button, ButtonOutline, Container } from 'rebass';
import { Field } from 'redux-form';

const selectedProps = {
  color: 'white',
  inverted: true,
};

const ButtonsGroup = ({
  input: { onChange, value },
  originalProps: { options, disabled = false, ...otherProps },
}) =>
  <Container {...otherProps}>
    {options.map((option, idx) => {
      const isFirst = idx === 0;
      const isLast = idx === options.length - 1;
      const isSelected = value === option;
      const rounded = !isFirst && !isLast ? false :
                      isFirst && isLast ? true :
                      isFirst ? 'left' : 'right';
      const style = { marginLeft: isFirst ? undefined : -1 };

      const props = R.merge(
        {
          color: 'primary',
          rounded,
          style,
          onClick: () => !disabled && onChange(option),
        },
        isSelected ? selectedProps : {},
      );

      const Component = isSelected ? Button : ButtonOutline;

      return <Component key={option} {...props} >{option}</Component>;
    })}
  </Container>;

ButtonsGroup.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  originalProps: PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    disabled: PropTypes.bool,
  }).isRequired,
};

const FormButtonsGroup = props =>
  <Field component={ButtonsGroup} name={props.name} originalProps={props} />;

FormButtonsGroup.propTypes = { name: PropTypes.string.isRequired };

export default FormButtonsGroup;
