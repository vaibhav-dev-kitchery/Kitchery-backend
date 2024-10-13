import { Router } from "express";
import { registerUser, changeUserName, updateAvatarLink } from "../controllers/userCredentials.controller.js";


const router = Router()


//routes
router.route('/register').post(registerUser);
router.route('/changeUserName').post(changeUserName);
router.route('/updateAvatar').post(updateAvatarLink);


//export routes
export default router