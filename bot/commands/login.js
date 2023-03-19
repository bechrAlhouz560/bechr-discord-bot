const {SlashCommandBuilder} = require('discord.js');


module.exports = {
    data : new SlashCommandBuilder().setName('signup')
    .setDescription('sign up !')
    .addStringOption((option) => option.setName('username').setDescription('your username').setRequired(true))
    .addStringOption((option) => option.setName('password').setDescription('your password').setRequired(true))
    ,

    /**
     * 
     * @param {import('discord.js').ChatInputApplicationCommandData} interaction 
     */
    execute : async function (interaction) {

        console.log(interaction.user.id)

        const discord_id = interaction.user.id;

        const username = interaction.options.getString('username');
        const password = interaction.options.getString('password');
        try {
            
            await sequelize.models.User.create({
                username,
                password,
                discord_id
            })



            interaction.reply('user created successfuly !')
        } catch (error) {
            console.log(error)

            if (error.original.sqlState === '23000')
            {
                interaction.reply('username already exists');
            }else
            {
                interaction.reply('error , try again later !');
            }
            
        }
    }
}