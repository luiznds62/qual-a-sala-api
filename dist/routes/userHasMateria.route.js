'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userHasMateria = require('../controllers/userHasMateria.controller');

var _userHasMateria2 = _interopRequireDefault(_userHasMateria);

var _AuthMiddleware = require('../middlewares/AuthMiddleware');

var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.use(_AuthMiddleware2.default);

router.post('/user', function (req, res) {
    _userHasMateria2.default.getAllMateriasOfUser(req, res);
});

router.post('/dia', function (req, res) {
    _userHasMateria2.default.getMateriaFromDayFromUser(req, res);
});

router.put('/', function (req, res) {});

router.post('/single', function (req, res) {
    _userHasMateria2.default.addOneMateriaToUser(req, res);
});

router.post('/', function (req, res) {
    _userHasMateria2.default.addMateriasToUser(req, res);
});

router.delete('/materia', function (req, res) {
    _userHasMateria2.default.removeMateriaFromUser(req, res);
});

exports.default = router;