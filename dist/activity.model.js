const callbacks = [];
const activities = [];
export function getAll() {
    return activities.slice();
}
export function create(activity) {
    if (activity.started > activity.ended) {
        throw new Error("Activity cannot end before it starts");
    }
    if (activity.ended > new Date()) {
        throw new Error("Activity have not ended yet");
    }
    if (activities.some((a) => a.id === activity.id)) {
        throw new Error(`Activity with id ${activity.id} already exists`);
    }
    activities.push(activity);
    setTimeout(() => callbacks.forEach((callback) => callback()));
}
export function registerOnUpdate(callback) {
    callbacks.push(callback);
}
