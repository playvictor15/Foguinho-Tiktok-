const apiUrl = "https://replit.com/@playv290/Foguinho-Tiktok-";
async function register() {
    const username = document.getElementById("regUser").value;
    const password = document.getElementById("regPass").value;
    const pet_name = document.getElementById("regPet").value;

    const response = await fetch(apiUrl + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, pet_name })
    });

    const data = await response.json();
    document.getElementById("registerMsg").innerText = data.message || data.error;
}

async function login() {
    const username = document.getElementById("loginUser").value;
    const password = document.getElementById("loginPass").value;

    const response = await fetch(apiUrl + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.message) {
        alert("Login bem-sucedido! Seu pet: " + data.pet_name);
    } else {
        document.getElementById("loginMsg").innerText = data.error;
    }
}
