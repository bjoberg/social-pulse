import { Router } from 'express';
import * as AuthenticationController from '../controllers/authentication.controller';
const router = new Router();

// //////////////////////////////// GET Requests ////////////////////////////////
router.route('/check_auth').get(AuthenticationController.checkAuth);

router.route('/logout').get(AuthenticationController.logout);

// //////////////////////////////// POST Requests ////////////////////////////////
router.route('/login').post(AuthenticationController.login);

export default router;
