 /* =========================
   URL SAFETY CHECKER
========================= */

function checkURL() {

    let input =
        document.getElementById("url").value.trim();

    let result =
        document.getElementById("url-result");

    let https =
        document.getElementById("https");

    let format =
        document.getElementById("format");

    let suspicious =
        document.getElementById("suspicious");


    /* =========================
       EMPTY INPUT
    ========================= */

    if (input === "") {

        result.innerHTML =
            "⚠️ Please enter a URL.";

        https.innerHTML =
            "⬜ HTTPS check";

        format.innerHTML =
            "⬜ URL format check";

        suspicious.innerHTML =
            "⬜ Suspicious keyword check";

        localStorage.removeItem(
            "urlSecurityScore"
        );

        return;
    }


    /* =========================
       PREPARE URL
    ========================= */

    let url = input;


    /*
       If user enters:

       google.com

       convert internally to:

       https://google.com
    */

    if (
        !url.startsWith("http://") &&
        !url.startsWith("https://")
    ) {

        url =
            "https://" + url;

    }


    /* =========================
       CHECK URL FORMAT
    ========================= */

    let validURL = false;

    let urlObject;


    try {

        urlObject =
            new URL(url);

        /*
           Make sure there is
           an actual domain
        */

        if (
            urlObject.hostname.includes(".") &&
            !urlObject.hostname.startsWith(".") &&
            !urlObject.hostname.endsWith(".")
        ) {

            validURL = true;

        }

    }

    catch (error) {

        validURL = false;

    }


    if (validURL) {

        format.innerHTML =
            "✅ Valid URL format";

    }
    else {

        format.innerHTML =
            "❌ Invalid URL format";

    }


    /* =========================
       HTTPS CHECK
    ========================= */

    if (
        validURL &&
        url.startsWith("https://")
    ) {

        https.innerHTML =
            "✅ Uses HTTPS";

    }
    else {

        https.innerHTML =
            "❌ Does not use HTTPS";

    }


    /* =========================
       SUSPICIOUS KEYWORDS
    ========================= */

    let suspiciousWords = [

        "login",
        "verify",
        "free",
        "winner",
        "claim",
        "password",
        "urgent",
        "account",
        "bonus",
        "reward",
        "gift",
        "security",
        "confirm"

    ];


    let found = false;


    for (
        let word of suspiciousWords
    ) {

        if (
            url.toLowerCase().includes(word)
        ) {

            found = true;

            break;

        }

    }


    if (found) {

        suspicious.innerHTML =
            "⚠️ Suspicious keyword detected";

    }
    else {

        suspicious.innerHTML =
            "✅ No suspicious keywords";

    }


    /* =========================
       FINAL RESULT
    ========================= */

    if (
        validURL &&
        url.startsWith("https://") &&
        !found
    ) {

        result.innerHTML =
            "🟢 URL LOOKS SAFE";

        localStorage.setItem(
            "urlSecurityScore",
            "20"
        );

    }

    else {

        result.innerHTML =
            "🔴 URL MAY BE SUSPICIOUS";

        localStorage.removeItem(
            "urlSecurityScore"
        );

    }

}