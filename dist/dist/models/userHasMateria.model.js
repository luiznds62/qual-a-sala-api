'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var UserHasMateriaSchema = _mongoose2.default.Schema({
    user: {
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
        unique: true
    },
    materias: {
        type: Object,
        of: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'UserHasMateria' });

var UserHasMateria = _mongoose2.default.model('UserHasMateria', UserHasMateriaSchema);

exports.default = UserHasMateria;