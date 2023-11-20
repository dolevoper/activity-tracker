export type Activity = {
    id: string,
    name: string,
    started: Date,
    ended: Date
};

const storageKey = "132bef4f-5a1a-4a45-80dd-2c8344d6818a_activities";
const callbacks: (() => void)[] = [];
const activities: Activity[] = loadFromStorage();

export function getAll() {
    return activities.slice();
}

export function create(activity: Activity) {
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

export function getDuration({ started, ended }: Activity) {
    return ((ended.getTime() - started.getTime()) / 60 / 60 / 1000);
}

export function registerOnUpdate(callback: () => void) {
    callbacks.push(callback);
}

function saveToStorage() {
    localStorage.setItem(
        storageKey,
        JSON.stringify(activities.map((activity) => ({
            ...activity,
            started: +activity.started,
            ended: +activity.ended
        })))
    );
}

function loadFromStorage() {
    const rawActivities = JSON.parse(localStorage.getItem(storageKey) ?? "[]");

    return rawActivities.map((activity: any) => ({
        ...activity,
        started: new Date(activity.started),
        ended: new Date(activity.ended)
    } as Activity));
}
