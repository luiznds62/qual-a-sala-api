import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from './core/logger/app-logger'
import morgan from 'morgan'
import config from './core/config/config.dev'
import materias from './routes/materia.route'
import userHasMateria from './routes/userHasMateria.route'
import auth from './routes/auth.route'
import cursos from './routes/curso.route'
import connectToDb from './db/connect'

const port = process.env.PORT || 3000;
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

connectToDb();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev", { "stream": logger.stream }));

app.use('/auth', auth);
app.use('/materia', materias);
app.use('/userHasMateria', userHasMateria);
app.use('/curso', cursos);

//Index route
app.get('/', (req, res) => {
    res.send('Invalid endpoint!');
});

app.listen(port, () => {
    logger.info('server started - ', port);
});