const mongoose = require('mongoose');
const config = require('config');
const DB = config.get('mongoURI');

const DatabaseConnection = async () => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
        });

        console.log(`Database connected`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = DatabaseConnection;