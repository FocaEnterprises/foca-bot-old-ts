import { Message } from 'discord.js';

import { BotEvent } from '../typings/types';

const event: BotEvent = {
  name: 'Message',
  description: 'Evento chamado quando alguém envia uma messagem',
  caller: 'message',
  enable: true,
  run: async (Bot, msg: Message) => {
    if (msg.author.bot) return;

    if (msg.channel.type === 'dm') return;

    const mentionRegex = RegExp(`^<@!${Bot.user.id}>$`);

    if(msg.content.match(mentionRegex)){
            msg.channel.send(`Meu prefixo é \`${Bot.config.behavior.defaultPrefix}\``);
            return;
        }

    if (!msg.content.startsWith(Bot.config.behavior.defaultPrefix)) return;

    const cmd = msg.content
      .trim()
      .split(' ')[0]
      .slice(Bot.config.behavior.defaultPrefix.length)
      .trim();
    const args = msg.content
      .trim()
      .split(' ')
      .slice(1)
      .filter((arg) => arg !== '');

    let command = Bot.commands.get(cmd);
    const alias = Bot.aliases.get(cmd);

    if (!command && alias) command = Bot.commands.get(alias);

    if (command && command.enable) {
      if (command.permissions && !msg.member!.hasPermission(command.permissions)) {
        msg.channel.send(command.noPermission || '> Você não tem permissão para isso!');
        return;
      }

      command.run(Bot, msg, args);
    }
  },
};

export default event;
