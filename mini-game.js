const miniGameButton = document.querySelector('.js-mini-game');
const miniGameContainer = document.querySelector('.mini-game-container');
const russianWordOptions = document.querySelectorAll('.russian-word-option');
const checkAnswersButton = document.querySelector('.js-check-answers');
const resultDiv = document.querySelector('.result');

miniGameButton.addEventListener('click', () => {
    miniGameButton.style.display = 'none';
    miniGameContainer.style.display = 'block';
    shuffleWordPairs();
    checkAnswersButton.style.display = 'inline-block';
});

russianWordOptions.forEach((option, index) => {
    option.addEventListener('click', () => {
        const wordPairs = document.querySelectorAll('.word-pair');
        wordPairs[index].querySelector('.russian-word').textContent = option.textContent;
    });
});

checkAnswersButton.addEventListener('click', () => {
    const wordPairs = document.querySelectorAll('.word-pair');
    let correctAnswers = 0;

    wordPairs.forEach((pair, index) => {
        const englishWord = pair.querySelector('.english-word').textContent;
        const russianWord = pair.querySelector('.russian-word').textContent;

        if (russianWord === russianWordOptions[index].textContent) {
            correctAnswers++;
        } else {
            pair.querySelector('.russian-word').style.color = 'red';
        }
    });

    resultDiv.style.display = 'block';
    resultDiv.textContent = `Верных ответов: ${correctAnswers}/${wordPairs.length}`;
});

function shuffleWordPairs() {
    const wordPairs = document.querySelectorAll('.word-pair');
    const russianWordOptions = document.querySelectorAll('.russian-word-option');

    // Перемешиваем пары слов
    for (let i = wordPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordPairs[i], wordPairs[j]] = [wordPairs[j], wordPairs[i]];
    }

    // Перемешиваем варианты русских слов
    for (let i = russianWordOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [russianWordOptions[i], russianWordOptions[j]] = [russianWordOptions[j], russianWordOptions[i]];
    }
}
