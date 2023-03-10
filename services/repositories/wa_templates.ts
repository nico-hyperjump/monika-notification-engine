import config from '../../config';

export const getActionTemplateMap = (): Map<string, string> => {
  const actArray = config.action_template.split(';');
  const result = new Map(
    actArray.map((item) => {
      const keyVal = item.split(',');
      return [keyVal[0], keyVal[1]];
    })
  );

  return result;
};
