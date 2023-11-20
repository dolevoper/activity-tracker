const storageKey = "132bef4f-5a1a-4a45-80dd-2c8344d6818a_activities";
const callbacks = [];
const activities = loadFromStorage();
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
    saveToStorage();
    setTimeout(() => callbacks.forEach((callback) => callback()));
}
export function registerOnUpdate(callback) {
    callbacks.push(callback);
}
function saveToStorage() {
    localStorage.setItem(storageKey, JSON.stringify(activities.map((activity) => ({
        ...activity,
        started: +activity.started,
        ended: +activity.ended
    }))));
}
function loadFromStorage() {
    const rawActivities = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return rawActivities.map((activity) => ({
        ...activity,
        started: new Date(activity.started),
        ended: new Date(activity.ended)
    }));
}
