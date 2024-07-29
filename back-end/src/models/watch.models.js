import mongoose from "mongoose";
const watchSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price :{
      type:String,
      required : true
    },
    imageLink: {
        type: String,
        required: true
    },
    videoLink: {
        type: String,
        required: true
    },
    // Add other fields as needed

}, { timestamps: true });

export const Watch = mongoose.model('Watch', watchSchema);
