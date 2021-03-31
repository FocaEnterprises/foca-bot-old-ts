import { Message } from 'discord.js';

import { BotEvent } from '../typings/types';

const event: BotEvent = {
  name: 'Message',
  description: 'Evento chamado quando alguém envia uma messagem',
  caller: 'message',
  enable: true,
  run: async (Bot, msg: Message) => {
    // Verificar se foi um bot que enviou
    if (msg.author.bot) return;

    // Verificar se foi enviado em dm
    if (msg.channel.type === 'dm') return;

    // Verificar se inicia com a prefix padrão
    if (!msg.content.startsWith(Bot.config.defaultPrefix)) return;

    // Separar o nome do comando executado e argumentos passados
    const cmd = msg.content
      .trim()
      .split(' ')[0]
      .slice(Bot.config.defaultPrefix.length)
      .trim();
    const args = msg.content
      .trim()
      .split(' ')
      .slice(1)
      .filter((arg) => arg !== '');

    // Buscar tanto nome quanto aliase
    let command = Bot.commands.get(cmd);
    const aliase = Bot.aliases.get(cmd);

    // Se tiver achado aliase e não tiver achado o comando tentar buscar pela aliase
    if (!command && aliase) command = Bot.commands.get(aliase);

    // Executar o comando apenas se tiver achado e ele estiver ativado
    if (command && command.enable) {
      // Verificar se o usuário tem permissões
      if (command.permissions && !msg.member!.hasPermission(command.permissions)) {
        msg.channel.send(command.noPermission || '> Você não tem permissão para isso!');
        return;
      }

      command.run(Bot, msg, args);
    }
  },
};

export default event;
