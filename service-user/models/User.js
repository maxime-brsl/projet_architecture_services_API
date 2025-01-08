import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['parieur', 'bookmaker'], default: 'parieur' },
});

// Cryptage du mot de passe avant sauvegarde
UserSchema.pre('save', async function() {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, 10);
        } catch (error) {
            throw new Error('Erreur lors du cryptage du mot de passe');
        }
    }
});

export default model('User', UserSchema);

