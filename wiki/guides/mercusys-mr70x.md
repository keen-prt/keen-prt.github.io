# Mercusys MR70X v1 <YezBadge type="keenetic" text="4.3.6" url="/assets/files/firmware/Mercusys-MR70X.7z"/>

::: warning **Статус устройства: EoD**
**End of Development** — обновление системы возможно только при наличии свободного времени и желания
:::

![Mercusys MR70X v1](/assets/images/wiki/guides/Mercusys/main.png){width=400px height=100px}

## Характеристики

| Особенность       | Описание                               |
| ----------------- | -------------------------------------- |
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz       |
| **Flash MB**      | 16 SPI                                 |
| **RAM MB**        | 128                                    |
| **Ethernet**      | 3x1G LAN port + 1x1G WAN port          |
| **USB**           | -                                      |
| **WLAN Hardware** | MediaTek MT7905DAN + MediaTek MT7975DN |
| **WLAN 5.0GHz**   | AX, 80MHz, 2x2, 1201MB/s, 1024QAM      |
| **WLAN 2.4GHz**   | AX, 40MHz, 2x2, 574MB/s, 256QAM        |

## Особенности сборки

| Особенность              | Описание                                 |
| ------------------------ | ---------------------------------------- |
| **Работоспособность**    | ✅ Кроме: <br/> ❌ Облачных сервисов       |
| **Сброс настроек**       | ✅ Через кнопку Reset                     |
| **Светодиод**            | 🟢 - Системный <br/>🔵 - Есть интернет     |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами |
| **Встроенное хранилище** | ❌ Установка Entware невозможна           |

## Обновление прошивки

Для обновления воспользуйтесь способом для [SPI-памяти](/wiki/helpful/updateFirmware#%D0%B4%D0%BB%D1%8F-spi-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D0%B4%D0%BE-32mb).

## Установка

1. **Установка Breed.** Установите Breed по инструкции [zbancam](https://4pda.to/forum/index.php?showtopic=1013969&st=920#entry114456336) или любым другим известным способом.
2. **Выбор прошивки.** Распакуйте архив и в папке `Чистая установка` выберите файл, исходя из объёма вашей флеш-памяти.
3. **Бэкап EEPROM.** Снимите в Breed бэкап вашего EEPROM.

   ![Бэкап EEPROM в Breed](/assets/images/wiki/guides/Mercusys/backup.png)

4. **Прошивка.** Во втором пункте второй вкладки выберите прошивку, снимите последние 2 галочки и подтвердите загрузку.

   ![Загрузка прошивки в Breed](/assets/images/wiki/guides/Mercusys/install.png)

5. **Восстановление EEPROM.** После установки снова зайдите в Breed зажатием Reset и восстановите EEPROM, снятый в шаге 3.

   ![Восстановление EEPROM в Breed](/assets/images/wiki/guides/Mercusys/eeprom.png)

После перезагрузки устройство запустится в KeeneticOS.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1`<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

## Скриншоты системы

![Система KeeneticOS на Mercusys MR70X](/assets/images/wiki/guides/Mercusys/system1.png)

![Система KeeneticOS на Mercusys MR70X](/assets/images/wiki/guides/Mercusys/system2.png)

![Система KeeneticOS на Mercusys MR70X](/assets/images/wiki/guides/Mercusys/system3.png)

## Компоненты для 16MB

![Компоненты для 16MB, часть 1](/assets/images/wiki/guides/Mercusys/16-1.png)

![Компоненты для 16MB, часть 2](/assets/images/wiki/guides/Mercusys/16-2.png)

![Компоненты для 16MB, часть 3](/assets/images/wiki/guides/Mercusys/16-3.jpg)

## Компоненты для 32MB

![Компоненты для 32MB, часть 1](/assets/images/wiki/guides/Mercusys/32-1.png)

![Компоненты для 32MB, часть 2](/assets/images/wiki/guides/Mercusys/32-2.png)

![Компоненты для 32MB, часть 3](/assets/images/wiki/guides/Mercusys/32-3.png)

![Компоненты для 32MB, часть 4](/assets/images/wiki/guides/Mercusys/32-4.png)

![Компоненты для 32MB, часть 5](/assets/images/wiki/guides/Mercusys/32-5.jpg)
