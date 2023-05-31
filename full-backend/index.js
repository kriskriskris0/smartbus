import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";

mongoose.set('strictQuery', false);
mongoose
    .connect("mongodb+srv://admin:admin@cluster0.9tmuugv.mongodb.net/smartbus")
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', router);

app.listen(process.env.PORT || 8080, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});