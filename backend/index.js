import express from "express";
import cors from "cors";
import groupRoute from "./routes/group.js";

const app = express();
const PORT = process.env.PORT || 3001
app.use(cors());
app.use(express.json());

app.use('/group', groupRoute);

app.listen(PORT, () => console.log('listing on PORT : ', PORT));