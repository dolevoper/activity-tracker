import { getDuration } from "./activity.model.js";
export function render(activitiesTable, activities) {
    activitiesTable.innerHTML = activities
        .map((activity) => `<tr class="table-row">
                <th>${activity.name}</th>
                <td><time>${activity.started.toLocaleString()}</time></td>
                <td><time>${activity.ended.toLocaleString()}</time></td>
                <td>${getDuration(activity).toFixed(2)} hours</td>
            </tr>`)
        .join("\n");
    activitiesTable.style.setProperty("--item-count", activities.length.toString());
}
export function updateSort(startedHeader, durationHeader, prop, dir) {
    startedHeader.classList.remove("sort--desc", "sort--asc");
    durationHeader.classList.remove("sort--desc", "sort--asc");
    if (prop === "started") {
        startedHeader.classList.add(`sort--${dir}`);
    }
    else {
        durationHeader.classList.add(`sort--${dir}`);
    }
}
