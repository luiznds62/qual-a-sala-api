import Mongoose from 'mongoose';
import logger from '../core/logger/app-logger'
import config from '../core/config/config.dev'

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
    let dbHost = config.dbHost;
    let dbPort = config.dbPort;
    let dbName = config.dbName;
    try {
        await Mongoose.connect('mongodb+srv://root:12598@financial-tyiml.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
        logger.info('Connected to mongo!!!');
    }
    catch (err) {
        logger.error('Could not connect to MongoDB' + err);
    }
}

export default connectToDb;