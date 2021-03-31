import { Collection } from 'discord.js';

import { BotConfig, Command, BotEvent } from './types';

declare module 'discord.js' {
  export interface Client {
    /**
     * Comandos que o Bot carregou
     */
    commands: Collection<string, Command>;
    /**
     * Eventos que o Bot carregou
     */
    events: Collection<string, BotEvent>;
    /**
     * Aliases para comandos
     */
    aliases: Collection<string, string>;
    /**
     * Lista de todos os eventos que devem ser chamados
     */
    eventsCallers: Collection<string, string[]>;

    /**
     * Configuração do Bot
     */
    config: BotConfig;
  }
}
