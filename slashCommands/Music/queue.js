const player = require("../../client/player")
const Discord = require("discord.js")

module.exports = {
    name: "queue",
    description: "🎶 Displays all the songs in queue!",

    run: async (client, interaction, options) => {

        try {
            const queue = await player.createQueue(interaction.guild, { metadata: interaction.channel })

            if (!interaction.member.voice.channel) return interaction.followUp({ content: "You have to be in the voice channel!" })

            if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({ content: "You have to be in the same voice channel with me!" })

            if (!queue?.playing) return interaction.followUp({ content: `No music is currently being played in this server!` })

            const currentTrack = queue.current

            const tracks = queue.tracks.slice(0, 10).map((m, i) => {
                return `\`${i + 1}.\` - [**${m.title}** ](${m.url}) - \`${m.requestedBy.tag}\``
            })

            const queueEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`🎶 Song Queue - ${interaction.guild.name} 🎶`)
                .setFooter("Queued by Pukpik")
                .addFields([
                    { name: "Current:", value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - \`${currentTrack.requestedBy.tag}\`\n\n` },
                    {
                        name: "Queue", value: `${tracks.join("\n")}${queue.tracks.length > tracks.length ? `\n...${queue.tracks.length - tracks.join === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}` : ""}`
                    },
                ])

                .setThumbnail(currentTrack.thumbnail)
                .setTimestamp()

            interaction.followUp({ embeds: [queueEmbed] })
        } catch (err) { 
            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("‼ - An error occured while executing the command!")

            interaction.followUp({ embeds: [errEmbed] })
            console.log(err)
        }
    }
}