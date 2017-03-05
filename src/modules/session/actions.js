import { createTypes, getAction } from 'action-helpers';

export const SESSION = createTypes('SESSION', ['LOGOUT_REQUESTED']);

export const onLogout = () => getAction(SESSION.LOGOUT_REQUESTED);
