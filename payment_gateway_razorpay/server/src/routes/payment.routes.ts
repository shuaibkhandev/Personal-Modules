import {Router} from "express";
import {createPayment} from "../controllers/payment.controller";
import { validate } from "../middleware/validate";
import { createPaymentSchema } from "../validations/payment.validation";


const router = Router();


router.post("/", validate(createPaymentSchema), createPayment);


export default router;