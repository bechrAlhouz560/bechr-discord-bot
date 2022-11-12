const {SlashCommandBuilder} = require('discord.js');
function leastCommonMultiple(min, max) {
    function range(min, max) {
        var arr = [];
        for (var i = min; i <= max; i++) {
            arr.push(i);
        }
        return arr;
    }

    function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }

    var multiple = min;
    range(min, max).forEach(function(n) {
        multiple = lcm(multiple, n);
    });

    return multiple;
}

module.exports = {
    data : new SlashCommandBuilder().setName('lcm')
    .setDescription('find the less commun multiple')
    .addNumberOption((option) => option.setName('x').setDescription("number")
    .setRequired(true))
    .addNumberOption((option) => option.setName('y').setDescription("number")
    .setRequired(true)),

    /**
     * 
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     */
    execute : function (interaction) {

        const x = interaction.options.getNumber('x');
        const y = interaction.options.getNumber('y');
        interaction.reply('The result is '+leastCommonMultiple(x,y));
    }
}