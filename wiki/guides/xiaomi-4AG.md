# Xiaomi Router 4A Gigabit Edition v1 <YezBadge type="keenetic" text="4.2.5" url="/assets/files/firmware/Xiaomi-4AGv1.7z"/>

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![Xiaomi Router 4A Gigabit Edition v1](/assets/images/wiki/guides/Xiaomi/4AG.png)

## Характеристики

| Особенность       | Описание                             |
| ----------------- | ------------------------------------ |
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz     |
| **Flash MB**      | 16 SPI                               |
| **RAM MB**        | 128                                  |
| **Ethernet**      | 2x1G LAN port + 1x1G WAN port        |
| **USB**           | -                                    |
| **WLAN Hardware** | MediaTek MT7603EN, MediaTek MT7612EN |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM        |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM      |

## Особенности сборки

| Особенность              | Описание                                 |
| ------------------------ | ---------------------------------------- |
| **Работоспособность**    | ✅ Кроме: <br/> • Облачных сервисов       |
| **Сброс настроек**       | ✅ Через кнопку Reset                     |
| **Светодиоды**           | ✅                                        |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами |
| **Встроенное хранилище** | ❌ Установка Entware невозможна           |

## Обновление прошивки

Для обновления воспользуйтесь способом для [SPI-памяти](/wiki/helpful/updateFirmware#%D0%B4%D0%BB%D1%8F-spi-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D0%B4%D0%BE-32mb).

## Установка со стоковой прошивки

1. **Сброс и настройка.** Сбросьте роутер, пройдите первоначальную настройку и установите пароль `12345678`.
2. **Запуск скрипта.** Запустите `!Start.bat` и поочерёдно выберите пункты с 1 по 4. В папке `data` будут бэкап текущей прошивки и EEPROM.

   ![Меню установщика Breed](/assets/images/wiki/guides/Xiaomi/install-4ag.png)

3. **Конвертация EEPROM.** Модифицируйте полученный `eeprom.bin` через [онлайн-сервис](https://yeezyio.github.io/), указав ваш MAC-адрес с этикетки — на выходе получите патченный EEPROM для работы в Keenetic.
4. **Бэкап EEPROM (если был Keenetic).** Если ранее уже стоял Keenetic — снимите в Breed бэкап вашего EEPROM.

   ![Бэкап EEPROM в Breed](/assets/images/wiki/guides/Mercusys/backup.png)

5. **Прошивка.** Во втором пункте второй вкладки выберите прошивку, снимите последние 2 галочки и подтвердите загрузку.

   ![Загрузка прошивки в Breed](/assets/images/wiki/guides/Mercusys/install.png)

6. **Восстановление EEPROM.** После установки снова зайдите в Breed зажатием Reset и восстановите EEPROM (снятый из Breed или полученный из онлайн-сервиса).

   ![Восстановление EEPROM в Breed](/assets/images/wiki/guides/Mercusys/eeprom.png)

После перезагрузки устройство запустится в KeeneticOS.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1`<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

## Скриншоты

![Система KeeneticOS на Xiaomi 4A Gigabit](/assets/images/wiki/guides/Xiaomi/system1-4ag.jpg)

![Система KeeneticOS на Xiaomi 4A Gigabit](/assets/images/wiki/guides/Xiaomi/system2-4ag.jpg)

## Установленные компоненты

![Установленные компоненты, часть 1](/assets/images/wiki/guides/Xiaomi/components-4AG-1.png)

![Установленные компоненты, часть 2](/assets/images/wiki/guides/Xiaomi/components-4AG-2.png)
