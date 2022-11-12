const {
	SlashCommandBuilder,
} = require('discord.js');


const command = {
	data: new SlashCommandBuilder()
		.setName('sum')
		.setDescription('sum of two numbers')
		.addNumberOption(option =>
			option.setName('num1')
				.setDescription('Number 1').setRequired(true))
		.addNumberOption(option =>
			option.setName('num2')
			.setDescription('Number 2').setRequired(true)),
	/**
	 * 
	 * @param {import('discord.js').ChatInputCommandInteraction} interaction 
	 */
	execute: async (interaction) => {

		const num1 = interaction.options.getNumber('num1');
		const num2 = interaction.options.getNumber('num2');
		await interaction.reply(`${num1} + ${num2} = ${num1 + num2}`);
	}
}

module.exports = command;