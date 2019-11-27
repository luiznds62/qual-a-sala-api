'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _materia = require('../models/materia.model');

var _materia2 = _interopRequireDefault(_materia);

var _user = require('../models/user.model');

var _user2 = _interopRequireDefault(_user);

var _userHasMateria = require('../models/userHasMateria.model');

var _userHasMateria2 = _interopRequireDefault(_userHasMateria);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.addMateriasToUser = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var user, materias, materiaUserCreated;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _user2.default.findById({ _id: req.body.user });

                    case 3:
                        user = _context.sent;
                        materias = req.body.materias;

                        _appLogger2.default.info('adding all materias to users...');
                        materiaUserCreated = _userHasMateria2.default.create({ user: user, materias: materias });


                        res.send({ sucess: true, message: "Materias alocadas ao usuário com sucesso", object: materiaUserCreated });
                        _context.next = 14;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](0);

                        _appLogger2.default.info('error in adding all materias to users...');
                        res.send({ sucess: false, message: "Ocorreu um erro ao salvar: " + _context.t0, object: [] });

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 10]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

controller.addOneMateriaToUser = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var userHasMaterias, updatedUserHasMateria;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _userHasMateria2.default.findOne({ user: req.body.user });

                    case 3:
                        userHasMaterias = _context2.sent;

                        userHasMaterias.materias.push(req.body.materia);

                        _context2.next = 7;
                        return _userHasMateria2.default.update(userHasMaterias);

                    case 7:
                        updatedUserHasMateria = _context2.sent;


                        res.send({ sucess: true, message: "Materia atualizada ao usuário com sucesso", object: updatedUserHasMateria });
                        _context2.next = 15;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](0);

                        _appLogger2.default.info('error in adding materias to users...');
                        res.send({ sucess: false, message: "Ocorreu um erro ao atualizar: " + _context2.t0, object: [] });

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 11]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

controller.getAllMateriasOfUser = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var userHasMaterias;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _userHasMateria2.default.findOne({ user: req.body.user }).populate('user');

                    case 3:
                        userHasMaterias = _context3.sent;

                        _appLogger2.default.info('sending all materias to user...');
                        if (!userHasMaterias) {
                            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o usuário", object: [] });
                        }

                        res.send({ sucess: true, message: "Matérias encontradas com sucesso", object: userHasMaterias });
                        _context3.next = 13;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](0);

                        _appLogger2.default.info('error sending all materias to users...');
                        res.send({ sucess: false, message: "Falha ao buscar: " + _context3.t0, object: [] });

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 9]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

controller.getMateriaFromDayFromUser = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var userHasMaterias, materiaFromDayAndUser;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return _userHasMateria2.default.findOne({ user: req.body.user }).populate('user');

                    case 3:
                        userHasMaterias = _context4.sent;

                        if (!userHasMaterias) {
                            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o usuário", object: [] });
                        }
                        _appLogger2.default.info('sending all materias to user...');

                        _context4.next = 8;
                        return _materia2.default.findOne({ _id: userHasMaterias.materias[0], dia: req.body.dia });

                    case 8:
                        materiaFromDayAndUser = _context4.sent;

                        if (!materiaFromDayAndUser) {
                            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o usuário", object: [] });
                        }
                        res.send({ sucess: true, message: "Matéria encontrada com sucesso", object: materiaFromDayAndUser });
                        _context4.next = 17;
                        break;

                    case 13:
                        _context4.prev = 13;
                        _context4.t0 = _context4['catch'](0);

                        _appLogger2.default.info('error sending all materias to users...');
                        res.send({ sucess: false, message: "Falha ao buscar: " + _context4.t0, object: [] });

                    case 17:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 13]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

controller.removeMateriaFromUser = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var userHasMaterias, i, removedMateriaFromUser;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        _context5.next = 3;
                        return _userHasMateria2.default.findOne({ user: req.body.user });

                    case 3:
                        userHasMaterias = _context5.sent;

                        for (i = 0; i < userHasMaterias.materias.length; i++) {
                            if (userHasMaterias.materias[i] === req.body.materia) {
                                userHasMaterias.materias.splice(i, 1);
                            }
                        }
                        _context5.next = 7;
                        return _userHasMateria2.default.update(userHasMaterias);

                    case 7:
                        removedMateriaFromUser = _context5.sent;

                        res.send({ sucess: true, message: "Matéria removida com sucesso do usuário", object: removedMateriaFromUser });
                        _context5.next = 14;
                        break;

                    case 11:
                        _context5.prev = 11;
                        _context5.t0 = _context5['catch'](0);

                        res.send({ sucess: false, message: "Ocorreu um erro ao remover: " + _context5.t0, object: [] });

                    case 14:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 11]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

exports.default = controller;