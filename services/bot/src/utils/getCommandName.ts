import { BOT_ENVIRONMENT } from './environment';

const getCommandName = (name: string) => {
  if (
    !BOT_ENVIRONMENT ||
    BOT_ENVIRONMENT.ENVIRONMENT_MODE?.toLowerCase() === 'production'
  ) {
    return name;
  }

  return `${name}-dev`;
};

export default getCommandName;
