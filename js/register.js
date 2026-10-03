 let registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("registerPassword").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let result = document.getElementById("registerResult");

    if (
        name === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        result.innerHTML = "⚠️ Please fill all required fields.";
        return;
    }

    if (password !== confirmPassword) {
        result.innerHTML = "❌ Passwords do not match.";
        return;
    }

    result.innerHTML = "⏳ Creating your account...";

    try {
        let response = await fetch(
            "http://127.0.0.1:5000/api/auth/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            }
        );

        let data = await response.json();

        if (!response.ok) {
            result.innerHTML =
                "❌ " + (data.message || "Registration failed.");
            return;
        }

        localStorage.setItem(
            "cyberShieldUser",
            JSON.stringify(data.user)
        );

        result.innerHTML =
            "✅ Account created successfully!";

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1200);

    } catch (error) {

        console.error(error);

        result.innerHTML =
            "❌ Cannot connect to server.";
    }
});