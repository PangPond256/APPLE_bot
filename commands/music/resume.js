const player = require("../../client/player")

module.exports = {
    name: 'resume',
    aliases: ["r"],
    description: "Resumes a song",
    usage: '.resume',
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        const queue = player.getQueue(message.guildId) //get queue

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

        queue.setPaused(false) // play

        const rsmEmbed = new Discord.MessageEmbed()
            .setColor("#3d35cc")
            .setDescription(`✅ - Song **${queue.current.title}** has been resumed`)

        return message.reply({ embeds: [rsmEmbed] })

    }
}