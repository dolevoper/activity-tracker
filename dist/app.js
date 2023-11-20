const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
document.forms.namedItem("logActivity").elements.namedItem("started").value = now.toISOString().slice(0, 16);
document.forms.namedItem("logActivity").elements.namedItem("ended").value = now.toISOString().slice(0, 16);
document.forms.namedItem("logActivity")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(...formData.entries());
});
