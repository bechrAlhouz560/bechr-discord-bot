const {SlashCommandBuilder} = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder().setName('my-name')
    .setDescription('show your name !'),

    /**
     * 
     * @param {import('discord.js').Interaction} interaction 
     */
    execute : function (interaction) {

        console.log(interaction.user.avatarURL())
        interaction.reply('Hello ' + interaction.user.username);
    }
}