import { Router } from "express";
import { addGroup } from "../controllers/groupController.js";

const groupRoute = Router();

groupRoute.post('/add', addGroup)

export default groupRoute;