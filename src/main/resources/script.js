const items = [
    { title: "Annual Tech & Cultural Fest", cat: "Event", date: "2026-12-04", venue: "Main Auditorium", desc: "Hackathons, live music, and inter-college competitions." },
    { title: "Git, Docker & Cloud Workshop", cat: "Workshop", date: "2026-12-09", venue: "Lab 302", desc: "Hands-on session on version control and containers. Bring your laptop." },
    { title: "Seminar: AI in Healthcare", cat: "Seminar", date: "2026-12-12", venue: "Seminar Hall B", desc: "Guest lecture on diagnostic imaging and medical data ethics." },
    { title: "Resume & Interview Boot Camp", cat: "Workshop", date: "2026-12-16", venue: "Placement Cell", desc: "Mock interviews and resume feedback with alumni." }
];

let currentCat = "All";
const grid = document.getElementById("grid");
const modal = document.getElementById("modal");

function render() {
    const list = items
        .filter((i) => currentCat === "All" || i.cat === currentCat)
        .sort((a, b) => a.date.localeCompare(b.date));

    grid.innerHTML = list.map((item, idx) => `
    <article class="card">
      <span class="tag">${item.cat}</span>
      <span class="date">${item.date} • ${item.venue}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <button data-idx="${idx}">Details</button>
    </article>
  `).join("");

    grid.querySelectorAll("button").forEach((btn) => {
        btn.onclick = () => {
            const item = list[btn.dataset.idx];
            document.getElementById("mTitle").textContent = item.title;
            document.getElementById("mMeta").textContent = `${item.cat} | ${item.date} | ${item.venue}`;
            document.getElementById("mDesc").textContent = item.desc;
            modal.showModal();
        };
    });
}

document.getElementById("filters").onclick = (e) => {
    if (e.target.tagName !== "BUTTON") return;
    currentCat = e.target.dataset.cat;
    document.querySelectorAll("nav button").forEach((b) => b.classList.toggle("active", b === e.target));
    render();
};

document.getElementById("closeBtn").onclick = () => modal.close();
render();