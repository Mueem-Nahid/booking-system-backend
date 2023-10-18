import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/auth.validation';
import { AuthController } from '../auth/auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router: Router = express.Router();

router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AuthValidation.createAdminZodSchema),
  AuthController.createUser
);

export const AdminRoutes = router;
