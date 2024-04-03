import { Router } from "express";
import { addGroup, getGroup, addExpenses } from "../controllers/groupController.js";

const groupRoute = Router();

groupRoute.post("/add", addGroup);
groupRoute.put("/add-expense/:groupId", addExpenses)
groupRoute.get("/get/:groupId", getGroup);

export default groupRoute;
