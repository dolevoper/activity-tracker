import { getAll } from "./activity.model.js";

export function render(activitiesTable: HTMLElement) {
    const activities = getAll();

    activitiesTable.innerHTML = activities
        .map(function ({ name, started, ended }) {
            const duration = (ended.getTime() - started.getTime()) / 60 / 60 / 1000;

            return `<tr class="table-row">
                <th>${name}</th>
                <td><time>${started.toLocaleString()}</time></td>
                <td><time>${ended.toLocaleString()}</time></td>
                <td>${duration.toFixed(2)} hours</td>
            </tr>`;
        })
        .join("\n");

    activitiesTable.style.setProperty("--item-count", activities.length.toString());
}