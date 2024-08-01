import { Router } from "express";
import {registerUser,loginUser,logOutUser} from "../controllers/user.controllers.js" 
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const   router=Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logOutUser)
router.post('/charge', async (req, res) => {
    try {
      const { amount, token } = req.body;
      const paymentResponse = await handlePayment(amount, token);
      res.status(200).json(paymentResponse);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Payment failed' });
    }
  });

export default router