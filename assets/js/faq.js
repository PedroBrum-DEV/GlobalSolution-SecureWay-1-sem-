    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        question.style.cursor = 'pointer';

        question.addEventListener('click', () => {
            const answer = item.querySelector('p');
            answer.classList.toggle('show');

            if (answer.classList.contains('show')) {
                answer.style.display = 'block';
            } else {
                answer.style.display = 'none';
            }
        });

        // Começa escondido
        item.querySelector('p').style.display = 'none';
    });
