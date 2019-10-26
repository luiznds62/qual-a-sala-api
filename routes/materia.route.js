import express from 'express'
import materiaController from '../controllers/materia.controller'
import authMiddleware from '../middlewares/AuthMiddleware'

const router = express.Router()

router.use(authMiddleware);

router.get('/', (req, res) => {
    materiaController.getAll(req, res);
});

router.put('/', (req, res) => {
    materiaController.updateMateria(req, res);
})

router.post('/', (req, res) => {
    materiaController.addMateria(req, res);
});

router.delete('/', (req, res) => {
    materiaController.deleteMateria(req, res);
});

export default router;