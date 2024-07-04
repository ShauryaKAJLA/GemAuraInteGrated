import mongoose from 'mongoose'


const feedbackSchema = new mongoose.Schema({
    name:  {
        type:String,
        required:true
    },
    email:  {
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    },
    givenBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

export const Feedback =mongoose.model('Feedback',feedbackSchema);
