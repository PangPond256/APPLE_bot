const client = require("../index")

client.on('ready', async() => {
    
    console.log(`${client.user.tag} is now online!`)

    client.user.setActivity("APPLE",{type:"PLAYING"})
})
