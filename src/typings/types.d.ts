/* eslint-disable no-unused-vars */
import {
  Client,
  Message,
  ClientEvents,
  PermissionResolvable,
} from 'discord.js';

/**
 * Interface do objeto que será lido como um comando
 */
export interface Command {
  /**
   * Nome do comando
   */
  name: string;
  /**
   * Descrição do comando
   */
  description: string;
  /**
   * Modo de usar o comando
   */
  usage: string;
  /**
   * Lista de argumentos que foi passado
   */
  aliases: string[];
  /**
   * Permissões que o comando requer
   */
  permissions?: PermissionResolvable;
  /**
   * Mensagem enviada quando o usuário não tem permisão
   */
  noPermission?: string;
  /**
   * Ativar ou desativar o comando
   */
  enable: boolean;
  /**
   * Permitir ou não comando seja executado no dm
   */
  dm: boolean;
  /**
   * Função que será executada quando um comando for chamado
   */
  run: (Bot: Client, msg: Message, args?: string[]) => void,
}

/**
 * Interface do objeto que será lido como um evento
 */
export interface BotEvent {
  /**
   * Nome do evento
   */
  name: string;
  /**
   * Descrição do evento
   */
  description: string;
  /**
   * Nome do evento que chama este bloco
   */
  caller: keyof ClientEvents;
  /**
   * Ativar ou desativar a execução dele
   */
  enable: boolean;
  /**
   * A função que vai ser chamado
   */
  run: (Bot: Client, props?: any) => void;
}

/**
 * Interface do objeto de configuração do Bot
 */
export interface BotConfig {
  /**
   * Nome do Bot
   */
  name: string;
  /**
   * Versão
   */
  version: string;
  /**
   * Token do Bot
   */
  token: string | undefined;

  /**
   * Opções relacionadas ao comportamento
   */
  behavior: {
    /**
    * Uma prefix padrão
    */
    defaultPrefix: string;

    /**
     * Canal onde serão enviadas as mensagens de boas vindas
     */
    welcomeChannelId: string;

    /**
     * Canal das regras
     */
    rulesChannelId: string;

    /**
     * Cargo de silenciado
     */
    mutedRoleId: string;
  }

  /**
   * Opções de desenvolvimento
   */
  devlopment: {
    /**
     * Ativar ou desativar o modo de desenvolvimento
     */
    enable: boolean;
    /**
     * Token de um Bot de desenvolvimento
     */
    token: string | undefined;
  };
}
