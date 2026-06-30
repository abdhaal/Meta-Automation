/**
 * IMA Automation - Homepage Functionality
 * Manages smooth interactivity for the FAQ Section Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('.faq-icon');

            // மத்த எல்லா FAQ-வையும் மூடிட்டு இதை மட்டும் ஓபன் பண்ணும்
            faqQuestions.forEach(item => {
                if (item !== question) {
                    item.nextElementSibling.style.display = 'none';
                    const otherIcon = item.querySelector('.faq-icon');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle logic for display text
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.display = 'block';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});

