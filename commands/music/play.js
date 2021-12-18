const { QueryType } = require("discord-player")
const player = require("../../client/player")


module.exports = {
    name: "play",
    aliases: ['P'],
    description: "Plays a song",
    usage: `.play [Song Name] || .play [Song URL]`,
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        try {
            const songTitle = args.join(" ")

            const nosongEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`‼️ - Please provide a song URL or song name!`)

            if (!songTitle) return message.reply({ embeds: [nosongEmbed] })

            const novcEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`‼️ - You have to be in a Voice Channel to use this command!`)

            if (!message.member.voice.channel) return message.reply({ embeds: [novcEmbed] })

            const searchResult = await player.search(songTitle, {
                requestedBy: message.author,
                searchEngine: QueryType.AUTO,

            })
            
            const queue = await player.createQueue(message.guild, { metadata: message.channel })

            if (!queue.connection) await queue.connect(message.member.voice.channel)

            const smvcEmbed = new Discord.MessageEmbed()
                .setColor('#3d35cc')
                .setDescription(`‼️ - Music is currently being played in **${message.guild.me.voice.channel.name}**. You've to be in the same Voice Channel to execute this command!`)

            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ embeds: [smvcEmbed] })

            searchResult.playlist
                ? queue.addTracks(searchResult.tracks)
                : queue.addTrack(searchResult.tracks[0])

            if (!queue.playing) await queue.play()

            const playEmbed = new Discord.MessageEmbed()
                .setColor("#3d35cc")
                .setDescription(`🎵 - Song added **${searchResult.tracks[0]}** - requested by **${message.author.tag}** - into **${message.member.voice.channel.name}**`)

            message.reply({ embeds: [playEmbed] })
        } catch (err) {
            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("‼ - An error occured while executing the command!")

            message.reply({ embeds: [errEmbed] })
            console.log(err)

        }
    }
}