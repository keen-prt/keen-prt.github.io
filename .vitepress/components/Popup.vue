<template>
    <div>
        <p v-if="!finalActionPerformed">
            <a @click.prevent="openPopup" href="https://t.me/yeezyio" target="_blank" rel="noreferrer">
                {{ buttonText }}
            </a>
        </p>

        <div v-if="isPopupVisible" class="popup-overlay" @click="closePopup">
            <div class="popup-content" @click.stop>
                <button class="close-button" @click="closePopup">×</button>
                <h3>Последний шаг</h3>
                <p>Я внимательно прочитал содержимое страницы, выполнил все пункты и претензий не имею.</p>

                <label>
                    <input type="checkbox" v-model="isChecked">
                    Подтверждаю, что ознакомлен с содержимым и претензий не имею.
                </label>

                <button :disabled="!isChecked" @click="handleFinalAction" class="confirm-button">
                    Открыть
                </button>
            </div>
        </div>
        <p v-if="finalActionPerformed">
            Напишите в личные сообщения <a href='https://t.me/yeezyio' target='_blank' rel='noreferrer'>@yeezyio</a> с
            просьбой перевести роутер на прошивку Keenetic.
        </p>
    </div>
</template>

<script>
export default {
    props: ['text'],
    data() {
        return {
            isPopupVisible: false,
            isChecked: false,
            finalActionPerformed: false,
            buttonText: this.text || 'Открыть последний шаг',
        };
    },
    methods: {
        openPopup() {
            if (!this.finalActionPerformed) {
                this.isPopupVisible = true;
                document.documentElement.style.overflow = 'hidden';
                document.body.style.overflow = 'hidden';
                document.documentElement.classList.add('blurred');
            }
        },
        closePopup() {
            this.isPopupVisible = false;
            document.documentElement.style.overflow = '';
            document.body.style.overflow = '';
            document.documentElement.classList.remove('blurred');
        },
        handleFinalAction() {
            this.buttonText = "Напишите в личные сообщения <a href='https://t.me/yeezyio' target='_blank' rel='noreferrer'>@yeezyio</a> с просьбой перевести роутер на прошивку Keenetic.";
            this.finalActionPerformed = true;
            this.closePopup();
        }
    }
};
</script>

<style scoped>
/* Style for the link */
/* Blur effect and overlay */
.popup-overlay {
    user-select: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    /* Ensure popup is on top */
}

.popup-content {
    display: flex;

    flex-direction: column;
    color: white;
    background-color: black;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    width: 300px;
    text-align: center;
    z-index: 10000;
    /* Keep it above the overlay */
}

.close-button {
    color: white;
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    border: none;
    background: none;
    cursor: pointer;
}

.confirm-button {
    margin-top: 20px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 1.0rem;
}

.confirm-button:disabled {
    background-color: gray;
}

.confirm-button:enabled {
    background-color: blue;
    color: white;
}

html.blurred {
    filter: blur(5px);
}
</style>