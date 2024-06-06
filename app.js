const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Подключение к MongoDB
mongoose.connect('mongodb://localhost/your-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Схема пользователя
const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    age: Number,
    email: String,
    password: String,
    confirmationCode: String
});
const User = mongoose.model('User', UserSchema);

// Маршрут для регистрации
app.post('/register', async (req, res) => {
    const { name, surname, age, email, password } = req.body;

    // Генерация кода подтверждения
    const confirmationCode = crypto.randomInt(1000, 9999).toString();

    // Создание нового пользователя
    const user = new User({
        name,
        surname,
        age,
        email,
        password,
        confirmationCode
    });

    try {
        // Сохранение пользователя в БД
        await user.save();

        // Отправка email с кодом подтверждения
        await sendConfirmationEmail(email, confirmationCode);

        res.status(201).json({ message: 'Регистрация успешна. Проверьте ваш email.' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Маршрут для подтверждения регистрации
app.post('/confirm', async (req, res) => {
    const { email, confirmationCode } = req.body;

    try {
        // Найти пользователя по email и сравнить код подтверждения
        const user = await User.findOne({ email, confirmationCode });
        if (!user) {
            return res.status(400).json({ message: 'Неверный код подтверждения' });
        }

        // Удалить код подтверждения и сохранить пользователя
        user.confirmationCode = null;
        await user.save();

        res.status(200).json({ message: 'Регистрация подтверждена' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Маршрут для входа
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Найти пользователя по email и проверить пароль
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Неверный email или пароль' });
        }

        // Авторизовать пользователя (например, установить сессию)
        // ...

        res.status(200).json({ message: 'Вход успешен' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});

async function sendConfirmationEmail(email, confirmationCode) {
    const transporter = nodemailer.createTransport({
        // Настройки вашего почтового сервиса
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Подтверждение регистрации',
        text: `Ваш код подтверждения: ${confirmationCode}`
    };
    await transporter.sendMail(mailOptions);
}