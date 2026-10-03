 /* =========================
   SHOW / HIDE PASSWORD
========================= */

let showPassword =
    document.getElementById("showPassword");

let passwordInput =
    document.getElementById("password");

showPassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        showPassword.innerHTML = "Hide";

    } else {

        passwordInput.type = "password";
        showPassword.innerHTML = "Show";

    }

});


/* =========================
   PASSWORD CHECKER
========================= */

function checkPassword() {

    let password =
        document.getElementById("password").value;

    let result =
        document.getElementById("result");

    let strengthFill =
        document.getElementById("strength-fill");

    let strengthText =
        document.getElementById("strength-text");


    /* EMPTY PASSWORD */

    if (password.length === 0) {

        result.innerHTML =
            "⚠️ Please enter a password.";

        strengthFill.style.width = "0%";

        strengthText.innerHTML =
            "Not checked";

        localStorage.removeItem(
            "passwordSecurityScore"
        );

        return;
    }


    /* =========================
       CHARACTER CHECKS
    ========================= */

    let hasUppercase =
        /[A-Z]/.test(password);

    let hasLowercase =
        /[a-z]/.test(password);

    let hasNumber =
        /[0-9]/.test(password);

    let hasSpecial =
        /[^A-Za-z0-9]/.test(password);


    /* =========================
       UPDATE REQUIREMENTS
    ========================= */

    document.getElementById("length").innerHTML =
        password.length >= 8
        ? "✅ At least 8 characters"
        : "❌ At least 8 characters";


    document.getElementById("uppercase").innerHTML =
        hasUppercase
        ? "✅ Contains uppercase letter"
        : "❌ Contains uppercase letter";


    document.getElementById("lowercase").innerHTML =
        hasLowercase
        ? "✅ Contains lowercase letter"
        : "❌ Contains lowercase letter";


    document.getElementById("number").innerHTML =
        hasNumber
        ? "✅ Contains number"
        : "❌ Contains number";


    document.getElementById("special").innerHTML =
        hasSpecial
        ? "✅ Contains special character"
        : "❌ Contains special character";


    /* =========================
       CALCULATE STRENGTH
    ========================= */

    let score = 0;


    /* LENGTH */

    if (password.length >= 4) {
        score++;
    }

    if (password.length >= 8) {
        score++;
    }

    if (password.length >= 12) {
        score++;
    }


    /* CHARACTER TYPES */

    if (hasUppercase) {
        score++;
    }

    if (hasLowercase) {
        score++;
    }

    if (hasNumber) {
        score++;
    }

    if (hasSpecial) {
        score++;
    }


    /* =========================
       WEAK
    ========================= */

    if (score <= 2) {

        result.innerHTML =
            "🔴 WEAK PASSWORD";

        strengthFill.style.width =
            "33%";

        strengthText.innerHTML =
            "Weak";

        localStorage.removeItem(
            "passwordSecurityScore"
        );

    }


    /* =========================
       MEDIUM
    ========================= */

    else if (score <= 4) {

        result.innerHTML =
            "🟠 MEDIUM PASSWORD";

        strengthFill.style.width =
            "66%";

        strengthText.innerHTML =
            "Medium";

        localStorage.removeItem(
            "passwordSecurityScore"
        );

    }


    /* =========================
       STRONG
    ========================= */

    else {

        result.innerHTML =
            "🟢 STRONG PASSWORD";

        strengthFill.style.width =
            "100%";

        strengthText.innerHTML =
            "Strong";

        localStorage.setItem(
            "passwordSecurityScore",
            "25"
        );

    }

}