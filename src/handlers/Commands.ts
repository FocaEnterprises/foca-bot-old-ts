import fs from 'fs';
import path from 'path';
import { Client } from 'discord.js';

import { Command } from '../typings/types';

// Pegar o dirétorio dos comandos
const commandsDir: string = path.resolve(__dirname, '..', 'commands');

class CommandsLoader {
  private Bot: Client;

  constructor(Bot: Client) {
    // Client discord (BOT)
    this.Bot = Bot;
  }

  // Função que vai carregar tudo
  load() {
    fs
      .readdirSync(commandsDir)
      // Verificar todas as sub-pastas
      .forEach((folder) => {
        // Se alguma tiver um '.' no nome vai ser considerado arquivo e não vai ser carregado
        if (folder.includes('.')) return;

        // Verificar todos os arquivos em cada sub-pasta
        fs
          .readdirSync(path.resolve(commandsDir, folder))
          .map(async (commandFile) => {
            try {
              // Importar async
              const { default: commandProps }: { default: Command } = await import(
                path.resolve(commandsDir, folder, commandFile)
              );

              // Verificar se o comando com o mesmo nome já está registrado
              if (this.Bot.commands.has(commandProps.name)) {
                console.error(`Command ${commandProps.name} already exists`);
              } else {
                // Registrar comando
                this.Bot.commands.set(commandProps.name, commandProps);

                // Registrar aliases
                commandProps.aliases.forEach((aliase) => {
                  if (this.Bot.aliases.has(aliase)) console.warn(`Aliase ${aliase} already exists`);
                  else {
                    this.Bot.aliases.set(
                      aliase,
                      commandProps.name,
                    );
                  }
                });

                console.log(`Successfully loaded ${commandFile}`);
              }
            } catch (err) {
              console.error(`Error while trying to load ${commandFile} - ${err.message}`);
            }
          });
      });
  }
}

export default CommandsLoader;
