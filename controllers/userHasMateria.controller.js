import Materia from '../models/materia.model'
import User from '../models/user.model'
import UserHasMateria from '../models/userHasMateria.model'
import logger from '../core/logger/app-logger'

const controller = {};

controller.addMateriasToUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.user });
        const materias = req.body.materias
        logger.info('adding all materias to users...');
        const materiaUserCreated = UserHasMateria.create({ user: user, materias: materias })

        res.send({ sucess: true, message: "Materias alocadas ao usuário com sucesso", object: materiaUserCreated });
    } catch (error) {
        logger.info('error in adding all materias to users...');
        res.send({ sucess: false, message: "Ocorreu um erro ao salvar: " + error, object: [] })
    }
}

controller.addOneMateriaToUser = async (req, res) => {
    try {
        let userHasMaterias = await UserHasMateria.findOne({ user: req.body.user })
        userHasMaterias.materias.push(req.body.materia);

        const updatedUserHasMateria = await UserHasMateria.update(userHasMaterias)

        res.send({ sucess: true, message: "Materia atualizada ao usuário com sucesso", object: updatedUserHasMateria });
    } catch (error) {
        logger.info('error in adding materias to users...');
        res.send({ sucess: false, message: "Ocorreu um erro ao atualizar: " + error, object: [] })
    }
}

controller.getAllMateriasOfUser = async (req, res) => {
    try {
        const userHasMaterias = await UserHasMateria.findOne({ user: req.body.user }).populate('user');
        logger.info('sending all materias to user...');
        if (!userHasMaterias) {
            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o usuário", object: [] })
        }

        res.send({ sucess: true, message: "Matérias encontradas com sucesso", object: userHasMaterias })
    } catch (error) {
        logger.info('error sending all materias to users...');
        res.send({ sucess: false, message: "Falha ao buscar: " + error, object: [] })
    }
}

controller.getMateriaFromDayFromUser = async (req, res) => {
    try {
        const userHasMaterias = await UserHasMateria.findOne({ user: req.body.user}).populate('user');
        if (!userHasMaterias) {
            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o usuário", object: [] })
        }
        logger.info('sending all materias to user...');

        const materiaFromDayAndUser = await Materia.findOne({_id: userHasMaterias.materias[0], dia: req.body.dia})
        if(!materiaFromDayAndUser){
            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o usuário", object: [] })
        }
        res.send({ sucess: true, message: "Matéria encontrada com sucesso", object: materiaFromDayAndUser })
    } catch (error) {
        logger.info('error sending all materias to users...');
        res.send({ sucess: false, message: "Falha ao buscar: " + error, object: [] })
    }
}

controller.removeMateriaFromUser = async (req, res) => {
    try {
        let userHasMaterias = await UserHasMateria.findOne({ user: req.body.user });
        for (var i = 0; i < userHasMaterias.materias.length; i++) {
            if (userHasMaterias.materias[i] === req.body.materia) {
                userHasMaterias.materias.splice(i, 1)
            }
        }
        const removedMateriaFromUser = await UserHasMateria.update(userHasMaterias);
        res.send({ sucess: true, message: "Matéria removida com sucesso do usuário", object: removedMateriaFromUser })
    } catch (error) {
        res.send({ sucess: false, message: "Ocorreu um erro ao remover: " + error, object: [] });
    }
}


export default controller