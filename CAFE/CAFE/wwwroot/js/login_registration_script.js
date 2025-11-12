// Элементы
const overlay = document.getElementById('overlay');
const formContainer = document.getElementById('form-container');
const closeBtn = document.getElementById('close-form');
const loginBtn = document.getElementById('btn-login-open');
const registerBtn = document.getElementById('btn-register-open');
const loginToggle = document.getElementById('login-toggle');
const registerToggle = document.getElementById('register-toggle');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// Функция открытия формы
function openForm(showRegister = false) {
    overlay.classList.add('active');
    formContainer.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (showRegister) {
        showRegisterForm();
    } else {
        showLoginForm();
    }
}

// Функция закрытия формы
function closeForm() {
    overlay.classList.remove('active');
    formContainer.classList.remove('active');
    document.body.style.overflow = '';
    clearErrors();
}

// Показать форму входа
function showLoginForm() {
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    loginToggle.classList.add('active');
    registerToggle.classList.remove('active');
    clearErrors();
}

// Показать форму регистрации
function showRegisterForm() {
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    registerToggle.classList.add('active');
    loginToggle.classList.remove('active');
    clearErrors();
}

// Очистить ошибки
function clearErrors() {
    document.getElementById('login-error-messages').innerHTML = '';
    document.getElementById('register-error-messages').innerHTML = '';
}

// Показать ошибки
function displayErrors(errors, formType) {
    const errorContainer = document.getElementById(`${formType}-error-messages`);
    errorContainer.innerHTML = '';

    errors.forEach(error => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${error}`;
        errorContainer.appendChild(errorDiv);
    });
}

// Обработчики событий
if (loginBtn) {
    loginBtn.addEventListener('click', () => openForm(false));
}

if (registerBtn) {
    registerBtn.addEventListener('click', () => openForm(true));
}

if (closeBtn) {
    closeBtn.addEventListener('click', closeForm);
}

if (overlay) {
    overlay.addEventListener('click', closeForm);
}

if (loginToggle) {
    loginToggle.addEventListener('click', showLoginForm);
}

if (registerToggle) {
    registerToggle.addEventListener('click', showRegisterForm);
}

// Обработка формы входа
if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const remember = document.getElementById('remember').checked;

        // Валидация
        const errors = [];
        if (!email) errors.push('Введите email');
        if (!password) errors.push('Введите пароль');
        if (password.length < 6) errors.push('Пароль должен содержать минимум 6 символов');

        if (errors.length > 0) {
            displayErrors(errors, 'login');
            return;
        }

        // Здесь должен быть fetch-запрос к серверу
        try {
            const response = await fetch('/Home/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    rememberMe: remember
                })
            });

            const data = await response.json();

            if (data.success) {
                closeForm();
                location.reload();
            } else {
                displayErrors([data.message || 'Ошибка входа'], 'login');
            }
        } catch (error) {
            // Временная заглушка для демонстрации
            console.log('Вход:', { email, password, remember });
            alert('Функционал входа будет реализован после настройки backend');
            closeForm();
        }
    });
}

// Обработка формы регистрации
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors();

        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const phone = document.getElementById('register-phone').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const terms = document.getElementById('terms').checked;

        // Валидация
        const errors = [];
        if (!name) errors.push('Введите имя');
        if (!email) errors.push('Введите email');
        if (!password) errors.push('Введите пароль');
        if (password.length < 6) errors.push('Пароль должен содержать минимум 6 символов');
        if (password !== confirmPassword) errors.push('Пароли не совпадают');
        if (!terms) errors.push('Необходимо согласиться с условиями использования');

        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            errors.push('Некорректный формат email');
        }

        if (errors.length > 0) {
            displayErrors(errors, 'register');
            return;
        }

        // Здесь должен быть fetch-запрос к серверу
        try {
            const response = await fetch('/Home/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phone: phone,
                    password: password
                })
            });

            const data = await response.json();

            if (data.success) {
                alert('Регистрация успешна! Проверьте email для подтверждения.');
                showLoginForm();
            } else {
                displayErrors([data.message || 'Ошибка регистрации'], 'register');
            }
        } catch (error) {
            // Временная заглушка для демонстрации
            console.log('Регистрация:', { name, email, phone, password });
            alert('Функционал регистрации будет реализован после настройки backend');
            closeForm();
        }
    });
}

// Закрытие формы при нажатии Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeForm();
    }
});

// Социальные кнопки (временная заглушка)
document.querySelectorAll('.social-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const provider = this.classList.contains('google') ? 'Google' :
            this.classList.contains('facebook') ? 'Facebook' : 'VK';
        alert(`Вход через ${provider} будет реализован после настройки OAuth`);
    });
});