document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Отправка данных на сервер для регистрации
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, surname, age, email, password })
        });

        if (response.ok) {
            // Показать форму ввода кода подтверждения
            showConfirmationForm();
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (error) {
        alert('Ошибка при регистрации: ' + error.message);
    }
});

async function confirmRegistration() {
    const email = document.getElementById('email').value;
    const confirmationCode = document.getElementById('confirmationCode').value;

    try {
        // Отправка кода подтверждения на сервер
        const response = await fetch('/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, confirmationCode })
        });

        if (response.ok) {
            alert('Регистрация успешна! Вы можете войти в свой аккаунт.');
            window.location.href = 'Вход.html';
        } else {
            const error = await response.json();
            alert(error.message);
        }
    } catch (error) {
        alert('Ошибка при подтверждении регистрации: ' + error.message);
    }
}

function showConfirmationForm() {
    // Показать форму ввода кода подтверждения
    const confirmationContainer = document.createElement('div');
    confirmationContainer.innerHTML = `
      <label for="confirmationCode">Введите код подтверждения:</label>
      <input type="text" id="confirmationCode" name="confirmationCode" required>
      <button type="button" onclick="confirmRegistration()">Подтвердить</button>
    `;
    document.querySelector('.login-container').appendChild(confirmationContainer);
}
function registerWithSocial(provider) {
    // Здесь вы должны реализовать логику регистрации через социальные сети
    // Например, можно использовать API соответствующих сервисов
    if (provider === 'vk') {
        // Выполняем регистрацию через Вконтакте
        if (createSocialAccount('vk')) {
            window.location.href = 'https://vk.com';
        } else {
            alert('Не удалось зарегистрироваться через Вконтакте');
        }
    } else if (provider === 'google') {
        // Выполняем регистрацию через Google
        if (createSocialAccount('google')) {
            window.location.href = 'index.html';
        } else {
            alert('Не удалось зарегистрироваться через Google');
        }
    } else if (provider === 'telegram') {
        // Выполняем регистрацию через Telegram
        if (createSocialAccount('telegram')) {
            window.location.href = 'index.html';
        } else {
            alert('Не удалось зарегистрироваться через Telegram');
        }
    }
}

function createSocialAccount(provider) {
    // Здесь вы должны реализовать логику создания нового аккаунта в социальной сети
    // Например, можно использовать объект с аккаунтами
    const socialAccounts = {
        'vk': 'user_vk',
        'google': 'user_google',
        'telegram': 'user_telegram'
    };

    // Добавляем новый аккаунт в объект с аккаунтами
    socialAccounts[provider] = 'new_' + provider + '_account';
    return true;
}
