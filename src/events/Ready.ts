import { BotEvent } from '../typings/types';

const event: BotEvent = {
  name: 'Ready',
  description: 'Evento chamado quando o Bot inicia',
  caller: 'ready',
  enable: true,
  run: (Bot) => {
    console.log(`Bot iniciado com ${Bot.users.cache.size} usuários e ${Bot.channels.cache.size} canais!`);
  },
};

export default event;
