# Xiaomi Range Extender RA75/RC04 <YezBadge type="keenetic" text="4.2.6" url="/assets/files/firmware/Xiaomi-Extender.7z" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![Xiaomi Range Extender RA75/RC04](/assets/images/wiki/guides/Xiaomi/extender.png)

## Характеристики

| Особенность       | Описание                                       |
| ----------------- | ---------------------------------------------- |
| **CPU**           | MediaTek MT7628DAN, MIPS, 580 MHz              |
| **Flash MB**      | 16 SPI                                         |
| **RAM MB**        | 64                                             |
| **Ethernet**      | 4x100M WAN port                                |
| **USB**           | -                                              |
| **WLAN Hardware** | MediaTek MT7628DAN, MediaTek MT7612EN/MT7613BE |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM                  |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM                |

## Особенности сборки

| Особенность              | Описание                                       |
| ------------------------ | ---------------------------------------------- |
| **Работоспособность**    | ✅ Кроме: <br/> ❌ Облачных сервисов <br/> ❌ WPS |
| **Сброс настроек**       | ✅ Через кнопку Reset                           |
| **Светодиоды**           | ✅                                              |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами       |
| **Встроенное хранилище** | ❌ Установка Entware невозможна                 |
| **Компоненты**           | Все для роутера без USB                         |

## Обновление прошивки

Для обновления воспользуйтесь способом для [SPI-памяти](/wiki/helpful/updateFirmware#%D0%B4%D0%BB%D1%8F-spi-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D0%B4%D0%BE-32mb).

## Установка со стоковой прошивки

::: warning
Установка возможна только через UART или программатор. На данной модели невозможно перейти на сторонние прошивки без разбора.
:::

1. **Снятие EEPROM.** Создайте бэкап флеш-памяти через программатор и вытащите EEPROM через [онлайн-сервис](https://yeezyio.github.io/EepromCutter.html). Либо через UART смените загрузчик на Breed и снимите EEPROM оттуда.
2. **Конвертация EEPROM.** Сконвертируйте EEPROM в валидный для Keenetic: [переместите калибровку](https://yeezyio.github.io/EepromMover.html), затем в полученном файле [смените MAC-адрес](https://yeezyio.github.io/EepromConverter.html).
3. **Прошивка.** Во втором пункте второй вкладки выберите прошивку `RC04/RA75_4.2.6_FULL.bin`, снимите последние 2 галочки и подтвердите загрузку.

   ![Загрузка прошивки в Breed](/assets/images/wiki/guides/Mercusys/install.png)

4. **Восстановление EEPROM.** После установки снова зайдите в Breed зажатием Reset и восстановите EEPROM, полученный в шаге 2.

   ![Восстановление EEPROM в Breed](/assets/images/wiki/guides/Mercusys/eeprom.png)

После перезагрузки устройство запустится в KeeneticOS.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1`<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::
