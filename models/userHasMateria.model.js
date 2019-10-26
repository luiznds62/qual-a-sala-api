import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserHasMateriaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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

const UserHasMateria = mongoose.model('UserHasMateria', UserHasMateriaSchema);

export default UserHasMateria;