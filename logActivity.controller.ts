import { create } from "./activity.model.js";

export function log(formData: FormData) {
    const name = formData.get("name")?.toString();
    const started = formData.get("started")?.toString();
    const ended = formData.get("ended")?.toString();

    if (!name || !started || !ended) {
        throw new Error();
    }

    create({
        id: crypto.randomUUID(),
        name,
        started: new Date(started),
        ended: new Date(ended)
    });
}