import { createTransport } from "nodemailer";

function transportInit() {
    if ( !globalThis.transport ) {
        const transport = createTransport({
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASS
            }
        });

        globalThis.transport = transport;
    }
}

export default transportInit;