import { lifecycle } from 'recompose';

export default lifecycle({ componentWillMount() {
  const { input, originalProps } = this.props;
  if (!input.value && originalProps.defaultValue !== undefined) {
    input.onChange(originalProps.defaultValue);
  }
} });

