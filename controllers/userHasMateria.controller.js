import Materia from '../models/materia.model'
import User from '../models/user.model'
import UserHasMateria from '../models/userHasMateria.model'
import logger from '../core/logger/app-logger'

const controller = {};

controller.addMateriasToUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.body.userId });
        const materias = req.body.materias
        logger.info('sending all materias to users...');
        const materiaUserCreated = UserHasMateria.create({ user: user, materias: materias })

        return res.send({ sucess: true, message: "Materias alocadas ao usuário com sucesso", object: materiaUserCreated });
    } catch (err) {
        return res.send({ sucess: false, message: "Ocorreu um erro ao salvar", object: [] })
    }
}

export default controller