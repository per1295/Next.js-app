import { dbConnect, createBaseCollections } from "./dbInitialization";
import transportInit from "./transportInitialization";

export default async function init() {
    await dbConnect();
    await createBaseCollections();
    transportInit();
}