

const { Events , } = require('discord.js');

module.exports = {
	name: Events.MessageCreate,
	/**
	 * 
	 * @param {import('discord.js').Message} interaction 
	 * @returns 
	 */
	execute(interaction) {
		if (interaction.author.bot) return;
		interaction.reply(`You said : ${interaction.content}` )
	},
};