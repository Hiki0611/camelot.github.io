// Переменные Telegram
const TELEGRAM_TOKEN = '7806926318:AAGaVEaRHLfg4H12JZbnxA6NHQyX_emuezw'; // Замените на ваш реальный токен
const TELEGRAM_CHAT_ID = '7518382960'; // Замените на ваш реальный ID чата

// Ожидание загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const form = document.querySelector('#documentForm');
    const responseMessage = document.querySelector('#responseMessage');

    // Переход по меню
    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);

            sections.forEach((section) => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });

            navLinks.forEach((link) => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Обработка формы
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Получение данных формы
        const fullName = document.querySelector('#fullName').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const school = document.querySelector('#school').value.trim();
        const timeOfDay = document.querySelector('#timeOfDay').value;
        const knowledgeLevel = document.querySelector('#knowledgeLevel').value;
        const course = document.querySelector('#course').value;

        // Проверка заполнения
        if (!fullName || !phone || !school) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        // Формирование данных для отправки
        const formData = {
            fullName,
            phone,
            school,
            timeOfDay,
            knowledgeLevel,
            course
        };

        // Отправка данных в Google Apps Script
        fetch('https://script.google.com/macros/s/AKfycbz490875hSv7D-gBX6EfpAebDR57pS337qklIW7eEukdlHlEM-eJaaErSnQURnIArH5Rw/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => {
            if (response.ok) {
                // Сообщение об успешной отправке
                responseMessage.textContent = 'Ваша заявка успешно отправлена!';
                responseMessage.style.display = 'block';
                form.reset();
            } else {
                alert('Ошибка при отправке данных. Попробуйте снова.');
            }
        })
        .catch((error) => {
            console.error('Ошибка:', error);
            alert('Ошибка при подключении к серверу.');
        });
    });
});
