// Highlight field on hover
function highlight(field) {
    field.classList.add("highlight");
}

function removeHighlight(field) {
    field.classList.remove("highlight");
}

// Validate name while typing (letters only)
function validateText(event) {
    let char = String.fromCharCode(event.keyCode);
    if (!/^[a-zA-Z ]$/.test(char)) {
        event.preventDefault();
        alert("Only letters allowed in Name");
    }
}

// Validate email while typing
function validateEmail() {
    let email = document.getElementById("email").value;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!pattern.test(email)) {
        console.log("Invalid email format");
    }
}

// Reusable validation function
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let feedback = document.getElementById("feedback").value.trim();

    if (name === "" || email === "" || feedback === "") {
        alert("All fields are required!");
        return false;
    }
    return true;
}

// Double-click submit confirmation
function submitForm() {
    if (!validateForm()) return;

    document.getElementById("msg").innerHTML = "Feedback Submitted Successfully!";

    // Send data to server (optional)
    fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            feedback: document.getElementById("feedback").value
        })
    });
}