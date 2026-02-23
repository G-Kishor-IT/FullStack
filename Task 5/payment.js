const API = "http://localhost:3000";

function loadBalance() {
    fetch(API + "/balance")
    .then(res => res.json())
    .then(data => {
        let rows = "";
        data.forEach(u => {
            rows += `<tr><td>${u.id}</td><td>${u.name}</td><td>₹${u.balance}</td></tr>`;
        });
        document.getElementById("tableData").innerHTML = rows;
    });
}

// Add User
function addUser() {
    fetch(API+"/addUser", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name: newName.value,
            balance: newBalance.value
        })
    }).then(loadBalance);
}

// Delete User
function deleteUser() {
    fetch(API+"/deleteUser", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name: deleteName.value})
    }).then(loadBalance);
}

// Deposit
function deposit() {
    fetch(API+"/deposit", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name: depName.value, amount: depAmount.value})
    }).then(loadBalance);
}

// Withdraw
function withdraw() {
    fetch(API+"/withdraw", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name: withName.value, amount: withAmount.value})
    }).then(loadBalance);
}

// Transfer
function pay() {
    fetch(API+"/pay", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            from: fromUser.value,
            to: toUser.value,
            amount: payAmount.value
        })
    }).then(loadBalance);
}