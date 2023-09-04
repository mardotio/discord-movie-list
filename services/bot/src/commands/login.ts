import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { generateLoginJwt } from '../utils/jwt';
import { BOT_ENVIRONMENT } from '../utils/environment';
import getCommandName from '../utils/getCommandName';

const command = new SlashCommandBuilder()
  .setName(getCommandName('movie-bot-login'))
  .setDescription('Sends you a login link for the movie bot');

const getLoginButton = (jwt: string) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel('Login')
      .setURL(encodeURI(`${BOT_ENVIRONMENT.UI_ENDPOINT}/login?token=${jwt}`)),
  );

const handler = async (interaction: CommandInteraction) => {
  const { guild } = interaction;

  if (!guild) {
    return;
  }

  const targetMember = guild.members.cache.find(
    (m) => m.user.id === interaction.user.id,
  );

  if (!targetMember) {
    return;
  }

  const jwt = generateLoginJwt({
    username: targetMember.user.username,
    id: targetMember.user.id,
    nickname: targetMember.nickname,
    avatarId: targetMember.user.avatar,
    serverName: guild.name,
    serverId: guild.id,
    serverIconId: guild.icon,
  });

  await interaction.reply({
    components: [getLoginButton(jwt)],
    ephemeral: true,
  });
};

export default {
  command,
  handler,
};
