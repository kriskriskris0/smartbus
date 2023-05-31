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
