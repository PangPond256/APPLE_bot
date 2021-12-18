const player = require("../../client/player")
const Discord = require("discord.js")
const { execute } = require("../Information/uptime")


module.exports = {
    name: "pause",
    description: "⏸ Pauses the current song",
    aliases: ["pause"],
    description: "Pause the current song",
    usage: `.pause`,
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {
        try {

            const novcEmbed = new Discord.MessageEmbed() 
            .setColor("RED")
            .setDescription("You have to be in the voice channel!")
            if (!message.member.voice.channel) return message.reply({ embeds: [novcEmbed] }) 

            const smvcEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("You have to be in the same voice channel with me!")
            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ embeds: [smvcEmbed] })

            const queue = player.getQueue(message.guildId)

            const nosongEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("No music is currently being played in the sever!")
            if (!queue.playing) return message.reply({ embeds: [nosongEmbed] })
            //if song is being played ,it will be pause
            queue.setPaused(true) 

            const pauseEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Song **${queue.current.title}** has been paused`)
            message.reply({ embeds: [pauseEmbed] })
        } catch (err) {
            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("‼ - An error occured while executing the command!")

            message.reply({ embeds: [errEmbed] })
            console.log(err)
        }
    }
}