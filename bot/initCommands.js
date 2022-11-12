const {
	REST,
	Routes
} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');



module.exports.initCommands = async function (client) {


	const commands = []
	// Grab all the command files from the commands directory you created earlier
	const commandFiles = fs.readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.data.name,command);
		commands.push(command.data.toJSON());
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST({
		version: '10'
	}).setToken(process.env.DISCORD_BOT);
	// and deploy your commands!
	try {
		console.log(`Started refreshing ${client.commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
				body: commands
			},
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
}