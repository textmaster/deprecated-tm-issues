import { createTypes, getAction } from 'action-helpers';

// ACTION TYPES
export const FORM = createTypes('FORM', ['SUBMITTED']);
export const USER = createTypes('USER', ['LOGOUT_REQUESTED']);

// ACTION CREATORS
export const form = {
  onSubmit: formValues => getAction(FORM.SUBMITTED, formValues),
};
export const user = {
  onLogout: () => getAction(USER.LOGOUT_REQUESTED),
};
