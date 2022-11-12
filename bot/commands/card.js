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


function getLevelBg (p) {
    let file;
    if (p <= 5)
    {
        file = 'legend.png'; 
    }
    else if (p <= 100)
    {
        file = 'rare.png'; 

    }
    else if (p <= 1000)
    {
        file = 'hard.png';
    }
    else {
        file = 'normal.png';
    }

    return path.resolve(__dirname, 'cards',file);

}

async function genCard(p) {
    const response = await axios("https://api.waifu.pics/sfw/neko");
    const url = response.data.url;
    try {
        const Canvas = require('@napi-rs/canvas');
        const canvas = Canvas.createCanvas(350, 550);


        
        
        const context = canvas.getContext('2d');


        const image = await Canvas.loadImage(url);
        const bg = await Canvas.loadImage(getLevelBg(p));
        const fill = await Canvas.loadImage(path.resolve(__dirname , 'fill.png'));
        context.drawImage(fill,0,0);
        context.font = "30px";
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
        context.fillText(level, canvas.width - t.width - 35, 50);




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