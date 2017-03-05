import { createTypes, getAction } from 'action-helpers';

export const FORM = createTypes('ISSUE_FORM', ['SUBMITTED']);
export const onSubmit = formValues => getAction(FORM.SUBMITTED, formValues);
