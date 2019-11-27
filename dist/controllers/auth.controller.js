'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _auth = require('../config/auth.json');

var _auth2 = _interopRequireDefault(_auth);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

function validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
    return false;
}

function generateToken() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return _jsonwebtoken2.default.sign(params, _auth2.default.secret, {
        expiresIn: 86400
    });
}

controller.register = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var email, user;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        email = req.body.email;
                        _context.prev = 1;
                        _context.next = 4;
                        return _user2.default.findOne({ email: email });

                    case 4:
                        if (!_context.sent) {
                            _context.next = 6;
                            break;
                        }

                        return _context.abrupt('return', res.status(400).send({ sucess: false, message: 'Email já utilizado', object: [] }));

                    case 6:
                        if (validateEmail(email)) {
                            _context.next = 8;
                            break;
                        }

                        return _context.abrupt('return', res.status(400).send({ sucess: false, message: 'Email inválido', object: [] }));

                    case 8:
                        _context.next = 10;
                        return _user2.default.create(req.body);

                    case 10:
                        user = _context.sent;

                        user.password = undefined;

                        return _context.abrupt('return', res.send({ sucess: true, message: "Usuário registrado com sucesso", object: { user: user, token: generateToken({ id: user.id }) } }));

                    case 15:
                        _context.prev = 15;
                        _context.t0 = _context['catch'](1);
                        return _context.abrupt('return', res.status(400).send({ sucess: false, message: "Erro ao cadastrar: " + _context.t0, object: [] }));

                    case 18:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 15]]);
    }));

    return function (_x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

controller.authenticate = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var _req$body, email, password, user;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _req$body = req.body, email = _req$body.email, password = _req$body.password;
                        _context2.next = 3;
                        return _user2.default.findOne({ email: email }).select('+password');

                    case 3:
                        user = _context2.sent;

                        if (!user) {
                            res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: '' });
                        }
                        _context2.next = 7;
                        return _bcrypt2.default.compare(password, user.password);

                    case 7:
                        if (_context2.sent) {
                            _context2.next = 9;
                            break;
                        }

                        res.status(400).send({ sucess: false, message: "Senha inválida", object: '' });

                    case 9:
                        user.password = undefined;

                        res.send({ sucess: true, message: "Login realizado com sucesso", object: { user: user, token: generateToken({ id: user.id }) } });

                    case 11:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function (_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

controller.createUser = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var email, user;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        email = req.body.email;
                        _context3.prev = 1;
                        _context3.next = 4;
                        return _user2.default.findOne({ email: email });

                    case 4:
                        user = _context3.sent;

                        if (user) {
                            _context3.next = 7;
                            break;
                        }

                        return _context3.abrupt('return', res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: '' }));

                    case 7:
                        res.send({ sucess: true, message: "Usuário buscado com sucesso", object: user });
                        _context3.next = 13;
                        break;

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3['catch'](1);

                        res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: '' });

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 10]]);
    }));

    return function (_x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

controller.addFaseCursoToUser = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var email, userToUpdate, userUpdated;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        email = req.body.email;
                        _context4.prev = 1;
                        _context4.next = 4;
                        return _user2.default.findOne({ email: email });

                    case 4:
                        userToUpdate = _context4.sent;

                        if (!userToUpdate) {
                            res.send({ sucess: false, message: "Usuário não encontrado", object: [] });
                        }
                        userToUpdate.fase = req.body.fase;
                        userToUpdate.curso = req.body.curso;
                        _context4.next = 10;
                        return _user2.default.updateOne({ _id: userToUpdate._id }, {
                            curso: req.body.curso,
                            fase: req.body.fase
                        });

                    case 10:
                        userUpdated = _context4.sent;

                        res.send({ sucess: true, message: "Dados atualizados com sucesso", object: userUpdated });
                        _context4.next = 17;
                        break;

                    case 14:
                        _context4.prev = 14;
                        _context4.t0 = _context4['catch'](1);

                        res.send({ sucess: false, message: "Ocorreu um erro: " + _context4.t0, object: [] });

                    case 17:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[1, 14]]);
    }));

    return function (_x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();

controller.getUserById = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var user;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return _user2.default.findOne({ _id: req.body.id });

                    case 3:
                        user = _context5.sent;

                        if (!user) {
                            res.send({ sucess: false, message: "Nenhum usuário encontrado", object: [] });
                        }

                        res.send({ sucess: true, message: "Usuário encontrado com sucesso", object: user });
                        _context5.next = 11;
                        break;

                    case 8:
                        _context5.prev = 8;
                        _context5.t0 = _context5['catch'](0);

                        res.send({ sucess: false, message: "Ocorreu um erro", object: [] });

                    case 11:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 8]]);
    }));

    return function (_x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();

controller.forgotPassword = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var email, user, token, now;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        email = req.body.email;
                        _context6.prev = 1;
                        _context6.next = 4;
                        return _user2.default.findOne({ email: email });

                    case 4:
                        user = _context6.sent;

                        if (user) {
                            _context6.next = 7;
                            break;
                        }

                        return _context6.abrupt('return', res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: [] }));

                    case 7:
                        token = _crypto2.default.randomBytes(20).toString('hex');
                        now = new Date();

                        now.setHours(now.getHours() + 1);
                        _context6.next = 12;
                        return _user2.default.findByIdAndUpdate(user.id, {
                            '$set': {
                                passwordResetToken: token,
                                passwordResetExpires: now
                            }
                        });

                    case 12:

                        mailer.sendMail({
                            to: email,
                            from: 'luiznds62@gmail.com',
                            template: 'auth/forgot_password',
                            context: { token: token }
                        }, function (err) {
                            if (err) {
                                return res.status(400).send({ sucess: false, message: "Não foi possível enviar o email de esqueceu sua senha", object: [] });
                            }
                            return res.send();
                        });
                        _context6.next = 18;
                        break;

                    case 15:
                        _context6.prev = 15;
                        _context6.t0 = _context6['catch'](1);

                        res.status(400).send({ sucess: false, message: "Erro ao esqueceu a senha, tente novamente", object: [] });

                    case 18:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[1, 15]]);
    }));

    return function (_x12, _x13) {
        return _ref6.apply(this, arguments);
    };
}();

