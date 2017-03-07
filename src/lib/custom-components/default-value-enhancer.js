import R from 'ramda';
import { compose, lifecycle, mapProps } from 'recompose';

export default compose(
  lifecycle({ componentWillMount() {
    const { input, originalProps } = this.props;
    if (!input.value && originalProps.defaultValue !== undefined) {
      input.onChange(originalProps.defaultValue);
    }
  } }),
  mapProps(({ originalProps, ...others }) => ({
    originalProps: R.omit(['defaultValue'], originalProps),
    ...others,
  })),
);

