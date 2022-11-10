const {SlashCommandBuilder} = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder().setName('my-name')
    .setDescription('show your name !'),
    execute : function (interaction) {
        interaction.reply('Hello !')
    }
}