declare module globalThis {
    export var connection: import("mysql2/promise").Connection;
    export var transport: import("nodemailer").Transporter;
}