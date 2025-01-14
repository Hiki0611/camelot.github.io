// Переменные Telegram
const TELEGRAM_TOKEN = 'ВАШ_ТЕЛЕГРАМ_ТОКЕН';
const TELEGRAM_CHAT_ID = 'ВАШ_ЧАТ_ID';

// Ожидание загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const form = document.querySelector('#registrationForm');
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
        const phoneNumber = document.querySelector('#phoneNumber').value.trim();
        const schoolNumber = document.querySelector('#schoolNumber').value.trim();
        const studyTime = document.querySelector('input[name="studyTime"]:checked').value;
        const studentLevel = document.querySelector('#studentLevel').value;
        const subject = document.querySelector('#subject').value;

        // Проверка заполнения
        if (!fullName || !phoneNumber || !schoolNumber) {
            alert('Пожалуйста, заполните все обязательные поля.');
            return;
        }

        // Формирование сообщения для Telegram
        const message = `
            📝 Новая заявка:
            👤 ФИО: ${fullName}
            📞 Телефон: ${phoneNumber}
            🏫 Номер школы: ${schoolNumber}
            ⏰ Время занятий: ${studyTime}
            📚 Уровень знаний: ${studentLevel}
            🖋️ Предмет: ${subject}
        `;

        // Отправка данных в Telegram
        fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
            }),
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
                alert('Ошибка при подключении к серверу Telegram.');
            });
    });
});
