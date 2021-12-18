const player = require("../../client/player")
const discord = require("discord.js")


module.exports = {
    name: "skip",
    aliases: ["disconnect"],
    description: "Skip a song & Next To Music",
    usage: `.skip`,
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        try {
            const queue = player.getQueue(message.guildId)

            const novcEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`)

            if (!message.member.voice.channel) return message.reply({ embeds: [novcEmbed] })

            const smvcEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`‼️ - Music is currently being played in **${message.guild.me.voice.channel.name}**. You've to be in the same Voice Channel to execute this command!`)

            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ embeds: [smvcEmbed] })

            const nosongEmbed = new Discord.MessageEmbed()
                .setColor("#3d35cc")
                .setDescription(`‼️ - No music is currently be played in this server!`)

            if (!queue?.playing) return message.reply({ embeds: [nosongEmbed] })

            queue.skip() // skip

            const stopEmbed = new Discord.MessageEmbed()
                .setColor("#3d35cc")
                .setDescription(`✅ - Music skipped into this server`)

            return message.reply({ embeds: [stopEmbed] })
        } catch (err) {
            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("‼ - An error occured while executing the command!")

            message.reply({ embeds: [errEmbed] })

            console.log(err)
        }
    }
}