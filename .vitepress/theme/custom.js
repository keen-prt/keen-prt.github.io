if (typeof window !== 'undefined') {
    // Выполнится только в браузере
    document.addEventListener('DOMContentLoaded', () => {
      showCornerMessage();
    });

    function showPopup() {
      const overlay = document.createElement('div');
      overlay.id = 'popup-overlay';
      overlay.classList.add('vp-doc');

      const popup = document.createElement('div');
      popup.id = 'popup';
      popup.classList.add('vp-doc');
      popup.innerHTML = `
        <p>У нас сменился Telegram-чат<br><a href="https://t.me/keeneticported" target="_blank">Перейти</a></p>
        <button id="popup-close">Закрыть</button>
      `;

      document.body.appendChild(overlay);
      document.body.appendChild(popup);

      overlay.style.display = 'block';
      popup.style.display = 'block';

      document.getElementById('popup-close').addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
      });
    }

    function showCornerMessage() {
      const message = document.createElement('div');
      message.id = 'corner-message';
      message.classList.add('vp-doc');
      message.innerHTML = `
        У нас сменился Telegram-чат<br>
        <a href="https://t.me/keeneticported" target="_blank">Перейти</a>
      `;
      document.body.appendChild(message);
    }
  }
  