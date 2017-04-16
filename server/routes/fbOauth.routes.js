import { Router } from 'express';
import * as fbOauthController from '../controllers/fbOauth.controller';
const router = new Router();

/////////// Get Routes /////////////
router.route('/fbOauth').get(fbOauthController.getOauth);


////////// Put Requests //////

router.route('/user/:userId/fbOauthCreate').put(fbOauthController.putOauth);