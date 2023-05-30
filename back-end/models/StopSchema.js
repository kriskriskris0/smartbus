import mongoose from "mongoose";

const StopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Stop = mongoose.model('Stop', StopSchema);

export default Stop;