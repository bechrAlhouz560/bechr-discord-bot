const axios = require('axios');


const { AttachmentBuilder , SlashCommandBuilder } = require('discord.js');
// lcm = 10000
// 1 - 5: Super Rare
// 6 - 100 : Rare
// 101 - 500 : Hard 
// 301 - 1000 : Semi hard
// 1001 - 10000 : Normal


const pointer = () => (Math.random()*10000).toFixed()


async function genCard () {
    const response = await axios("https://api.waifu.pics/sfw/neko");
    const url  = response.data.url;
    try {
        const Canvas = require('@napi-rs/canvas');
        const canvas = Canvas.createCanvas(250, 350);


	    const context = canvas.getContext('2d');
    

        const image = await Canvas.loadImage(url);


        var wrh = image.width / image.height;
        var newWidth = canvas.width;
        var newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
					newHeight = canvas.height;
        	newWidth = newHeight * wrh;
      	}
        var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
        var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;

        context.drawImage(image,xOffset,yOffset, newWidth, newHeight);

        


        return canvas.encodeSync('png');
    } catch (error) {
        return url;
    }

}
module.exports = {
    data : new SlashCommandBuilder().setName('card')
    .setDescription('generate a card to deal with'),

    /**
     * 
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     */
    execute : async function (interaction) {
        await interaction.reply({files : [await genCard()] , content : "Lucky Number is "+pointer()});

        
    }
}