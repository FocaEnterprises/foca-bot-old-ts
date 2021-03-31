import { BotConfig } from '../typings/types';

const config: BotConfig = {
  name: 'Boiller Template',
  version: '1.0',
  defaultPrefix: '.',
  token: process.env.TOKEN,

  devlopment: {
    enable: process.env.NODE_ENV === 'development',
    token: process.env.DEV_TOKEN,
  },
};

export default config;
