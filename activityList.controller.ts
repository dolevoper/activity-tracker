import { Activity, getAll, getDuration, registerOnUpdate } from "./activity.model.js";
import { SortDir, SortProp, render, updateSort } from "./activityList.view.js";

let sortProp: SortProp = "started";
let sortDir: SortDir = "desc";

const sortingFunctions: Record<SortProp, Record<SortDir, (a: Activity, b: Activity) => number>> = {
    started: {
        desc: (a, b) => +b.started - +a.started,
        asc: (a, b) => +a.started - +b.started
    },
    duration: {
        desc: (a, b) => getDuration(b) - getDuration(a),
        asc: (a, b) => getDuration(a) - getDuration(b)
    }
};

export function init(activitiesTable: HTMLElement) {
    updateTable(activitiesTable);

    registerOnUpdate(() => updateTable(activitiesTable));
}

export function toggleSort(activitiesTable: HTMLElement, startedHeader: HTMLElement, durationHeader: HTMLElement, prop: SortProp) {
    sortDir = sortProp === prop ?
        sortDir === "desc" ? "asc" : "desc" :
        "desc";
    sortProp = prop;

    updateTable(activitiesTable);
    updateSort(startedHeader, durationHeader, sortProp, sortDir);
}

function updateTable(activitiesTable: HTMLElement) {
    const activities = getAll().toSorted(sortingFunctions[sortProp][sortDir]);

    render(activitiesTable, activities);
}
