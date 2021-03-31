import fs from 'fs';
import path from 'path';
import { Client } from 'discord.js';

import { BotEvent } from '../typings/types';

const eventDir: string = path.resolve(__dirname, '..', 'events');

class EventsLoader {
  private Bot: Client;

  constructor(Bot: Client) {
    this.Bot = Bot;
  }

  private filterEventsCaller() {
    const newEventsCaller: [[string, string[]]?] = [];

    // Filtrar todos eventos caso tenha algum repetido
    this.Bot.eventsCallers.forEach((eventsName, key) => {
      const filteredEventsName = eventsName
        .filter((item, index) => eventsName.indexOf(item) === index);

      newEventsCaller.push([key, filteredEventsName]);
    });

    // Salvar nova lista
    newEventsCaller.forEach((filteredEvent) => {
      if (filteredEvent && filteredEvent[0] && filteredEvent[1]) {
        this.Bot.eventsCallers.set(filteredEvent[0], filteredEvent[1]);
      }
    });
  }

  async load() {
    // Ler pasta de eventos
    fs
      .readdirSync(eventDir)
      .forEach(async (eventFile, key) => {
        try {
          // Import async
          const { default: eventProps }: { default: BotEvent } = await import(
            path.resolve(eventDir, eventFile)
          );

          // Registrar evento
          if (this.Bot.events.has(eventProps.name)) {
            console.error(`Event ${eventProps.name} already exists`);
          } else {
            this.Bot.events.set(eventProps.name, eventProps);

            // Ver se já existe uma lista de callers para esse comando
            const eventsCaller: string[] | undefined = this.Bot
              .eventsCallers
              .get(eventProps.caller);

            // Salvar nova lista ou lista inicial
            if (eventsCaller) {
              eventsCaller.push(eventProps.name);
              this.Bot.eventsCallers.set(eventProps.caller, eventsCaller);
            } else {
              this.Bot.eventsCallers.set(eventProps.caller, [eventProps.name]);
            }

            if (key + 1 === fs.readdirSync(eventDir).length) this.filterEventsCaller();

            console.log(`Successfully loaded ${eventFile}`);
          }
        } catch (err) {
          console.error(`Error while trying to load ${eventFile} - ${err.message}`);
        }
      });
  }
}

export default EventsLoader;
