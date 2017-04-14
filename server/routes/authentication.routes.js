import { Router } from 'express';
import * as AuthenticationController from '../controllers/authentication.controller';
const router = new Router();

// //////////////////////////////// GET Requests ////////////////////////////////
router.route('/check_auth').get(AuthenticationController.checkAuth);

// //////////////////////////////// POST Requests ////////////////////////////////
router.route('/login').post(AuthenticationController.login);

router.route('/sign_up').post(AuthenticationController.signUp);

router.route('/logout').post(AuthenticationController.logout);

export default router;
