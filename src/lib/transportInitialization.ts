import { createTransport } from "nodemailer";

let cached = global.transport;

function transportInit() {
    cached = createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
            user: process.env.APP_EMAIL,
            pass: process.env.APP_PASS
        }
    });
}

export default transportInit;