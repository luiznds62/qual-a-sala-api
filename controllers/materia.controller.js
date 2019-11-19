import Materia from '../models/materia.model'
import logger from '../core/logger/app-logger'

const controller = {};

function validadeMateria(materia){
    if (!materia.nome) {
        res.send({ sucess: false, message: "Nome não informado", object: [] })
    }

    if(!materia.curso){
        res.send({ sucess: false, message: "Curso não informado", object: [] })
    }

    if(!materia.professor){
        res.send({ sucess: false, message: "Professor não informado", object: [] })
    }

    if(!materia.fase){
        res.send({ sucess: false, message: "Fase não informada", object: [] })
    }

    if(!materia.sala){
        res.send({ sucess: false, message: "Sala não informada", object: [] })
    }

    if(!materia.bloco){
        res.send({ sucess: false, message: "Bloco não informado", object: [] })
    }

    if(!materia.urlImg){
        res.send({ sucess: false, message: "Imagem não informado", object: [] })
    }
}

controller.getAll = async (req, res) => {
    try {
        const materias = await Materia.getAll();
        logger.info('sending all materias...');
        res.send({ sucess: true, message: "Materias retornadas com sucesso", object: materias });
    }
    catch (err) {
        logger.error('Error in getting materias- ' + err);
        res.send({ sucess: false, message: "Erro ao buscar: " + err, object: [] });
    }
}

controller.getById = async (req, res) => {
    try {
        const materias = await Materia.findOne({_id: req.body.id});
        logger.info('sending materias...');
        res.send({ sucess: true, message: "Materia retornada com sucesso", object: materias });
    }
    catch (err) {
        logger.error('Error in getting materias- ' + err);
        res.send({ sucess: false, message: "Erro ao buscar: " + err, object: [] });
    }
}

controller.getMateriaFromCursoEFase = async (req, res) => {
    try {
        const materias = await Materia.getAll();
        if (materias.length === 0) {
            res.send({ sucess: false, message: "Nenhuma matéria encontrada", object: [] })
        }

        let materiasFiltradas = materias.filter(materia => {
            return materia.curso === req.body.curso
        })

        if (materiasFiltradas.length === 0) {
            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o curso", object: [] })
        }

        materiasFiltradas = materiasFiltradas.filter(materia => {
            return materia.fase === req.body.fase
        })

        if (materiasFiltradas.length === 0) {
            res.send({ sucess: false, message: "Nenhuma matéria encontrada do curso para a fase", object: [] })
        }

        logger.info('sending all materias from curso...');
        res.send({ sucess: true, message: "Matérias buscadas com sucesso", object: materiasFiltradas })
    } catch (error) {
        res.send({ sucess: false, message: "Ocorreu um erro: " + error, object: [] })
    }
}

controller.getMateriaFromCurso = async (req, res) => {
    try {
        const materias = await Materia.getAll();

        if (materias.length === 0) {
            res.send({ sucess: false, message: "Nenhuma matéria encontrada", object: [] })
        }

        const materiasFiltradas = materias.filter(materia => {
            return materia.curso === req.body.curso
        })

        if (materiasFiltradas.length === 0) {
            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o curso", object: [] })
        }
        logger.info('sending all materias from curso...');
        res.send({ sucess: true, message: "Matérias buscadas com sucesso", object: materiasFiltradas })
    } catch (error) {
        res.send({ sucess: false, message: "Ocorreu um erro ao buscar: " + error, object: [] })
    }
}

controller.updateMateria = async (req, res) => {
    validadeMateria(req.body);
    
    let materiaToUpdate = Materia.findOne({ nome: req.body.nome })
    if (materiaToUpdate.length === 0) {
        res.send({ sucess: false, message: "Nenhuma matéria encontrada para o nome", object: [] })
    }

    try {
        materiaToUpdate = req.body
        const updatedMateria = await Materia.updateMateria(materiaToUpdate);
        logger.info('Updating materia...');
        res.send({ sucess: true, message: "Atualizado com sucesso", object: updatedMateria });
    }
    catch (err) {
        logger.error('Error in getting materias- ' + err);
        res.send({ sucess: false, message: "Erro ao atualizar: " + err, object: [] });
    }
}

controller.addMateria = async (req, res) => {
    validadeMateria(req.body);

    let materiaToAdd = Materia({
        nome: req.body.nome,
        curso: req.body.curso,
        professor: req.body.professor,
        fase: req.body.fase,
        sala: req.body.sala,
        bloco: req.body.bloco,
        dia: req.body.dia,
        urlImg: req.body.urlImg
    });
    try {
        const savedMateria = await Materia.addMateria(materiaToAdd);
        logger.info('Adding materia...');
        res.send({ sucess: true, message: "Adicionado com sucesso", object: savedMateria });
    }
    catch (err) {
        logger.error('Error in getting materias- ' + err);
        res.send({ sucess: false, message: "Erro ao adicionar: " + err, object: [] });
    }
}

controller.deleteMateria = async (req, res) => {
    let nomeMateria = req.body.nome;
    try {
        const removedMateria = await Materia.removeMateria(nomeMateria);
        logger.info('Deleted Materia- ' + removedMateria);
        res.send({ sucess: true, message: "Removido com sucesso", object: removedMateria });
    }
    catch (err) {
        logger.error('Failed to delete materia- ' + err);
        res.send({ sucess: false, message: "Erro ao deletar" + err, object: [] });
    }
}

export default controller;