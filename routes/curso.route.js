import express from 'express'
import cursoController from '../controllers/curso.controller'
import authMiddleware from '../middlewares/AuthMiddleware'

const router = express.Router()

router.use(authMiddleware);

router.get('/', (req, res) => {
    cursoController.getAll(req, res);
});

router.post('/', (req, res) => {
    cursoController.addCurso(req, res);
});

export default router;