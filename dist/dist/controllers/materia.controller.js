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

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var controller = {};

function validadeMateria(materia) {
    if (!materia.nome) {
        res.send({ sucess: false, message: "Nome não informado", object: [] });
    }

    if (!materia.curso) {
        res.send({ sucess: false, message: "Curso não informado", object: [] });
    }

    if (!materia.professor) {
        res.send({ sucess: false, message: "Professor não informado", object: [] });
    }

    if (!materia.fase) {
        res.send({ sucess: false, message: "Fase não informada", object: [] });
    }

    if (!materia.sala) {
        res.send({ sucess: false, message: "Sala não informada", object: [] });
    }

    if (!materia.bloco) {
        res.send({ sucess: false, message: "Bloco não informado", object: [] });
    }

    if (!materia.urlImg) {
        res.send({ sucess: false, message: "Imagem não informado", object: [] });
    }
}

controller.getAll = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var materias;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _materia2.default.getAll();

                    case 3:
                        materias = _context.sent;

                        _appLogger2.default.info('sending all materias...');
                        res.send({ sucess: true, message: "Materias retornadas com sucesso", object: materias });
                        _context.next = 12;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        _appLogger2.default.error('Error in getting materias- ' + _context.t0);
                        res.send({ sucess: false, message: "Erro ao buscar: " + _context.t0, object: [] });

                    case 12:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 8]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();

controller.getById = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var materias;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _materia2.default.findOne({ _id: req.body.id });

                    case 3:
                        materias = _context2.sent;

                        _appLogger2.default.info('sending materias...');
                        res.send({ sucess: true, message: "Materia retornada com sucesso", object: materias });
                        _context2.next = 12;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](0);

                        _appLogger2.default.error('Error in getting materias- ' + _context2.t0);
                        res.send({ sucess: false, message: "Erro ao buscar: " + _context2.t0, object: [] });

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 8]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

controller.getMateriaFromCursoEFase = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var materias, materiasFiltradas;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _materia2.default.getAll();

                    case 3:
                        materias = _context3.sent;

                        if (materias.length === 0) {
                            res.send({ sucess: false, message: "Nenhuma matéria encontrada", object: [] });
                        }

                        materiasFiltradas = materias.filter(function (materia) {
                            return materia.curso === req.body.curso;
                        });

                        if (materiasFiltradas.length === 0) {
                            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o curso", object: [] });
                        }

                        materiasFiltradas = materiasFiltradas.filter(function (materia) {
                            return materia.fase === req.body.fase;
                        });

                        if (materiasFiltradas.length === 0) {
                            res.send({ sucess: false, message: "Nenhuma matéria encontrada do curso para a fase", object: [] });
                        }

                        _appLogger2.default.info('sending all materias from curso...');
                        res.send({ sucess: true, message: "Matérias buscadas com sucesso", object: materiasFiltradas });
                        _context3.next = 16;
                        break;

                    case 13:
                        _context3.prev = 13;
                        _context3.t0 = _context3['catch'](0);

                        res.send({ sucess: false, message: "Ocorreu um erro: " + _context3.t0, object: [] });

                    case 16:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 13]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

controller.getMateriaFromCurso = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var materias, materiasFiltradas;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return _materia2.default.getAll();

                    case 3:
                        materias = _context4.sent;

                        if (materias.length === 0) {
                            res.send({ sucess: false, message: "Nenhuma matéria encontrada", object: [] });
                        }

                        materiasFiltradas = materias.filter(function (materia) {
                            return materia.curso === req.body.curso;
                        });

                        if (materiasFiltradas.length === 0) {
                            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o curso", object: [] });
                        }
                        _appLogger2.default.info('sending all materias from curso...');
                        res.send({ sucess: true, message: "Matérias buscadas com sucesso", object: materiasFiltradas });
                        _context4.next = 14;
                        break;

                    case 11:
                        _context4.prev = 11;
                        _context4.t0 = _context4['catch'](0);

                        res.send({ sucess: false, message: "Ocorreu um erro ao buscar: " + _context4.t0, object: [] });

                    case 14:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 11]]);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}();

controller.updateMateria = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var materiaToUpdate, updatedMateria;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        validadeMateria(req.body);

                        materiaToUpdate = _materia2.default.findOne({ nome: req.body.nome });

                        if (materiaToUpdate.length === 0) {
                            res.send({ sucess: false, message: "Nenhuma matéria encontrada para o nome", object: [] });
                        }

                        _context5.prev = 3;

                        materiaToUpdate = req.body;
                        _context5.next = 7;
                        return _materia2.default.updateMateria(materiaToUpdate);

                    case 7:
                        updatedMateria = _context5.sent;

                        _appLogger2.default.info('Updating materia...');
                        res.send({ sucess: true, message: "Atualizado com sucesso", object: updatedMateria });
                        _context5.next = 16;
                        break;

                    case 12:
                        _context5.prev = 12;
                        _context5.t0 = _context5['catch'](3);

                        _appLogger2.default.error('Error in getting materias- ' + _context5.t0);
                        res.send({ sucess: false, message: "Erro ao atualizar: " + _context5.t0, object: [] });

                    case 16:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[3, 12]]);
    }));

    return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
    };
}();

controller.addMateria = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
        var materiaToAdd, savedMateria;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        validadeMateria(req.body);

                        materiaToAdd = (0, _materia2.default)({
                            nome: req.body.nome,
                            curso: req.body.curso,
                            professor: req.body.professor,
                            fase: req.body.fase,
                            sala: req.body.sala,
                            bloco: req.body.bloco,
                            dia: req.body.dia,
                            urlImg: req.body.urlImg
                        });
                        _context6.prev = 2;
                        _context6.next = 5;
                        return _materia2.default.addMateria(materiaToAdd);

                    case 5:
                        savedMateria = _context6.sent;

                        _appLogger2.default.info('Adding materia...');
                        res.send({ sucess: true, message: "Adicionado com sucesso", object: savedMateria });
                        _context6.next = 14;
                        break;

                    case 10:
                        _context6.prev = 10;
                        _context6.t0 = _context6['catch'](2);

                        _appLogger2.default.error('Error in getting materias- ' + _context6.t0);
                        res.send({ sucess: false, message: "Erro ao adicionar: " + _context6.t0, object: [] });

                    case 14:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[2, 10]]);
    }));

    return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}();

controller.deleteMateria = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(req, res) {
        var nomeMateria, removedMateria;
        return _regenerator2.default.wrap(function _callee7$(_context7) {
            while (1) {
                switch (_context7.prev = _context7.next) {
                    case 0:
                        nomeMateria = req.body.nome;
                        _context7.prev = 1;
                        _context7.next = 4;
                        return _materia2.default.removeMateria(nomeMateria);

                    case 4:
                        removedMateria = _context7.sent;

                        _appLogger2.default.info('Deleted Materia- ' + removedMateria);
                        res.send({ sucess: true, message: "Removido com sucesso", object: removedMateria });
                        _context7.next = 13;
                        break;

                    case 9:
                        _context7.prev = 9;
                        _context7.t0 = _context7['catch'](1);

                        _appLogger2.default.error('Failed to delete materia- ' + _context7.t0);
                        res.send({ sucess: false, message: "Erro ao deletar" + _context7.t0, object: [] });

                    case 13:
                    case 'end':
                        return _context7.stop();
                }
            }
        }, _callee7, undefined, [[1, 9]]);
    }));

    return function (_x13, _x14) {
        return _ref7.apply(this, arguments);
    };
}();

exports.default = controller;