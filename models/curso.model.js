import mongoose from 'mongoose';

const CursoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'Curso' });

const Curso = mongoose.model('Curso', CursoSchema);

export default Curso;