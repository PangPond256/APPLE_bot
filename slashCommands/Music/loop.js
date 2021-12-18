const player = require("../../client/player")
const Discord = require("discord.js")


module.exports = {
    name: "loop",
    description: "🔁 Loops the queue",
    options: [
        {
            name: "mode",
            description: "Choose a loop mode 'off', 'track' , 'queue' , 'autoplay'",
            type: "STRING",
            require: true

        }
    ],

    run: async (client, interaction, options) => {
        try {
            const songTitle = interaction.options.getString("mode").toLowerCase()

            const mode = ["off", "track", "queue", "autoplay"]

            if (!interaction.member.voice.channel) return interaction.followUp({ content: "You have to be in the voice channel!" })

            const queue = player.getQueue(interaction.guildId)

            if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({ content: "You have to be in the same voice channel with me!" })

            if (!queue.playing) return interaction.followUp({ content: "No music is currently being played in the sever!" })

            if (!mode.includes(songTitle)) return interaction.followUp({ content: `You can only choose among, \`off\`, \`track\`, \`queue\`, \`autoplay\`` })

            if (songTitle === "off") {
                queue.setRepeatMode(0)
                return interaction.followUp({ content: "Loop mode is now disable" })
            } else if (songTitle === "track") {
                queue.setRepeatMode(1)
                return interaction.followUp({ content: "Loop mode is set to **TRACK**" })
            } else if (songTitle === "queue") {
                queue.setRepeatMode(2)
                return interaction.followUp({ content: "Loop mode is set to **QUEUE**" })
            } else if (songTitle === "autoplay") {
                queue.setRepeatMode(3)
                return interaction.followUp({ content: "Loop mode is set to **AUTOPLAY**" })
            }

        } catch (err) {
            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("‼ - An error occured while executing the command!")

            interaction.followUp({ embeds: [errEmbed] })
            console.log(err)
        }
    }
}