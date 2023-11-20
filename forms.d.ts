interface SubmitEvent {
    target: HTMLFormElement;
}

interface HTMLFormControlsCollection {
    namedItem(id: string): HTMLInputElement | HTMLTextAreaElement | null;
}