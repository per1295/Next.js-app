import mongoose from "mongoose";
import { IContactData } from "../types/contact";

const contactDataSchema = new mongoose.Schema<IContactData>({
    id: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    object: {
        type: String,
        required: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    collection: "contactData"
});

export const ContactData = mongoose.models?.contactData || mongoose.model("contactData", contactDataSchema);