import { Router } from "express";
import {
  addInfo,
//   getInfo,
} from "../controllers/paymentInfo.js";

const paymentInfoRoute = Router();

paymentInfoRoute.post("/add", addInfo);
// paymentInfoRoute.get("/get/:groupId", getInfo);

export default paymentInfoRoute;
