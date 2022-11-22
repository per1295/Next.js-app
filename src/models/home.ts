import mongoose from "mongoose";
import { IEmailData } from "../types/home";

const emailSchema = new mongoose.Schema<IEmailData>({
    id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    collection: "emails"
});

export const Email = mongoose.models?.email || mongoose.model("email", emailSchema);