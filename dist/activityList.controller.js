import { getAll, getDuration, registerOnUpdate } from "./activity.model.js";
import { render } from "./activityList.view.js";
let sortProp = "started";
let sortDir = "desc";
const sortingFunctions = {
    started: {
        desc: (a, b) => +b.started - +a.started,
        asc: (a, b) => +a.started - +b.started
    },
    duration: {
        desc: (a, b) => getDuration(b) - getDuration(a),
        asc: (a, b) => getDuration(a) - getDuration(b)
    }
};
export function init(activitiesTable) {
    updateTable(activitiesTable);
    registerOnUpdate(() => updateTable(activitiesTable));
}
export function toggleSort(activitiesTable, prop) {
    sortDir = sortProp === prop ?
        sortDir === "desc" ? "asc" : "desc" :
        "desc";
    sortProp = prop;
    updateTable(activitiesTable);
}
function updateTable(activitiesTable) {
    const activities = getAll().toSorted(sortingFunctions[sortProp][sortDir]);
    render(activitiesTable, activities);
}
