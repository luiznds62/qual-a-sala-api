'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _auth = require('../controllers/auth.controller');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/register', function (req, res) {
    _auth2.default.register(req, res);
});

router.post('/authenticate', function (req, res) {
    _auth2.default.authenticate(req, res);
});

router.post('/user', function (req, res) {
    _auth2.default.createUser(req, res);
});

router.post('/user/id', function (req, res) {
    _auth2.default.getUserById(req, res);
});

router.patch('/user/cursofase', function (req, res) {
    _auth2.default.addFaseCursoToUser(req, res);
});

router.post('/forgot_password', function (req, res) {
    _auth2.default.forgotPassword(req, res);
});

router.post('/reset_password', function (req, res) {
    _auth2.default.resetPassword(req, res);
});

exports.default = router;