controller.resetPassword = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        var _req$body2, email, token, password, user, now;

        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        _req$body2 = req.body, email = _req$body2.email, token = _req$body2.token, password = _req$body2.password;
                        _context7.prev = 1;
                        _context7.next = 4;
                        return _user2.default.findOne({ email: email }).select('+passwordResetToken passwordResetExpires');

                    case 4:
                        user = _context7.sent;

                        if (user) {
                            _context7.next = 7;
                            break;
                        }

                        return _context7.abrupt('return', res.status(400).send({ sucess: false, message: "Usuário não encontrado", object: [] }));

                    case 7:
                        if (!(token !== user.passwordResetToken)) {
                            _context7.next = 9;
                            break;
                        }

                        return _context7.abrupt('return', res.status(400).send({ sucess: false, message: "Token inválido", object: [] }));

                    case 9:
                        now = new Date();

                        if (!(now > user.passwordResetExpires)) {
                            _context7.next = 12;
                            break;
                        }

                        return _context7.abrupt('return', res.status(400).send({ sucess: false, message: "Token expirado", object: [] }));

                    case 12:

                        user.password = password;
                        _context7.next = 15;
                        return user.save();

                    case 15:
                        res.send({ sucess: true, message: "Senha resetada com sucesso", object: [] });
                        _context7.next = 21;
                        break;

                    case 18:
                        _context7.prev = 18;
                        _context7.t0 = _context7['catch'](1);

                        res.status(400).send({ sucess: false, message: "Não é possível resetar a senha", object: [] });

                    case 21:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[1, 18]]);
    }));

    return function (_x14, _x15) {
        return _ref7.apply(this, arguments);
    };
}();

exports.default = controller;