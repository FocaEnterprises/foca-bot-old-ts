import { GuildMember, MessageEmbed } from 'discord.js';
import { BotEvent } from '../typings/types';

const event: BotEvent = {
  name: 'MemberJoin',
  description: 'Evento chamado quando entra um novo jogador na guilda',
  caller: 'guildMemberAdd',
  enable: true,
  run: async (Bot, member: GuildMember) => {
    const { guild } = member;
    const channel = guild.channels.cache.get(Bot.config.behavior.welcomeChannelId);

    if (!channel) {
      console.log('The welcome channel does not exists!');
      return;
    }

    const embed = new MessageEmbed()
      .setTitle('Boas vindas!')
      .setColor(6207921)
      .setThumbnail(member.user.avatarURL() || '')
      .setImage('https://cdn.discordapp.com/attachments/796091203082649640/796103579948548136/BwvawAAAABJRU5ErkJggg.png')
      .setDescription(`Olá, <@${member.user.id}>, seja muito bem-vindo a ${guild.name}!\n\nPor favor, leia as <#${Bot.config.behavior.rulesChannelId}>\n`)
      .setFooter(guild.name, guild.iconURL() || '');

    const content = `||<@${member.user.id}>||`;

    await channel.send({ content, embed });
  },
};

export default event;
