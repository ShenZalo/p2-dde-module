//Answer is hidden at first but when image is clicked, answer is shown
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".answer-toggle").forEach(img => {

        img.addEventListener("click", () => {
            const isAnswer = img.dataset.state === "answer";

            img.classList.add("swap-out");

            setTimeout(() => {
                img.src = isAnswer ? img.dataset.question : img.dataset.answer;
                img.dataset.state = isAnswer ? "question" : "answer";

                img.classList.remove("swap-out");
            }, 250); // must match CSS duration
        });

    });
});
