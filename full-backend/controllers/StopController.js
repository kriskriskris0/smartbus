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


export const deleteStop = async (req, res) => {
    try {
        const id = req.params.id;
        const routes = await Route.find();
        let isOk = true;

        for (let i = 0; i < routes.length && isOk; i++) {
            for (let j = 0; j < routes[i].path.length && isOk; j++) {
                if (routes[i].path[j].stop == id) {
                    isOk = false;
                }
            }
        }

        if (!isOk) {
            res.status(400)
                .json({
                    error: true,
                    message: "Не удалось удалить остановку, т.к. она используется в каком-то маршруте."
                });
            return;
        }

        const stop = await Stop.findByIdAndDelete(id);

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
            message: "Не удалось удалить остановку"
        });
    }
}


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


export const updatePost = async (req, res) => {
    try {
        const doc = new Stop({
            name: req.body.name,
            _id: req.params.id,
            __v: 0
        });

        const updatedStop = await Stop.findByIdAndUpdate(req.params.id, doc, { new: true });

        if (!updatedStop) {
            res.status(404).json({
                error: true,
                message: "Остановка не найдена"
            });
            return;
        }

        res.json({
            ...updatedStop._doc
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: true,
            message: "Не удалось получить остановку"
        });
    }
}
