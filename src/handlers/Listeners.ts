import { Client } from 'discord.js';

import { BotEvent } from '../typings/types';

// Registrar no Client todos os callbacks para todos os eventos do discord.js
function Caller(eventName: string, Bot: Client, args: any[]): void {
  const events = Bot.eventsCallers.get(eventName);

  if (events) {
    // Eventos locais que serão chamados a cada evento do Bot
    events.forEach((event) => {
      const runEvent: BotEvent | undefined = Bot.events.get(event);
      if (runEvent && runEvent.enable) runEvent.run(Bot, ...args);
    });
  }
}

export default (Bot: Client): void => {
  // Lista de todos os eventos do discord.js
  const eventList = [
    'rateLimit',
    'ready',
    'resumed',
    'guildCreate',
    'guildDelete',
    'guildUpdate',
    'inviteCreate',
    'inviteDelete',
    'guildUnavailable',
    'guildMemberAdd',
    'guildMemberRemove',
    'guildMemberUpdate',
    'guildMemberAvailable',
    'guildMemberSpeaking',
    'guildMembersChunk',
    'guildIntegrationsUpdate',
    'roleCreate',
    'roleDelete',
    'roleUpdate',
    'emojiCreate',
    'emojiDelete',
    'emojiUpdate',
    'guildBanAdd',
    'guildBanRemove',
    'channelCreate',
    'channelDelete',
    'channelUpdate',
    'channelPinsUpdate',
    'message',
    'messageDelete',
    'messageUpdate',
    'messageDeleteBulk',
    'messageReactionAdd',
    'messageReactionRemove',
    'messageReactionRemoveAll',
    'userUpdate',
    'presenceUpdate',
    'voiceStateUpdate',
    'subscribe',
    'unsubscribe',
    'typingStart',
    'webhookUpdate',
    'disconnect',
    'reconnecting',
    'error',
    'warn',
    'debug',
    'shardDisconnect',
    'shardError',
    'shardReconnecting',
    'shardReady',
    'shardResume',
    'invalidated',
    'raw',
  ];

  eventList.forEach((eventName) => {
    Bot.on(eventName, (...args: any[]) => Caller(eventName, Bot, args));
  });
};
