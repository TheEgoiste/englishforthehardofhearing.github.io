document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Получаем данные из формы
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Проверяем наличие аккаунта
    if (checkAccount(email, password)) {
        // Если аккаунт существует, перенаправляем пользователя на главную страницу
        window.location.href = 'Сайт.html';
    } else {
        // Если аккаунта не существует, выводим сообщение об ошибке
        alert('Неверный email или пароль');
    }
});

document.querySelectorAll('.social-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        const provider = this.dataset.provider;
        loginWithSocial(provider);
    });
});

function checkAccount(email, password) {
    // Здесь вы должны реализовать логику проверки существования аккаунта
    // Например, можно использовать базу данных или объект с аккаунтами
    const accounts = {
        'example@email.com': 'password123'
    };

    return accounts.hasOwnProperty(email) && accounts[email] === password;
}

function loginWithSocial(provider) {
    // Здесь вы должны реализовать логику входа через социальные сети
    // Инициализация Firebase
    firebase.initializeApp({
        // Ваши настройки Firebase
    });

    // Ссылка на кнопку входа через Google
    const googleLoginBtn = document.querySelector('[data-provider="google"]');

    // Обработчик клика на кнопку входа через Google
    googleLoginBtn.addEventListener('click', async () => {
        try {
            // Инициировать авторизацию через Google
            const result = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

            // Получить информацию о пользователе
            const { displayName, email } = result.user;

            // Здесь вы можете обработать полученную информацию о пользователе
            // и выполнить вход на ваш сайт
            console.log('Вход выполнен:', { displayName, email });
        } catch (error) {
            console.error('Ошибка входа:', error);
        }
    });

    // Например, можно использовать API соответствующих сервисов
    if (provider === 'vk') {
        // Выполняем вход через Вконтакте
        if (checkSocialAccount('vk')) {
            window.location.href = 'index.html';
        } else {
            alert('Аккаунт Вконтакте не найден');
        }
    } else if (provider === 'google') {
        // Выполняем вход через Google
        if (checkSocialAccount('google')) {
            window.location.href = 'https://accounts.google.com/?hl=ru';
        } else {
            alert('Аккаунт Google не найден');
        }
    } else if (provider === 'telegram') {
        // Выполняем вход через Telegram
        if (checkSocialAccount('telegram')) {
            window.location.href = 'index.html';
        } else {
            alert('Аккаунт Telegram не найден');
        }
    }
}

function checkSocialAccount(provider) {
    // Здесь вы должны реализовать логику проверки существования аккаунта в социальной сети
    // Например, можно использовать объект с аккаунтами
    const socialAccounts = {
        'vk': 'user_vk',
        'google': 'user_google',
        'telegram': 'user_telegram'
    };

    return socialAccounts.hasOwnProperty(provider);
}
