import { Input, Textarea } from 'rebass';
import makeFormCompatibleRebassComponent from './make-form-compatible-rebass-component';

export { default as DisposableMessage } from './DisposableMessage';
export { default as ButtonsGroup } from './ButtonsGroup';
export { default as SpinnerButton } from './SpinnerButton';

export const FormInput = makeFormCompatibleRebassComponent(Input);
export const FormTextarea = makeFormCompatibleRebassComponent(Textarea);
