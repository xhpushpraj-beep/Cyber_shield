 function checkPhishing(answer) {

    let result =
        document.getElementById("quiz-result");


    /* =========================
       CORRECT ANSWER
    ========================= */

    if (answer === "phishing") {

        result.innerHTML =
            "✅ Correct! This is a phishing message.";


        /* =========================
           SAVE PHISHING SCORE
        ========================= */

        localStorage.setItem(
            "phishingSecurityScore",
            "25"
        );

    }


    /* =========================
       WRONG ANSWER
    ========================= */

    else {

        result.innerHTML =
            "❌ Wrong! This message contains several phishing signs.";

    }

}