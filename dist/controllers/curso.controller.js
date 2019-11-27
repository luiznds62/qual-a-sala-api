'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _curso = require('../models/curso.model');

var _curso2 = _interopRequireDefault(_curso);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

function validate(curso) {
    if (!curso.name) {
        res.send({ sucess: false, message: "Nome não informado", object: [] });
    }
}

controller.getAll = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var cursos;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _curso2.default.find();

                    case 3:
                        cursos = _context.sent;

                        _appLogger2.default.info('sending all cursos...');
                        res.send({ sucess: true, message: "Cursos retornadas com sucesso", object: cursos });
                        _context.next = 12;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        _appLogger2.default.error('Error in getting cursos- ' + _context.t0);
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

controller.addCurso = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var cursoToAdd, savedCurso;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        validate(req.body);

                        cursoToAdd = (0, _curso2.default)({
                            name: req.body.name
                        });
                        _context2.prev = 2;
                        _context2.next = 5;
                        return _curso2.default.create(cursoToAdd);

                    case 5:
                        savedCurso = _context2.sent;

                        _appLogger2.default.info('Adding curso...');
                        res.send({ sucess: true, message: "Adicionado com sucesso", object: savedCurso });
                        _context2.next = 14;
                        break;

                    case 10:
                        _context2.prev = 10;
                        _context2.t0 = _context2['catch'](2);

                        _appLogger2.default.error('Error in saving curso- ' + _context2.t0);
                        res.send({ sucess: false, message: "Erro ao adicionar: " + _context2.t0, object: [] });

                    case 14:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[2, 10]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

exports.default = controller;