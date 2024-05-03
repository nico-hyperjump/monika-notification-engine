import cfg from '../../config';

export enum actions {
  register = 'register',
  confirm = 'confirmation',
  instruction = 'instruction',
  start = 'start',
  incident = 'incident',
  recovery = 'recovery',
  incident_symon = 'incident-symon',
  recovery_symon = 'recovery-symon',
  terminate = 'terminate',
  delete_user = 'delete_user',
  status_update = 'status-update',
}

export const isActionAllowed = (type: string) => {
  const actionList = cfg.actions.split(',');
  return actionList.includes(type);
};
