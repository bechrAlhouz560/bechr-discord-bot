const {
    Sequelize
} = require('sequelize');

const fs = require('fs')
const path = require('path')


function initModels () {
    const modelFiles = fs.readdirSync(path.resolve(__dirname, 'models'))
    .filter(file => file.endsWith('.js'));
    for (const file of modelFiles) {
		const Model = require(`./models/${file}`);	
        Model.sync();

	}
}

module.exports.initDb = async function () {
    const dev = 1;

    let sequelize;
    if (dev) {
        sequelize = new Sequelize('mysql://localhost/', {
            username: 'root',
            database : 'botdb',
            dialect: 'mysql',
            
        }) 
    } else {


    
        sequelize = new Sequelize({
            username: 'epiz_32655975',
            password: 'KpcD51DIQiLQ',
            dialect: 'mysql',
            database: 'epiz_32655975_discordbot',
            host : "sql201.byetcluster.com",
            port : 3306,
            
        }) // Example for postgres

        console.log('connected !')
    }

    try {
        await sequelize.authenticate({retry : 2});
        global.sequelize = sequelize;
        initModels();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }

    return sequelize;

}