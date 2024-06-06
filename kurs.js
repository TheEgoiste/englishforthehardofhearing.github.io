document.getElementById('course-signup-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращение стандартной отправки формы

    let isValid = true;

    // Проверка полей формы
    if (!document.getElementById('first-name').value.trim()) {
        isValid = false;
        document.getElementById('first-name-error').style.display = 'block';
        document.getElementById('first-name').classList.add('form-group.error');
    } else {
        document.getElementById('first-name-error').style.display = 'none';
        document.getElementById('first-name').classList.remove('form-group.error');
    }

    if (!document.getElementById('last-name').value.trim()) {
        isValid = false;
        document.getElementById('last-name-error').style.display = 'block';
        document.getElementById('last-name').classList.add('form-group.error');
    } else {
        document.getElementById('last-name-error').style.display = 'none';
        document.getElementById('last-name').classList.remove('form-group.error');
    }

    if (!document.getElementById('email').value.trim() || !isEmail(document.getElementById('email').value)) {
        isValid = false;
        document.getElementById('email-error').style.display = 'block';
        document.getElementById('email').classList.add('form-group.error');
    } else {
        document.getElementById('email-error').style.display = 'none';
        document.getElementById('email').classList.remove('form-group.error');
    }

    if (!document.getElementById('phone').value.trim() || !isPhone(document.getElementById('phone').value)) {
        isValid = false;
        document.getElementById('phone-error').style.display = 'block';
        document.getElementById('phone').classList.add('form-group.error');
    } else {
        document.getElementById('phone-error').style.display = 'none';

        document.getElementById('phone').classList.remove('form-group.error');
    }

    if (!document.querySelector('input[name="agree-to-rules"]').checked) {
        isValid = false;
        document.getElementById('rules-error').style.display = 'block';
    } else {
        document.getElementById('rules-error').style.display = 'none';
    }

    if (isValid) {
        // Если все поля заполнены верно, перенаправить на главный сайт
        window.location.href = 'Сайт.html';
    }
});

function isEmail(email) {
    // Простая проверка адреса электронной почты
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function isPhone(phone) {
    // Простая проверка номера телефона
    return /^\+?\d{1,3}?[- ]?\(?\d{1,3}\)?[- ]?\d{3,4}[- ]?\d{4}$/.test(phone);
}
