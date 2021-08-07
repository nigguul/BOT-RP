const Discord = require('discord.js');
const client = new Discord.Client()
const GuildManager = require('./src/components/GuildManager.js')

var guildsManager = {};

client.on('ready', () => {
    console.log(`Estou online`)

    client.guilds.cache.mapValues((guild) => {
      guildsManager[guild.id] = new GuildManager(guild);

      let membros = guild.memberCount;
      client.user.setActivity(`os ${membros} randal dos Vagos`, { type: "LISTENING" })

      console.log(`${guild.name} - ${guild.id}`)
    })

    console.log(`Totalizando ${client.guilds.cache.keyArray().length} servidores.`)
});

client.on('guildCreate', (guild) => {
  guildsManager[guild.id] = new GuildManager(guild)
})

client.on('message', (message) => {
  if (message.author.bot) return;
  guildsManager[message.guild.id].throwMsg(message);
})

client.on('raw', (dados) => {
  try {
    guildsManager[dados.d.guild_id].throwReaction(dados);
  } catch (err) {

  }
})

client.login('');
