import Stop from "../models/StopSchema.js";
import Route from "../models/RouteSchema.js";

export const createStop = async (req, res) => {
    try {
        const doc = new Stop({
            name: req.body.name
        });

        const stop = await doc.save();

        res.json({
            ...stop._doc
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: true,
            message: "Не удалось создать остановку"
        });
    }
}


//export const deleteStop = async (req, res) => {

//}


export const getAllStops = async (req, res) => {
    try {
        const stops = await Stop.find();

        res.json([
            ...stops
        ]);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: true,
            message: "Не удалось получить остановки"
        });
    }
}


export const getStopById = async (req, res) => {
    try {
        const stop = await Stop.findById(req.params.id);

        if (!stop) {
            res.status(404).json({
                error: true,
                message: "Остановка не найдена"
            })
            return;
        }

        res.json({
            ...stop._doc
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: true,
            message: "Не удалось получить остановку"
        });
    }
}


//export const updatePost = async (req, res) => {

//}

