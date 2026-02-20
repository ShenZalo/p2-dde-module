let answerIndex = 0;

function toggleAnswers() {
    const answers = document.querySelectorAll('.topic-answer');

    if (answerIndex < answers.length) {
        const answer = answers[answerIndex];

        // show answer
        answer.classList.remove('hidden');

        // trigger transition
        requestAnimationFrame(() => {
            answer.classList.add('show-answer');

            // get rect AFTER layout update
            const rect = answer.getBoundingClientRect();
            const viewTop = 0;
            const viewBottom = window.innerHeight;
            const elemTop = rect.top;
            const elemBottom = rect.bottom;

            if (elemBottom > viewBottom) {
                window.scrollBy({ top: elemBottom - viewBottom, behavior: 'smooth' });
            } else if (elemTop < viewTop) {
                window.scrollBy({ top: elemTop, behavior: 'smooth' });
            }
        });

        answerIndex++;
    }
}




