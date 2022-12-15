import initDB from "./dbInitialization";
import transportInit from "./transportInitialization";

export default async function init() {
    await initDB();
    transportInit();
}