function loadOrders() {
    fetch("http://localhost:3000/orders")
    .then(res => res.json())
    .then(data => {
        let tbody = document.querySelector("#orderTable tbody");
        tbody.innerHTML = "";
        data.forEach(o => {
            tbody.innerHTML += `<tr>
                <td>${o.name}</td>
                <td>${o.product_name}</td>
                <td>${o.quantity}</td>
                <td>${o.total_price}</td>
            </tr>`;
        });
    });
}

function highestOrder() {
    fetch("http://localhost:3000/highest")
    .then(res => res.json())
    .then(data => {
        document.getElementById("result").innerText =
            "Highest Order: " + data.name + " " + data.total_price;
    });
}

function mostActiveCustomer() {
    fetch("http://localhost:3000/active")
    .then(res => res.json())
    .then(data => {
        document.getElementById("result").innerText =
            "Most Active Customer: " + data.name;
    });
}