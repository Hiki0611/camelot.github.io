// Mavzuni almashtirish
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Tilni almashtirish
const langToggle = document.querySelector('.lang-toggle');
let isEnglish = false;
langToggle.addEventListener('click', () => {
    isEnglish = !isEnglish;
    langToggle.querySelector('.lang-text').textContent = isEnglish ? 'UZ' : 'EN';
    updateLanguage(isEnglish);
});

// Telegram Bot uchun sozlamalar
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN'; // Замените на ваш токен бота
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';   // Замените на ваш ID чата

// JSON dan ma'lumot olish
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // O'qituvchilar
        const teachersContainer = document.querySelector('.teachers-container');
        data.teachers.forEach(teacher => {
            teachersContainer.innerHTML += `
                <div class="card">
                    <img src="${teacher.photo}" alt="${teacher.name}">
                    <h3>${teacher.name}</h3>
                    <p>Fan: ${teacher.subject}</p>
                    <p>Ko'nikmalar: ${teacher.skills}</p>
                    <p>Sertifikatlar: ${teacher.certificates}</p>
                </div>
            `;
        });

        // Kurslar
        const coursesContainer = document.querySelector('.courses-container');
        data.courses.forEach(course => {
            coursesContainer.innerHTML += `
                <div class="card course-card">
                    <h3>${course.name}</h3>
                    <p>Daraja: ${course.level}</p>
                    <button class="neon-button course-details-btn">Batafsil</button>
                    <div class="course-details">
                        <p><strong>Smena:</strong> ${course.schedule}</p>
                        <p><strong>Guruhlar:</strong> ${course.groups}</p>
                        <p><strong>Narx:</strong> ${course.price} so'm/oy</p>
                        <p><strong>O'qituvchi:</strong> ${course.teacher}</p>
                        <p><strong>Muddat:</strong> ${course.duration}</p>
                        <p><strong>Darslar soni:</strong> ${course.lessons}</p>
                    </div>
                </div>
            `;
        });

        // Yutuqlar
        const achievementsContainer = document.querySelector('.achievements-container');
        data.achievements.forEach(achievement => {
            achievementsContainer.innerHTML += `
                <div class="card">
                    <img src="${achievement.photo}" alt="${achievement.student}">
                    <h3>${achievement.student}</h3>
                    <p>Yutuq: ${achievement.success}</p>
                    <p>Sertifikat: ${achievement.certificate}</p>
                    <p>Yil: ${achievement.year}</p>
                </div>
            `;
        });

        // Fikrlar
        const reviewsContainer = document.querySelector('.reviews-container');
        data.reviews.forEach(review => {
            reviewsContainer.innerHTML += `
                <div class="card">
                    <img src="${review.photo}" alt="${review.name}">
                    <h3>${review.name}</h3>
                    <p>${review.text}</p>
                </div>
            `;
        });

        // Slider uchun 7 ta rasm
        const sliderContainer = document.querySelector('.slider-container');
        const sliderImages = [
            "images/school1.jpg",
            "images/school2.jpg",
            "images/school3.jpg",
            "images/school4.jpg",
            "images/school5.jpg",
            "images/school6.jpg",
            "images/school7.jpg"
        ];
        sliderImages.forEach(src => {
            sliderContainer.innerHTML += `<div class="slider-card"><img src="${src}" alt="Slide"></div>`;
        });

        // Slider funksiyasi
        let currentSlide = 0;
        const slides = document.querySelectorAll('.slider-card');
        const totalSlides = slides.length;
        function updateSlider() {
            sliderContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 3000);

        // Kurs detallarini ochish/yopish
        document.querySelectorAll('.course-details-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.course-card');
                card.classList.toggle('expanded');
                btn.textContent = card.classList.contains('expanded') ? 'Yopish' : 'Batafsil';
            });
        });
    });

// Forma yuborish va Telegram
const form = document.querySelector('#contact-form');
const notification = document.querySelector('#notification');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
        fio: formData.get('fio'),
        school: formData.get('school'),
        birthYear: formData.get('birthYear'),
        phone: formData.get('phone'),
        course: formData.get('course')
    };

    const message = `
        Yangi ro'yxatdan o'tish:
        FIO: ${data.fio}
        Maktab raqami: ${data.school}
        Tug'ilgan yil: ${data.birthYear}
        Telefon: ${data.phone}
        Kurs: ${data.course}
    `;

    try {
        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message
            })
        });
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
        form.reset();
    } catch (error) {
        console.error('Telegramga yuborishda xato:', error);
    }
});

// Tilni yangilash funksiyasi
function updateLanguage(isEnglish) {
    const translations = {
        uz: {
            title: "Camelot Akademiyasi",
            welcome: "Camelot Akademiyasiga xush kelibsiz",
            description: "Ingliz, arab va kimyo fanlarini eng yaxshi o'qituvchilar bilan o'rganing!",
            call: "Qo'ng'iroq qilish",
            teachers: "Bizning o'qituvchilarimiz",
            courses: "Kurslarimiz",
            achievements: "O'quvchilarimiz yutuqlari",
            reviews: "O'quvchilarimiz fikrlari",
            contacts: "Ro'yxatdan o'tish",
            submit: "Yuborish"
        },
        en: {
            title: "Camelot Academy",
            welcome: "Welcome to Camelot Academy",
            description: "Learn English, Arabic, and Chemistry with the best teachers!",
            call: "Call Us",
            teachers: "Our Teachers",
            courses: "Our Courses",
            achievements: "Our Students' Achievements",
            reviews: "Student Reviews",
            contacts: "Register",
            submit: "Submit"
        }
    };
    const lang = isEnglish ? 'en' : 'uz';
    document.title = translations[lang].title;
    document.querySelector('.logo').textContent = translations[lang].title;
    document.querySelector('.hero h1').textContent = translations[lang].welcome;
    document.querySelector('.hero p').textContent = translations[lang].description;
    document.querySelector('.floating-call-btn').textContent = translations[lang].call;
    document.querySelector('#teachers h2').textContent = translations[lang].teachers;
    document.querySelector('#courses h2').textContent = translations[lang].courses;
    document.querySelector('#achievements h2').textContent = translations[lang].achievements;
    document.querySelector('#reviews h2').textContent = translations[lang].reviews;
    document.querySelector('#contacts h2').textContent = translations[lang].contacts;
    document.querySelector('.contact-form button').textContent = translations[lang].submit;
}