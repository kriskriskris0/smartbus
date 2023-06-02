import { Router } from "express";
import { createStop, deleteStop, getAllStops, getStopById, updatePost } from "./controllers/StopController.js";
import { createRoute, deleteRoute, getAllRoutes, getRouteById, updateRoute } from "./controllers/RouteController.js";

const router = new Router();

router.get('/stop', getAllStops);
router.get('/stop/:id', getStopById);
router.post('/stop', createStop);
router.delete('/stop/:id', deleteStop);
router.put('/stop/:id', updatePost);

router.get('/route', getAllRoutes);
router.get('/route/:id', getRouteById);
router.post('/route', createRoute);
router.delete('/route/:id', deleteRoute);
router.put('/route/:id', updateRoute);

export default router;