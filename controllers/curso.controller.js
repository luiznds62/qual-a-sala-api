import Curso from '../models/curso.model'
import logger from '../core/logger/app-logger'

const controller = {};

function validate(curso){
    if (!curso.name) {
        res.send({ sucess: false, message: "Nome não informado", object: [] })
    }
}

controller.getAll = async (req, res) => {
    try {
        const cursos = await Curso.find();
        logger.info('sending all cursos...');
        res.send({ sucess: true, message: "Cursos retornadas com sucesso", object: cursos });
    }
    catch (err) {
        logger.error('Error in getting cursos- ' + err);
        res.send({ sucess: false, message: "Erro ao buscar: " + err, object: [] });
    }
}

controller.addCurso = async (req, res) => {
    validate(req.body);

    let cursoToAdd = Curso({
        name: req.body.name,
    });
    try {
        const savedCurso = await Curso.create(cursoToAdd);
        logger.info('Adding curso...');
        res.send({ sucess: true, message: "Adicionado com sucesso", object: savedCurso });
    }
    catch (err) {
        logger.error('Error in saving curso- ' + err);
        res.send({ sucess: false, message: "Erro ao adicionar: " + err, object: [] });
    }
}

export default controller;