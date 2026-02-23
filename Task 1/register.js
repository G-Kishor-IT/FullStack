function register() {

  // Get form values
  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const email = document.getElementById("email").value;
  const dept = document.getElementById("dept").value;
  const contact = document.getElementById("contact").value;
  const password = document.getElementById("pass").value; // ✅ FIXED

  console.log(name, dob, email, dept, contact, password);

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      dob,
      email,
      dept,
      contact,
      password
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("SERVER RESPONSE:", data);
    document.getElementById("message").innerText = data.message;
    alert(data.message);
  })
  .catch(err => {
    console.log("ERROR:", err);
    alert("Server Error ❌");
  });
}
