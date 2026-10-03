 let loginForm =
    document.getElementById("loginForm");


/* ==================================================
   LOGIN
================================================== */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        let email =
            document.getElementById(
                "loginEmail"
            ).value.trim();


        let password =
            document.getElementById(
                "loginPassword"
            ).value;


        let result =
            document.getElementById(
                "loginResult"
            );


        /* CHECK EMPTY */

        if (email === "" || password === "") {

            result.innerHTML =
                "⚠️ Please enter email and password.";

            return;

        }


        /* SHOW LOADING */

        result.innerHTML =
            "⏳ Logging in...";


        try {

            /* SEND LOGIN REQUEST TO BACKEND */

            let response =
                await fetch(
                    "http://127.0.0.1:5000/api/auth/login",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body: JSON.stringify({

                            email: email,

                            password: password

                        })

                    }
                );


            let data =
                await response.json();


            /* LOGIN FAILED */

            if (!response.ok) {

                result.innerHTML =
                    "❌ " + data.message;

                return;

            }


            /* ==================================================
               LOGIN SUCCESS
            ================================================== */

            localStorage.setItem(
                "cyberShieldLoggedIn",
                "true"
            );


            /* SAVE JWT TOKEN */

            localStorage.setItem(
                "cyberShieldToken",
                data.token
            );


            /* SAVE USER INFORMATION */

            localStorage.setItem(

                "cyberShieldUser",

                JSON.stringify(
                    data.user
                )

            );


            result.innerHTML =
                "✅ Login successful!";


            /* GO TO DASHBOARD */

            setTimeout(
                function () {

                    window.location.href =
                        "dashboard.html";

                },
                1000
            );

        }

        catch (error) {

            console.error(error);


            result.innerHTML =
                "❌ Cannot connect to backend.";

        }

    }
);


/* ==================================================
   SHOW / HIDE PASSWORD
================================================== */

let togglePassword =
    document.getElementById(
        "toggleLoginPassword"
    );


let loginPassword =
    document.getElementById(
        "loginPassword"
    );


togglePassword.addEventListener(
    "click",
    function () {

        if (
            loginPassword.type ===
            "password"
        ) {

            loginPassword.type =
                "text";

            togglePassword.innerHTML =
                "🙈";

        }

        else {

            loginPassword.type =
                "password";

            togglePassword.innerHTML =
                "👁️";

        }

    }
);