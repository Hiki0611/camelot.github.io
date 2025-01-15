// Переменные Telegram
const TELEGRAM_TOKEN = '7806926318:AAGaVEaRHLfg4H12JZbnxA6NHQyX_emuezw';
const TELEGRAM_CHAT_ID = '7518382960';

// Ожидание загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-links a'); // Ссылки навбара
    const sections = document.querySelectorAll('.section'); // Все секции
    const form = document.querySelector('#documentForm'); // Форма для отправки данных
    const responseMessage = document.querySelector('#responseMessage'); // Сообщение об успехе

    // Переключение разделов при клике на навигационные ссылки
    navLinks.forEach((link) => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Отключение стандартного поведения

            const targetId = this.getAttribute('href').slice(1); // Получение ID целевого раздела
            sections.forEach((section) => {
                section.classList.remove('active'); // Скрываем все секции
                if (section.id === targetId) {
                    section.classList.add('active'); // Показываем целевой раздел
                }
            });

            // Обновляем состояние активной ссылки
            navLinks.forEach((link) => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Обработка формы
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Предотвращаем перезагрузку страницы

        // Получение данных формы
        const fullName = document.querySelector('#fullName').value.trim();
        const phone = document.querySelector('#phone').value.trim();
        const school = document.querySelector('#school').value.trim();
        const timeOfDay = document.querySelector('#timeOfDay').value;
        const knowledgeLevel = document.querySelector('#knowledgeLevel').value;
        const course = document.querySelector('#course').value;

        // Проверка обязательных полей
        if (!fullName || !phone || !school) {
            alert('Iltimos, ushbu bulimlarni to`ldiring!');
            return;
        }

        // Формируем сообщение для Telegram
        const message = `
            📝 *Yangi Ariza:*
            👤 *F.I.SH:* ${fullName}
            📞 *Telefon raqam:* ${phone}
            🏫 *Maktab:* ${school}
            ⏰ *Dars vaqti:* ${timeOfDay}
            📚 *Bilim darajasi:* ${knowledgeLevel}
            🖋️ *Qaysi fandan:* ${course}
        `;

        // Отправляем данные в Telegram
        fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // Сообщение об успешной отправке
                    responseMessage.textContent = 'Hujjatingiz muvofaqiyatli yuborildi! Tez orada siz bilan "Camelot academy" xodimlari bog`lanishadi';
                    responseMessage.style.display = 'block';
                    form.reset();
                } else {
                    alert('Hujjat topshirishda muammo yuz berdi. Qaytadan urinib kuring!.');
                }
            })
            .catch((error) => {
                console.error('Ошибка:', error);
                alert('Telegram serveriga qushilish mavjud emas!');
            });
    });
});
