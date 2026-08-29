if (typeof window !== 'undefined') {
    const isMirrorSite = window.location.hostname === 'keeneticported.gitverse.site';

    document.addEventListener('DOMContentLoaded', () => {
      if (!isMirrorSite) {
        if (!localStorage.getItem('popup-mirror-shown')) {
          showPopup();
          localStorage.setItem('popup-mirror-shown', 'true');
        }
        // showCornerMessage();
      }
    });

    function showPopup() {
      const overlay = document.createElement('div');
      overlay.id = 'popup-overlay';
      overlay.classList.add('vp-doc');

      const popup = document.createElement('div');
      popup.id = 'popup';
      popup.classList.add('vp-doc');
      popup.innerHTML = `
        <button id="popup-close" type="button" aria-label="Закрыть" title="Закрыть">&times;</button>
        <p>Добавьте зеркало сайта в закладки — оно пригодится, если основной сайт будет недоступен.</p>
        <a class="popup-mirror-button" href="https://keeneticported.gitverse.site/" target="_blank" rel="noopener noreferrer">Открыть</a>
      `;

      document.body.appendChild(overlay);
      document.body.appendChild(popup);

      overlay.style.display = 'block';
      popup.style.display = 'block';

      const closePopup = () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
      };

      popup.querySelector('#popup-close').addEventListener('click', closePopup);
      overlay.addEventListener('click', closePopup);
    }

    function showCornerMessage() {
      const message = document.createElement('div')
      message.id = 'corner-message'
      message.classList.add('vp-doc')
      message.innerHTML = `
      <a href="https://keeneticported.gitverse.site/" target="_blank">Зеркало сайта</a>
    `
      document.body.appendChild(message)
    }
  }
