declare module globalThis {

    interface Mongoose {
        conn: null | typeof import("mongoose");
        promise: null | Promise<typeof import("mongoose")>;
    }

    export var mongoose: Mongoose;
    export var transport: import("nodemailer").Transporter;
}