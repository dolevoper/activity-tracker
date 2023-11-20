export function reset(form: HTMLFormElement) {
    form.reset();

    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    form.elements.namedItem("started")!.value = now.toISOString().slice(0, 16);
    form.elements.namedItem("ended")!.value = now.toISOString().slice(0, 16);
}