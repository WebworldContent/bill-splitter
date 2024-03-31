import { Router } from "express";
import { addGroup, getGroup } from "../controllers/groupController.js";

const groupRoute = Router();

groupRoute.post('/add', addGroup)
groupRoute.get('/get/:groupId', getGroup);

export default groupRoute;