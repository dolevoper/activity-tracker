import { registerOnUpdate } from "./activity.model.js";
import { render } from "./activityList.view.js";

export function init(activitiesTable: HTMLElement) {
    render(activitiesTable);

    registerOnUpdate(() => render(activitiesTable));
}