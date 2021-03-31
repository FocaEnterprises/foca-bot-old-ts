import { BotConfig } from '../typings/types';

const config: BotConfig = {
  name: 'Foca Bot',
  version: '1.0.0',
  token: process.env.TOKEN,

  behavior: {
    defaultPrefix: '!',
    welcomeChannelId: '753035853458309121',
    rulesChannelId: '745352992706003005'
  },

  devlopment: {
    enable: process.env.NODE_ENV === 'development',
    token: process.env.DEV_TOKEN,
  },
};

export default config;
