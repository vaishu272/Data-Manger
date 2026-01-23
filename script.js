// ***** Navbar Toggle *****

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
const pageContent = document.getElementById("page-content");

navToggle.addEventListener("click", function (e) {
    e.preventDefault();

    navLinks.classList.toggle("active");
    pageContent.classList.toggle("menu-open");
});


document.getElementById("statusBtn").addEventListener("click", function () {
    document.getElementById("statusMenu").classList.toggle("show");
});

// ***** Dark Mode *****

const themeButton = document.getElementById('theme');

themeButton.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.toggle("dark");

    themeButton.innerHTML = document.body.classList.contains("dark")
        ? `Light <i class="fa-solid fa-sun"></i>`
        : `Dark <i class="fa-solid fa-moon"></i>`;
});

// ***** Section Switch *****

const hero = document.getElementById("hero-section");

// show only hero section when page load
window.addEventListener("load", () => {

    hero.classList.remove("hidden");

    document.querySelectorAll(".content-section").forEach(section => {
        section.style.display = "none";
    });
});

function showSection(sectionId) {
    document.querySelectorAll('.content-section')
        .forEach(sec => sec.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}

document.getElementById('view-btn').addEventListener('click', () => {
    hero.classList.add("hidden");
    showSection('view-section');
    refreshView();
});

document.getElementById('add-btn').addEventListener('click', () => {
    hero.classList.add("hidden");
    showSection('add-section');
});

document.querySelector(".bold-text").addEventListener("click", () => {
    hero.classList.remove("hidden");
    document.querySelectorAll('.content-section')
        .forEach(sec => sec.style.display = "none");
});

// ***** Add & Edit Entry *****

let editId = null;

function onFormSubmit() {

    let title = document.getElementById("title").value.trim();
    let desc = document.getElementById("desc").value.trim();
    let msg = document.getElementById("msg").value.trim();

    if (!title || !desc || !msg) {
        alert("Please fill all fields");
        return;
    }

    let list = JSON.parse(localStorage.getItem("userdata")) || [];

    if (editId !== null) {
        let index = list.findIndex(item => item.id === editId);
        list[index].title = title;
        list[index].desc = desc;
        list[index].msg = msg;
        editId = null;
        alert("Entry Updated Successfully!");
    } else {
        list.push({
            id: Date.now(),
            title,
            desc,
            msg,
            status: "active",
            date: new Date().toLocaleString()
        });
        alert("Entry Added Successfully!");
    }

    localStorage.setItem("userdata", JSON.stringify(list));
    document.querySelector(".add-form").reset();
    refreshView();
}

// ***** Edit Entry *****

function editEntry(id) {
    let data = JSON.parse(localStorage.getItem("userdata")) || [];
    let item = data.find(entry => entry.id === id);

    document.getElementById("title").value = item.title;
    document.getElementById("desc").value = item.desc;
    document.getElementById("msg").value = item.msg;

    editId = id;

    showSection("add-section");
    hero.classList.add("hidden");
    window.scrollTo(0, 0);
}

// ***** Delete Entry *****

function deleteEntry(id) {
    let data = JSON.parse(localStorage.getItem("userdata")) || [];
    let index = data.findIndex(item => item.id === id);

    if (index === -1) return;

    if (confirm("Are you sure you want to delete this entry?")) {
        data.splice(index, 1);
        localStorage.setItem("userdata", JSON.stringify(data));
        refreshView();
    }
}

// ***** Shows data in table by rendering *****

function renderTable(data) {

    let view = document.getElementById("entries-container");

    if (data.length === 0) {
        view.innerHTML = "<p>No entries found.</p>";
        return;
    }

    let html = `
        <table class="data-table">
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
    `;

    data.forEach(item => {
        html += `
            <tr>
                <td>${item.title}</td>
                <td>${item.desc}</td>
                <td>${item.msg}</td>
                <td>${item.status}</td>
                <td>
                    <button class="hover-link primary-button"
                        onclick="toggleStatus(${item.id})">
                        ${item.status === "active" ? "Complete" : "Activate"}
                    </button>
                    <button class="hover-link primary-button"
                        onclick="editEntry(${item.id})">Edit</button>
                    <button class="hover-link primary-button"
                        onclick="deleteEntry(${item.id})">Delete</button>
                </td>
            </tr>
        `;
    });

    html += "</table>";
    view.innerHTML = html;
}

// ***** Search button *****

document.getElementById("search-button").addEventListener("click", function () {

    hero.classList.add("hidden");
    showSection("view-section");

    let keyword = document.getElementById("search-text").value
        .toLowerCase()
        .trim();

    let data = JSON.parse(localStorage.getItem("userdata")) || [];

    let result = data.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.desc.toLowerCase().includes(keyword) ||
        item.msg.toLowerCase().includes(keyword)
    );

    renderTable(result);
});

// ***** Filter by Status *****

let currentFilter = "all";

function filterStatus(type) {

    currentFilter = type;

    document.getElementById("statusMenu").classList.remove("show");

    hero.classList.add("hidden");
    showSection("view-section");

    refreshView();
}


function toggleStatus(id) {

    let data = JSON.parse(localStorage.getItem("userdata")) || [];

    let index = data.findIndex(item => item.id === id);
    if (index === -1) return;

    data[index].status =
        data[index].status === "active" ? "completed" : "active";

    localStorage.setItem("userdata", JSON.stringify(data));

    refreshView();
}

function refreshView() {
    let data = JSON.parse(localStorage.getItem("userdata")) || [];

    if (currentFilter === "active") {
        renderTable(data.filter(item => item.status === "active"));
    }
    else if (currentFilter === "completed") {
        renderTable(data.filter(item => item.status === "completed"));
    }
    else {
        renderTable(data);
    }
}

function showAll() {
    currentFilter = "all";

    document.getElementById("statusMenu").classList.remove("show");

    hero.classList.add("hidden");
    showSection("view-section");

    refreshView();
}
