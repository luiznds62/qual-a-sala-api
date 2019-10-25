'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarSchema = _mongoose2.default.Schema({
    name: { type: String, required: true, unique: true, index: true }
}, { collection: 'Car' });

var CarsModel = _mongoose2.default.model('Car', CarSchema);

CarsModel.getAll = function () {
    return CarsModel.find({});
};

CarsModel.addCar = function (carToAdd) {
    return carToAdd.save();
};

CarsModel.removeCar = function (carName) {
    return CarsModel.remove({ name: carName });
};

exports.default = CarsModel;