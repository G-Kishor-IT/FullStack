let students = [];

fetch("http://localhost:3000/students")
.then(res => res.json())
.then(data => {
    students = data;
    displayStudents(students);
    countByDepartment();
});

function displayStudents(data) {
    let tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = "";
    data.forEach(s => {
        tbody.innerHTML += `<tr>
            <td>${s.name}</td>
            <td>${s.department}</td>
            <td>${s.join_date}</td>
        </tr>`;
    });
}

function sortByName() {
    students.sort((a, b) => a.name.localeCompare(b.name));
    displayStudents(students);
}

function sortByDate() {
    students.sort((a, b) => new Date(a.join_date) - new Date(b.join_date));
    displayStudents(students);
}

document.getElementById("departmentFilter").addEventListener("change", function() {
    let dept = this.value;
    let filtered = dept ? students.filter(s => s.department === dept) : students;
    displayStudents(filtered);
});

function countByDepartment() {
    let counts = {};
    students.forEach(s => {
        counts[s.department] = (counts[s.department] || 0) + 1;
    });

    let text = "Student Count: ";
    for (let d in counts) {
        text += `${d} = ${counts[d]}  |  `;
    }
    document.getElementById("countResult").innerText = text;
}