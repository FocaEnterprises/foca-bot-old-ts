import { Message, MessageEmbed } from 'discord.js';
import { Command } from '../../typings/types';

const command: Command = {
  name: 'mute',
  description: 'Silenciar um usuário',
  usage: '<prefix>mute @usuario <tempo>',
  aliases: [],
  dm: false,
  enable: true,
  run: async (Bot, msg: Message, args: string[]) => {

    return;

    if(args.length == 0) {
      return msg.channel.send(`<@${msg.author.id}> Especifique o usuário e o tempo!`);
    }

    return msg.reply('Em desenvolvimento')
  },
};

export default command;
