let answerIndex = 0;

function toggleAnswers() {
    const answers = document.querySelectorAll('.interactive-point-answer');

    if (answerIndex < answers.length) {
        const answer = answers[answerIndex];

        // show answer
        answer.classList.remove('hidden');
        requestAnimationFrame(() => {
            answer.classList.add('show-answer');
        });

        const rect = answer.getBoundingClientRect();
        const viewTop = window.scrollY;
        const viewBottom = viewTop + window.innerHeight;
        const elemTop = window.scrollY + rect.top;
        const elemBottom = window.scrollY + rect.bottom;

        if (elemBottom > viewBottom) {
            window.scrollTo({ top: viewTop + (elemBottom - viewBottom), behavior: 'smooth' });
        } else if (elemTop < viewTop) {
            window.scrollTo({ top: elemTop, behavior: 'smooth' });
        }

        answerIndex++;
    }
}

