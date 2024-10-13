import mongoose, {Schema} from "mongoose";


const userCredentialsScehma = new Schema(
    {
        userName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        about : {
            type: String,
            required : false
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,   //giving default password
            required: true,
            default: 'defaultpassword'
        },
        avatar: {
            type: String, // giving placholder url
            required: true,
            default: 'some empty string url'
        },
        joiningDate: {
            type: Date,
            required: true,
            default: Date.now
        },
        lastActiveOn: {
            type: Date, // Not required field
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)


export const UserCredentials = mongoose.model('UserCredentials', userCredentialsScehma)
