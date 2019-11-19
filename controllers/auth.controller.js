import User from '../models/user.model'
import authConfig from '../config/auth.json'
import logger from '../core/logger/app-logger'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const controller = {};

function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

controller.register = async (req, res) => {
    const { email } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send({ sucess: false, message: 'Email já utilizado', object: [] })
        }

        if (!validateEmail(email)) {
            return res.status(400).send({ sucess: false, message: 'Email inválido', object: [] })
        }

        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({ sucess: true, message: "Usuário registrado com sucesso", object: { user, token: generateToken({ id: user.id }) } })
    } catch (err) {
        return res.status(400).send({ sucess: false, message: "Erro ao cadastrar: " + err, object: [] });
    }
}

controller.authenticate = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: '' });
    }
    if (!await bcrypt.compare(password, user.password)) {
        res.status(400).send({ sucess: false, message: "Senha inválida", object: '' });
    }
    user.password = undefined;

    res.send({ sucess: true, message: "Login realizado com sucesso", object: { user, token: generateToken({ id: user.id }) } });
}

controller.createUser = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: '' })
        }
        res.send({ sucess: true, message: "Usuário buscado com sucesso", object: user });
    } catch (err) {
        res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: '' });
    }
}

controller.addFaseCursoToUser = async (req, res) => {
    const email = req.body.email
    try {
        let userToUpdate = await User.findOne({ email });
        if (!userToUpdate) {
            res.send({ sucess: false, message: "Usuário não encontrado", object: [] })
        }
        userToUpdate.fase = req.body.fase
        userToUpdate.curso = req.body.curso
        const userUpdated = await User.updateOne({ _id: userToUpdate._id }, {
            curso: req.body.curso,
            fase: req.body.fase
        });
        res.send({ sucess: true, message: "Dados atualizados com sucesso", object: userUpdated })
    } catch (error) {
        res.send({ sucess: false, message: "Ocorreu um erro: " + error, object: [] })
    }
}

controller.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.id })
        if (!user) {
            res.send({ sucess: false, message: "Nenhum usuário encontrado", object: [] })
        }

        res.send({ sucess: true, message: "Usuário encontrado com sucesso", object: user })
    } catch (error) {
        res.send({ sucess: false, message: "Ocorreu um erro", object: [] })
    }
}

controller.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: [] })
        }

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1);
        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            to: email,
            from: 'luiznds62@gmail.com',
            template: 'auth/forgot_password',
            context: { token }
        }, (err) => {
            if (err) {
                return res.status(400).send({ sucess: false, message: "Não foi possível enviar o email de esqueceu sua senha", object: [] })
            }
            return res.send();
        });
    } catch (err) {
        res.status(400).send({ sucess: false, message: "Erro ao esqueceu a senha, tente novamente", object: [] })
    }
}

controller.resetPassword = async (req, res) => {
    const { email, token, password } = req.body;

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if (!user) {
            return res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: [] })
        }

        if (token !== user.passwordResetToken) {
            return res.status(400).send({ sucess: false, message: "Token inválido", object: [] })
        }

        const now = new Date();

        if (now > user.passwordResetExpires) {
            return res.status(400).send({ sucess: false, message: "Token expirado", object: [] })
        }

        user.password = password;
        await user.save();
        res.send({ sucess: true, message: "Senha resetada com sucesso", object: [] });
    } catch (err) {
        res.status(400).send({ sucess: false, message: "Não é possível resetar a senha", object: [] })
    }
}

export default controller;