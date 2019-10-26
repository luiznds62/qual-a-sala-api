import express from 'express'
import authController from '../controllers/auth.controller'

const router = express.Router()

router.post('/register', (req, res) => {
    authController.register(req, res);
});

router.post('/authenticate', (req, res) => {
    authController.authenticate(req, res);
});

router.post('/user', (req, res) => {
    authController.createUser(req, res);
});

router.post('/forgot_password', (req,res) => {
    authController.forgotPassword(req, res);
});

router.post('/reset_password', (req,res) => {
    authController.resetPassword(req, res);
});

export default router;