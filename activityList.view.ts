import { Activity, getDuration } from "./activity.model.js";

export function render(activitiesTable: HTMLElement, activities: Activity[]) {
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