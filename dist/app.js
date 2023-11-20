let itemCount = 0;
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
document.forms.namedItem("logActivity").elements.namedItem("started").value = now.toISOString().slice(0, 16);
document.forms.namedItem("logActivity").elements.namedItem("ended").value = now.toISOString().slice(0, 16);
document.forms.namedItem("logActivity")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const started = new Date(formData.get("started")?.toString());
    const ended = new Date(formData.get("ended")?.toString());
    // TODO: validation!
    const duration = (ended.getTime() - started.getTime()) / 60 / 60 / 1000;
    const tr = document.createElement("tr");
    tr.classList.add("table-row");
    tr.innerHTML = `<th>${name}</th>
    <td><time>${started.toLocaleString()}</time></td>
    <td><time>${ended.toLocaleString()}</time></td>
    <td>${duration.toFixed(2)} hours</td>`;
    activities.append(tr);
    activities.style.setProperty("--item-count", `${++itemCount}`);
});
