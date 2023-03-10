import cfg from '../../config';

export enum actions {
  register = 'register',
  confirm = 'confirmation',
  instruction = 'instruction',
  start = 'start',
  incident = 'incident',
  recovery = 'recovery',
  terminate = 'terminate',
  delete_user = 'delete_user',
  status_update = 'status-update',
}

export const isActionAllowed = (type: string) => {
  const actionList = cfg.actions.split(',');
  return actionList.includes(type);
};
