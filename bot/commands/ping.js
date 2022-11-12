const { SlashCommandBuilder } = require('discord.js');


const command = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),

	/**
	 * 
	 * @param {import('discord.js').ChatInputCommandInteraction} interaction 
	 */
	execute : async (interaction) => {
		await interaction.reply('Pong!');
	}
}

module.exports = command;