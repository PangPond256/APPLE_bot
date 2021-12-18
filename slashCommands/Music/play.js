const { QueryType } = require("discord-player")
const player = require("../../client/player")
const Discord = require("discord.js")

module.exports = {
    name: "play",
    description: "🎶 Plays a song",
    options: [
        {
            name: "song",
            description: "Enter the Song's name / URL",
            type: "STRING",
            require: true
        }
    ],

    run: async (client, interaction, options) => {

        try {
            const songTitle = interaction.options.getString("song")

            if (!interaction.member.voice.channel) return interaction.followUp({ content: "You have to be in the voice channel!" })

            const searchResult = await player.search(songTitle, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO, //from every platform
            })
            //queue
            const queue = await player.createQueue(interaction.guild, { metadata: interaction.channel })
            //if bot is not connect to voice channel it will connect
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)

            if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({ content: "You have to be in the same voice channel with me!" })
            //add tracks to queue
            searchResult.playlist
                ? queue.addTracks(searchResult.tracks)
                : queue.addTrack(searchResult.tracks[0])
            //if no song , play or wait
            if (!queue.playing) await queue.play()

            interaction.followUp({ content: `Song added **${searchResult.tracks[0]}** - request by **${interaction.user.tag}** - into **${interaction.member.voice.channel.name}**` })
        } catch (err) { 
            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("‼ - An error occured while executing the command!")

            interaction.followUp({ embeds: [errEmbed] })
            console.log(err) 
        }
    }
}