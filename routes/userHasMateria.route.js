import express from 'express'
import userHasMaterialController from '../controllers/userHasMateria.controller'
import authMiddleware from '../middlewares/AuthMiddleware'

const router = express.Router()

router.use(authMiddleware);

router.get('/', (req, res) => {

});

router.put('/', (req, res) => {

})

router.post('/', (req, res) => {
    userHasMaterialController.addMateriasToUser(req, res);
});

router.delete('/', (req, res) => {

});

export default router;