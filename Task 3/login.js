function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let msg = document.getElementById("message");

    // Frontend Validation
    if (username === "" || password === "") {
        msg.style.color = "red";
        msg.innerText = "Please fill all fields!";
        return;
    }

    // Send to backend
    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            msg.style.color = "green";
            msg.innerText = "Login Successful!";
        } else {
            msg.style.color = "red";
            msg.innerText = "Invalid Username or Password!";
        }
    });
}