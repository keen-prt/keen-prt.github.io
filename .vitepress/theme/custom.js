// Выполнится, как только DOM загрузится
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, было ли уже показано всплывающее окно
    if (!localStorage.getItem('popup-shown')) {
      showPopup();
      localStorage.setItem('popup-shown', 'true');
    }
  
    // Показываем сообщение в углу
    showCornerMessage();
  });
  
  function showPopup() {
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.id = 'popup-overlay';
  
    // Создаем всплывающее окно
    const popup = document.createElement('div');
    popup.id = 'popup';
    popup.classList.add('vp-doc');
    popup.innerHTML = `
      <p>У нас сменился чат. Обязательно подпишитесь на новый.<br><a href="https://t.me/keeneticported" target="_blank">Перейти в чат</a></p>
      <button id="popup-close">Хорошо, подпишусь</button>
    `;
  
    // Добавляем оверлей и окно в документ
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
  
    // Показываем элементы
    overlay.style.display = 'block';
    popup.style.display = 'block';
  
    // Закрываем окно при нажатии на кнопку
    document.getElementById('popup-close').addEventListener('click', () => {
      popup.style.display = 'none';
      overlay.style.display = 'none';
    });
  }
  
  
  function showCornerMessage() {
    const message = document.createElement('div');
    message.id = 'corner-message';
    message.classList.add('vp-doc'); // Добавляем класс vp-doc
    message.innerHTML = 'У нас сменился чат. Обязательно подпишитесь на новый.<br><a href="https://t.me/keeneticported" target="_blank">Перейти в чат</a>';
    document.body.appendChild(message);
  }
  