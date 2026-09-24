import express from 'express';
import { userRegister, userLogin,userLogout, getMyProfile} from '../controllers/user.controllers.js';
import { isAuthenticated } from '../middlewares/auth.js';




const router = express.Router();

router.get('/', (req, res)=>{
    res.json({ 
        success: true,
        message: 'Hello home route server'
    });
});


router.post('/register', userRegister);

router.post('/login', userLogin);

router.get('/logout', userLogout);
router.get('/myprofile', isAuthenticated, getMyProfile); 

export default router; 