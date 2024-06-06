const startLessonBtn = document.querySelector('.js-start-lesson');

startLessonBtn.addEventListener('click', () => {
    const lessonContent = document.querySelector('.lesson-content');
    const lessonRect = lessonContent.getBoundingClientRect();
    const scrollPosition = lessonRect.top + window.pageYOffset - 80; // Вычитаем 80 пикселей, чтобы отступ был от верха

    window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
});
