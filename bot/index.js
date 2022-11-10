const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { initCommands } = require('./initCommands');


function initClient (client) {
    client.commands = new Collection();



    initCommands(client).then(function () {
        client.on(Events.InteractionCreate, async interaction => {


            if (!interaction.isChatInputCommand()) return;
        
            const command = interaction.client.commands.get(interaction.commandName);


        
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
        
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        });
    });
    
}

module.exports.initBot = function () {
    // Create a new client instance
    const client = new Client({ intents: [GatewayIntentBits.Guilds , 'DirectMessages'] });

    // When the client is ready, run this code (only once)
    // We use 'c' for the event parameter to keep it separate from the already defined 'client'
    client.once(Events.ClientReady, c => {
    	console.log(`Ready! Logged in as ${c.user.tag}`);
    });
    

    
    // Log in to Discord with your client's token
    client.login(process.env.DISCORD_BOT);

    initClient(client);

    


}