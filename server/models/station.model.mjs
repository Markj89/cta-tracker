//const mongoose = require('mongoose');
import { Mongoose } from 'mongoose';
const Schema = mongoose.Schema;

const stationSchema = new Schema({
    _id: Schema.ObjectId,
    station_name: String,
    stops: [{
        stop_id: Number,
        direction: String,
        stop_name: String,
        station_descriptive_name: String,
        map_id: Number,
        ada: Boolean,
        red: Boolean,
        blue: Boolean,
        g: Boolean,
        brn: Boolean,
        p: Boolean,
        purple_express: Boolean,
        y: Boolean,
        pink: Boolean,
        org: Boolean,
        lat: Number,
        lng: Number
    }]
}, {
    timestamps: true,
});

const Station = mongoose.model('Station', stationSchema);
export default Station;