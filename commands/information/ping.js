// module
module.exports = {
    name: 'ping', 
    aliases: ['latency', 'lat'],
    description: "นี่ไงละค่า PING ดูไว้นะ",
    usage: ".ping",
    cooldown : 10,

    execute(client, message, cmd, args, Discord) {

        message.reply("Calculating bot's ping...").then((msg) => {
            const ping = msg.createdTimestamp - message.createdTimestamp

            const pingEmbed = new Discord.MessageEmbed()
                .setColor("RED")
                .setTitle("เช็ค PING ไง")
                .addFields([
                    { name: "Bot Latency 🤖:", value: `${ping}`}, // ping
                    { name: "API Latency 🦾:", value: `${client.ws.ping}`} // client ping
                ])
                .setTimestamp()

            msg.edit({ content: "✅ - Well, this is the current ping!", embeds: [pingEmbed] })

        })

    }
}