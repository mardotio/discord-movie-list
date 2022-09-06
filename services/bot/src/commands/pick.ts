import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import { formatDistanceToNow, toDate } from 'date-fns';
import { ApiConfig, BotApi, isErrorResponse, MovieResponse } from '../utils/api';
import { generateBotJwt } from '../utils/jwt';
import getCommandName from '../utils/getCommandName';

const command = new SlashCommandBuilder()
  .setName(getCommandName('movie-bot-pick'))
  .setDescription('Selects a random movie from the pending movie list');

const createMovieEmbed = (movie: MovieResponse) => {
  const formattedDate = formatDistanceToNow(toDate(movie.addedOn), {
    addSuffix: true,
  });

  const embed = new EmbedBuilder()
    .setColor('#27edfe')
    .setTitle(movie.name)
    .addFields({ name: 'Added', value: formattedDate });

  if (movie.user.avatarLink) {
    embed.setAuthor({
      name: movie.user.displayName,
      iconURL: movie.user.avatarLink,
    });
  } else {
    embed.setAuthor({ name: movie.user.displayName });
  }
  return embed;
};

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

  const jwt = generateBotJwt({
    username: targetMember.user.username,
    id: targetMember.user.id,
    discriminator: targetMember.user.discriminator,
    nickname: targetMember.nickname,
    avatarId: targetMember.user.avatar,
  });

  ApiConfig.headers = {
    authorization: `Bearer ${jwt}`,
  };

  const res = await BotApi.pickMovie();

  ApiConfig.headers = undefined;

  if (isErrorResponse(res)) {
    await interaction.reply('Could not pick a movie at this time');
    return;
  }

  await interaction.reply({ embeds: [createMovieEmbed(res)] });
};

export default {
  command,
  handler,
};
