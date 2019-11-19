import express from 'express';
import userHasMaterialController from '../controllers/userHasMateria.controller';
import authMiddleware from '../middlewares/AuthMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/user', (req, res) => {
    userHasMaterialController.getAllMateriasOfUser(req, res);
});

router.post('/dia', (req, res) => {
    userHasMaterialController.getMateriaFromDayFromUser(req, res);
});

router.put('/', (req, res) => {

});

router.patch('/', (req, res) => {
    userHasMaterialController.addOneMateriaToUser(req, res);
});

router.post('/', (req, res) => {
    userHasMaterialController.addMateriasToUser(req, res);
});

router.delete('/materia', (req, res) => {
    userHasMaterialController.removeMateriaFromUser(req, res);
});

export default router;