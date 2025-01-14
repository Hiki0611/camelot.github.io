document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Показать первую секцию по умолчанию
    sections[0].classList.add('active');
    navLinks[0].classList.add('active');

    // Обработка навигации
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            sections.forEach(section => section.classList.remove('active'));
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Отправка формы через Telegram Bot API
    const form = document.getElementById('submissionForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            school: formData.get('school'),
            timeOfDay: formData.get('timeOfDay'),
            knowledgeLevel: formData.get('knowledgeLevel'),
            course: formData.get('course')
        };

        const token = "7806926318:AAGaVEaRHLfg4H12JZbnxA6NHQyX_emuezw";
        const chatId = "7518382960";

        const message = `
            F.I.O: ${data.fullName}
            Telefon: ${data.phone}
            Maktab: ${data.school}
            Vaqt: ${data.timeOfDay}
            Bilim darajasi: ${data.knowledgeLevel}
            Kurs: ${data.course}
        `;

        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.ok) {
                alert('Hujjat yuborildi!');
                form.reset();
            } else {
                alert('Xato yuz berdi.');
            }
        })
        .catch(err => console.error(err));
    });
});
