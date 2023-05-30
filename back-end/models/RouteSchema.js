import mongoose, { Schema } from "mongoose";

const RouteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    path: [
        {
            time: {
                type: String,
                required: true
            },
            stop: {
                type: String
            }
        }
    ]
});

export default mongoose.model('Route', RouteSchema);