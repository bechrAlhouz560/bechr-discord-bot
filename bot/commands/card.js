const axios = require('axios');
const path = require('path')

const {
    AttachmentBuilder,
    SlashCommandBuilder
} = require('discord.js');
// lcm = 10000
// 1 - 5: Super Rare
// 6 - 100 : Rare
// 101 - 500 : Hard 
// 301 - 1000 : Semi hard
// 1001 - 10000 : Normal


const pointer = () => (Math.random() * 10000).toFixed()


async function genCard(p) {
    const response = await axios("https://api.waifu.pics/sfw/neko");
    const url = response.data.url;
    try {
        const Canvas = require('@napi-rs/canvas');
        const canvas = Canvas.createCanvas(350, 450);


        
        const context = canvas.getContext('2d');


        const image = await Canvas.loadImage(url);
        const bg = await Canvas.loadImage(path.resolve(__dirname , 'bg.png'));
        const fill = await Canvas.loadImage(path.resolve(__dirname , 'fill.png'));
        context.drawImage(fill,0,0);
        context.font = "20px";
        context.fillStyle = "white";
        var wrh = image.width / image.height;
        var newWidth = canvas.width;
        var newHeight = newWidth / wrh;
        if (newHeight > canvas.height) {
            newHeight = canvas.height;
            newWidth = newHeight * wrh;
        }
        var xOffset = newWidth < canvas.width ? ((canvas.width - newWidth) / 2) : 0;
        var yOffset = newHeight < canvas.height ? ((canvas.height - newHeight) / 2) : 0;
        context.drawImage(image, xOffset, yOffset, newWidth, newHeight);
        context.drawImage(bg, 0, 0);

        const level = p+'p';
        const t = context.measureText(level)
        context.fillText(level, 350 - t.width - 30, 30);




        return canvas.encodeSync('png');
    } catch (error) {
        return url;
    }

}
module.exports = {
    data: new SlashCommandBuilder().setName('card')
        .setDescription('generate a card to deal with'),

    /**
     * 
     * @param {import('discord.js').ChatInputCommandInteraction} interaction 
     */
    execute: async function (interaction) {

        const file = await genCard(pointer());

        await interaction.reply({
            files: [file],
            content: "Lucky Number is " + pointer()
        });


    }
}