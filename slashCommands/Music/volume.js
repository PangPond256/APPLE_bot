const player = require("../../client/player")
const Discord = require("discord.js")

module.exports = {
    name: "volume",
    description: "🔊 Changes or checks the volume of the current song",
    options: [{
        name: "amount",
        description: "Percentage to change the volume to",
        type: "INTEGER",
        require: false,
    },
    ],

    run: async (client, interaction, options) => {

        try {
            const volumePercentage = interaction.options.getInteger("amount")

            if (!interaction.member.voice.channel) return interaction.followUp({ content: "You have to be in the voice channel!" })

            if (interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id) return interaction.followUp({ content: "You have to be in the same voice channel with me!" })

            const queue = player.getQueue(interaction.guildId)

            if (!volumePercentage) return interaction.followUp({ content: `The current volume is \`${queue.volume}%\`` })

            if (volumePercentage < 0 || volumePercentage > 100) return interaction.followUp({ content: `The volume must be between \`1\` & \`100\`!` })

            queue.setVolume(volumePercentage)

            interaction.followUp({ content: `Volume has been set to \`${volumePercentage}%\`` })
        } catch (err) { 
            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("‼ - An error occured while executing the command!")

            interaction.followUp({ embeds: [errEmbed] })
            console.log(err) 
        }
    }
}