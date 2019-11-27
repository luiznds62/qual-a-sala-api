'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _curso = require('../controllers/curso.controller');

var _curso2 = _interopRequireDefault(_curso);

var _AuthMiddleware = require('../middlewares/AuthMiddleware');

var _AuthMiddleware2 = _interopRequireDefault(_AuthMiddleware);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express2.default.Router();

router.use(_AuthMiddleware2.default);

router.get('/', function (req, res) {
    _curso2.default.getAll(req, res);
});

router.post('/', function (req, res) {
    _curso2.default.addCurso(req, res);
});

exports.default = router;