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
            message: "�� ������� ������� �������"
        });
    }
}

export const deleteRoute = async (req, res) => {
    try {
        const route = await Route.findByIdAndDelete(req.params.id);

        if (!route) {
            res.status(404).json({
                error: true,
                message: "������� �� ������"
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
            message: "�� ������� ������� �������"
        });
    }
}

export const getAllRoutes = async (req, res) => {
    try {
        const routes = await Route.find();

        let response = [];

        routes.forEach(el =>
            response = [
                ...response,
                {
                    _id: el.id,
                    name: el.name
                }
            ]
        );

        res.json([
            ...response
        ]);
    } catch (e) {
        console.log(e);
        res.status(500).json({
            error: true,
            message: "�� ������� �������� ��������"
        });
    }
}


export const updateRoute = async (req, res) => {

try {
    const doc = new Route({
        name: req.body.name,
        path: req.body.path
    });
const updatedRoute = await Route.findByIdAndUpdate(req.params.id, doc, { new: true });

if (!updatedRoute) {
    res.status(404).json({
        error: true,
        message: "������� �� �������"
    });
    return;
}

res.json({
    ...updatedRoute._doc
});
} catch (e) {
    console.log(e);
    res.status(500).json({
        error: true,
        message: "�� ������� �������� ��������"
    });
}
}

export const getRouteById = async (req, res) => {




     //catch (e) {
     //   console.log(e);
     //   res.status(500).json({
     //       error: true,
     //       message: "�� ������� �������� �������"
     //   });
}