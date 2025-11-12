using Microsoft.AspNetCore.Mvc;

namespace CAFE.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Catalog()
        {
            // Здесь будет логика отображения каталога кафе
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            // Здесь будет логика входа
            // Пока возвращаем временный ответ
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return Json(new { success = false, message = "Заполните все поля" });
            }

            // TODO: Реализовать логику входа с базой данных
            return Json(new { success = true, message = "Вход выполнен успешно" });
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            // Здесь будет логика регистрации
            // Пока возвращаем временный ответ
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.Name))
            {
                return Json(new { success = false, message = "Заполните все обязательные поля" });
            }

            if (model.Password.Length < 6)
            {
                return Json(new { success = false, message = "Пароль должен содержать минимум 6 символов" });
            }

            // TODO: Реализовать логику регистрации с базой данных
            return Json(new { success = true, message = "Регистрация успешна" });
        }

        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] ContactMessageViewModel model)
        {
            // Здесь будет логика отправки сообщения
            if (string.IsNullOrEmpty(model.Name) || string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Message))
            {
                return Json(new { success = false, message = "Заполните все обязательные поля" });
            }

            // TODO: Реализовать отправку email
            return Json(new { success = true, message = "Сообщение отправлено" });
        }
    }

    // ViewModels
    public class LoginViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }

    public class RegisterViewModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
    }

    public class ContactMessageViewModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Message { get; set; }
    }
}