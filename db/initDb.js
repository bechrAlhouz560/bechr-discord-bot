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
        sequelize = new Sequelize('mysql://databases.000webhost.com/', {
            username: 'id18980016_bechralhouz',
            password: '>u?l%hhF2{h$adP%',
            dialect: 'mysql',
            host: 'localhost',
            database: 'id18980016_bechrbot'
        }) // Example for postgres
    }

    try {
        await sequelize.authenticate();
        global.sequelize = sequelize;
        initModels();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }

    return sequelize;

}