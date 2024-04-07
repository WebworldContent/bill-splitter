import express from "express";
import cors from "cors";
import groupRoute from "./routes/group.js";
import paymentInfoRoute from "./routes/paymentInfo.js";

const app = express();
const PORT = process.env.PORT || 3001
app.use(cors());
app.use(express.json());

app.use('/', (req, res) => {
    res.send({info: "hello world"});
});

app.use('/group', groupRoute);
app.use('/payment', paymentInfoRoute);

app.listen(PORT, () => console.log('listing on PORT : ', PORT));