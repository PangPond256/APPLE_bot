const Discord = require('discord.js')
const {Intents} = require('discord.js')
const client = new Discord.Client({ intents:["GUILDS", "GUILD_MESSAGES","GUILD_VOICE_STATES"], partials: ["MESSAGE", "CHANNEL", "REACTION"] })
require('dotenv').config()

module.exports = client

const fs = require('fs')

client.slash_commands = new Discord.Collection()
client.commands = new Discord.Collection()
client.events = new Discord.Collection();

['common_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

require("./handlers/slash_handler")

client.login(process.env.TOKEN)


