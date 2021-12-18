const player = require("../../client/player")

module.exports = {
    name: "queue",
    description: "🎶 Displays all the songs in queue!",
    aliases: ["q"],
    usage: `.q`,
    cooldown: 5,

    async execute(client, message, cmd, args, Discord) {

        try {
            const queue = player.getQueue(message.guildId)

            const novcEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("You have to be in the voice channel!")
            if (!message.member.voice.channel) return message.reply({ embeds: [novcEmbed] })

            const smvcEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("You have to be in the same voice channel with me!")
            if (message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.reply({ embeds: [smvcEmbed] })

            const nosongEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("No music is currently being played in this server!")
            if (!queue.playing) return message.reply({ embeds: [nosongEmbed] })

            const currentTrack = queue.current

            const tracks = queue.tracks.slice(0, 10).map((m, i) => {
                return `\`${i + 1}.\` - [**${m.title}** ](${m.url}) - \`${m.requestedBy.tag}\``
            })

            const queueEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(`🎶 Song Queue - ${message.guild.name} 🎶`)
                .setFooter("Queued by MupMip")
                .addFields([
                    { name: "Current:", value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - \`${currentTrack.requestedBy.tag}\`\n\n` }, // name song current
                    {
                        name: "Queue", value: `${tracks.join("\n")}${queue.tracks.length > tracks.length ? `\n...${queue.tracks.length - tracks.join === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}` : ""}`
                    }, // show queue
                ])

                .setThumbnail(currentTrack.thumbnail)
                .setTimestamp()

            return message.reply({ embeds: [queueEmbed] })
        } catch (err) { 
            const errEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("‼ - An error occured while executing the command!")

            message.reply({ embeds: [errEmbed] })
            console.log(err)
        }
    }
}