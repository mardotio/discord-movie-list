import Discord from 'discord.js';
import { Routes } from 'discord-api-types/v10';
import { BOT_ENVIRONMENT } from './utils/environment';
import login from './commands/login';
import pick from './commands/pick';

const client = new Discord.Client({
  intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages],
});

const rest = new Discord.REST({ version: '10' }).setToken(
  BOT_ENVIRONMENT.DISCORD_BOT_TOKEN,
);

const COMMAND_LIST = [login, pick];

client.once('ready', () => {
  // eslint-disable-next-line no-console
  console.log(`Logged in as ${client.user?.tag}`);

  (async () => {
    try {
      // eslint-disable-next-line no-console
      console.log('Starting (/) commands');

      await rest.put(
        Routes.applicationCommands(BOT_ENVIRONMENT.DISCORD_BOT_ID),
        {
          body: COMMAND_LIST.map((c) => c.command.toJSON()),
        },
      );

      // eslint-disable-next-line no-console
      console.log('Finished registering commands');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Error creating (/) commands', e);
    }
  })();
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const targetCommand = COMMAND_LIST.find(
    (c) => c.command.name === interaction.commandName,
  );

  if (!targetCommand) {
    return;
  }

  await targetCommand.handler(interaction);
});

client.login(BOT_ENVIRONMENT.DISCORD_BOT_TOKEN);
