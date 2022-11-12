const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { initCommands } = require('./initCommands');
const { initEvents } = require('./initEvents');






function initClient (client) {
    client.commands = new Collection();
    initCommands(client).then (() => initEvents(client));
}

module.exports.initBot = function () {
    // Create a new client instance
    const client = new Client({ intents: [GatewayIntentBits.Guilds  , 'MessageContent','DirectMessages' , 'GuildMessages'] });

    // When the client is ready, run this code (only once)
    // We use 'c' for the event parameter to keep it separate from the already defined 'client'
    client.once(Events.ClientReady, c => {
    	console.log(`Ready! Logged in as ${c.user.tag}`);
    });
    

    
    // Log in to Discord with your client's token
    client.login(process.env.DISCORD_BOT).then(() => initClient(client));


    
    
    


}