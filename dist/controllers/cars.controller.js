'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _cars = require('../models/cars.model');

var _cars2 = _interopRequireDefault(_cars);

var _appLogger = require('../core/logger/app-logger');

var _appLogger2 = _interopRequireDefault(_appLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controller = {};

controller.getAll = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var cars;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _cars2.default.getAll();

                    case 3:
                        cars = _context.sent;

                        _appLogger2.default.info('sending all cars...');
                        res.send(cars);
                        _context.next = 12;
                        break;

                    case 8:
                        _context.prev = 8;
                        _context.t0 = _context['catch'](0);

                        _appLogger2.default.error('Error in getting cars- ' + _context.t0);
                        res.send('Got error in getAll');

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

controller.addCar = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var carToAdd, savedCar;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        carToAdd = (0, _cars2.default)({
                            name: req.body.name
                        });
                        _context2.prev = 1;
                        _context2.next = 4;
                        return _cars2.default.addCar(carToAdd);

                    case 4:
                        savedCar = _context2.sent;

                        _appLogger2.default.info('Adding car...');
                        res.send('added: ' + savedCar);
                        _context2.next = 13;
                        break;

                    case 9:
                        _context2.prev = 9;
                        _context2.t0 = _context2['catch'](1);

                        _appLogger2.default.error('Error in getting cars- ' + _context2.t0);
                        res.send('Got error in getAll');

                    case 13:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 9]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}();

controller.deleteCar = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var carName, removedCar;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        carName = req.body.name;
                        _context3.prev = 1;
                        _context3.next = 4;
                        return _cars2.default.removeCar(carName);

                    case 4:
                        removedCar = _context3.sent;

                        _appLogger2.default.info('Deleted Car- ' + removedCar);
                        res.send('Car successfully deleted');
                        _context3.next = 13;
                        break;

                    case 9:
                        _context3.prev = 9;
                        _context3.t0 = _context3['catch'](1);

                        _appLogger2.default.error('Failed to delete car- ' + _context3.t0);
                        res.send('Delete failed..!');

                    case 13:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 9]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}();

exports.default = controller;