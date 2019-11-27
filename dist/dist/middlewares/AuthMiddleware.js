"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray2 = require("babel-runtime/helpers/slicedToArray");

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _auth = require("../config/auth.json");

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = function (req, res, next) {
    var authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: "Nenhum token informado" });
    }

    var parts = authHeader.split(' ');
    if (!parts.length === 2) {
        return res.status(401).send({ error: "Token com erro" });
    }

    var _parts = (0, _slicedToArray3.default)(parts, 2),
        scheme = _parts[0],
        token = _parts[1];

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: "Token em formato inválido" });
    }

    _jsonwebtoken2.default.verify(token, _auth2.default.secret, function (err, decoded) {
        if (err) {
            return res.status(401).send({ error: "Token inválido" });
        }

        req.userId = decoded.id;
        return next();
    });
};