import mongoose from "mongoose";
import Route from "../models/RouteSchema.js";
import { getStopById } from "./StopController.js";
import Stop from "../models/StopSchema.js";

export const createRoute = async (req, res) => {
    try {
        const doc = new Route({
            name: req.body.name,
            path: req.body.path
        });

        const route = await doc.save();

        res.json({
            ...route._doc
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: true,
            message: "Не удалось создать маршрут"
        });
    }
}

export const deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);

        if (!route) {
            res.status(404).json({
                error: true,
                message: "Маршрут не найден"
            })
            return;
        }

        res.json({
            ...route._doc
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: true,
            message: "Не удалось удалить маршрут"
        });
    }
}