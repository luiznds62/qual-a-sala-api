import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserHasMateriaSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    materias: {
        type: Map,
        of: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { collection: 'UserHasMateria' });

const UserHasMateria = mongoose.model('UserHasMateria', UserHasMateriaSchema);

export default UserHasMateria;