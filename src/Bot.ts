import Discord from 'discord.js';
import 'dotenv/config';

// Configurações do bot
import config from './config/config';

// Importar handlers
import CommandsLoader from './handlers/Commands';
import EventsLoader from './handlers/Events';
import Listeners from './handlers/Listeners';

// Criar client
const Bot = new Discord.Client();

// Criar as collections e salvar as configurações no client
Bot.commands = new Discord.Collection();
Bot.events = new Discord.Collection();
Bot.aliases = new Discord.Collection();
Bot.eventsCallers = new Discord.Collection();
Bot.config = config;

// Carregar comandos, events e listeners
const commandsLoader = new CommandsLoader(Bot);
const eventsLoader = new EventsLoader(Bot);
commandsLoader.load();
eventsLoader.load();

Listeners(Bot);

const token: string | undefined = config.devlopment.enable ? config.devlopment.token : config.token;

if (token) {
  Bot.login(token);
} else {
  console.log('Token not found');
}
