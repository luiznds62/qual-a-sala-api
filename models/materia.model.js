import mongoose from 'mongoose';

const MateriaSchema = mongoose.Schema({
    nome: { type: String, required: true, unique: true, index: true },
    curso: { type: String, required: true },
    professor: { type: String, required: true },
    fase: { type: String, required: true },
    sala: { type: String, required: true },
    bloco: { type: String, required: true },
    urlImg: { type: String, required: true }
}, { collection: 'Materia' });

let MateriaModel = mongoose.model('Materia', MateriaSchema);

MateriaModel.getAll = () => {
    return MateriaModel.find({});
}

MateriaModel.updateMateria = (materia) => {
    return MateriaModel.updateOne(materia);
}

MateriaModel.addMateria = (materia) => {
    return MateriaModel.create(materia)
}

MateriaModel.removeMateria = (nomeMateria) => {
    return MateriaModel.remove({ nome: nomeMateria });
}

export default MateriaModel;