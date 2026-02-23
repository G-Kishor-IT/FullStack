const API = "http://localhost:3000";

// Add Student
function addStudent() {
    fetch(API + "/addStudent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            department: document.getElementById("dept").value
        })
    })
    .then(res => res.json())
    .then(() => loadData());
}

// Load Students + Report
function loadData() {

    // Load Students Table
    fetch(API + "/students")
        .then(r => r.json())
        .then(data => {
            let rows = "";
            data.forEach(s => {
                rows += `<tr>
                            <td>${s.id}</td>
                            <td>${s.name}</td>
                            <td>${s.department}</td>
                         </tr>`;
            });
            document.getElementById("studentData").innerHTML = rows;
        });

    // Load Daily Report View
    fetch(API + "/report")
        .then(r => r.json())
        .then(data => {
            let rows = "";
            data.forEach(r => {
                rows += `<tr>
                            <td>${r.activity_date}</td>
                            <td>${r.action_type}</td>
                            <td>${r.total_actions}</td>
                         </tr>`;
            });
            document.getElementById("reportData").innerHTML = rows;
        });
}

// Auto Load When Page Opens
loadData();