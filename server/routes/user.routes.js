import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

// //////////////////////////////// GET Requests ////////////////////////////////

// GET all users
router.route('/users').get(UserController.getUsers);

// GET user by userId
router.route('/user/:userId').get(UserController.getUser);

// GET username by userId
router.route('/user/:userId/username').get(UserController.getUserUsername);

// GET first_name by userId
router.route('/user/:userId/first_name').get(UserController.getUserFirstName);

// GET last_name by userId
router.route('/user/:userId/last_name').get(UserController.getUserLastName);

// GET password by userId
router.route('/user/:userId/password').get(UserController.getUserPassword);

// GET email by userId
router.route('/user/:userId/email').get(UserController.getUserEmail);

// GET email_is_verified by userId
router.route('/user/:userId/email_is_verified').get(UserController.getUserEmailIsVerified);

// GET signup_date by userId
router.route('/user/:userId/signup_date').get(UserController.getUserSignupDate);

// GET last_user_interaction by userId
router.route('/user/:userId/last_user_interaction').get(UserController.getUserLastUserInteraction);

// GET social information by userId
router.route('/user/:userId/social').get(UserController.getUserSocial);

// GET notification_list by userId
router.route('/user/:userId/notification_list').get(UserController.getUserNotificationList);

// GET notification_preferences by userId
router.route('/user/:userId/notification_preferences').get(UserController.getUserNotificationPreferences);

// GET security by userId
router.route('/user/:userId/security').get(UserController.getUserSecurity);

// //////////////////////////////// PUT Requests ////////////////////////////////
// PUT username by userId
router.route('/user/:userId/username').put(UserController.putUserUsername);

// PUT first_name by userId
router.route('/user/:userId/first_name').put(UserController.putUserFirstName);

// PUT last_name by userId
router.route('/user/:userId/last_name').put(UserController.putUserLastName);

// PUT password by userId
router.route('/user/:userId/password').put(UserController.putUserPassword);

// PUT email by userId
router.route('/user/:userId/email').put(UserController.putUserEmail);

// PUT email_is_verified by userId
router.route('/user/:userId/email_is_verified').put(UserController.putUserEmailIsVerified);

// PUT last_user_interaction by userId
router.route('/user/:userId/last_user_interaction').put(UserController.putUserLastUserInteraction);

// // PUT social information by userId
// router.route('/user/:userId/social').put(UserController.putUserSocial);

// // PUT notification_preferences by userId
// router.route('/user/:userId/notification_preferences').put(UserController.putUserNotificationPreferences);

// // PUT security by userId
// router.route('/user/:userId/security').put(UserController.putUserSecurity);

// //////////////////////////////// POST Requests ////////////////////////////////

// POST a new user
router.route('/user').post(UserController.postNewUser);

// //////////////////////////////// DELETE Requests ////////////////////////////////

// DELETE a new user
router.route('/user/:userId').delete(UserController.deleteUser);

export default router;
