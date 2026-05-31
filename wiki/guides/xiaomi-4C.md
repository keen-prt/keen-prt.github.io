# Xiaomi Router 4C <YezBadge type="keenetic" text="4.1.7" url="/assets/files/firmware/Xiaomi-4C.7z" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![Xiaomi Router 4C](/assets/images/wiki/guides/Xiaomi/4C.png){width=400px height=100px}

## Характеристики

| Особенность       | Описание                          |
| ----------------- | --------------------------------- |
| **CPU**           | MediaTek MT7628DAN, MIPS, 580 MHz |
| **Flash MB**      | 16 SPI                            |
| **RAM MB**        | 64                                |
| **Ethernet**      | 2x100M LAN port + 1x100M WAN port |
| **USB**           | -                                 |
| **WLAN Hardware** | MediaTek MT7628DAN                |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM     |

## Особенности сборки

| Особенность                                                                                           | Описание                                 |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| **Работоспособность**                                                                                 | ✅ Кроме: <br/> • Облачных сервисов       |
| **Сброс настроек**                                                                                    | ✅ Через кнопку Reset                     |
| **Светодиоды**                                                                                        | ✅                                        |
| **Совместимость в Mesh**                                                                              | ✅ С оригинальными устройствами и клонами |
| **[Перезагрузка модема](https://openwrt.org/toh/xiaomi/xiaomi_mi_router_4c#hardware_mod_-_usb_port)** | ✅ Могут поддерживаться не все модемы     |
| **Встроенное хранилище**                                                                              | ❌ Установка Entware невозможна           |

## Обновление прошивки

Для обновления воспользуйтесь способом для [SPI-памяти](/wiki/helpful/updateFirmware#%D0%B4%D0%BB%D1%8F-spi-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D0%B4%D0%BE-32mb).

## Установка со стоковой прошивки

1. **Сброс и настройка.** Сбросьте роутер, пройдите первоначальную настройку и установите пароль `12345678`.
2. **Запуск скрипта.** Запустите `!Start.bat` и поочерёдно выберите пункты с 1 по 4. В папке `data` будут бэкап текущей прошивки и EEPROM.

   ![Меню установщика Breed](/assets/images/wiki/guides/Xiaomi/install-4ag.png)

3. **Бэкап EEPROM (если был Keenetic).** Если ранее уже стоял Keenetic — снимите в Breed бэкап вашего `EEPROM`.

   ![Бэкап EEPROM в Breed](/assets/images/wiki/guides/Mercusys/backup.png)

4. **Прошивка.** Во втором пункте второй вкладки выберите прошивку из архива `Xiaomi4C_4.1.7.bin`, снимите последние 2 галочки и подтвердите загрузку.

   ![Загрузка прошивки в Breed](/assets/images/wiki/guides/Mercusys/install.png)

5. **Восстановление EEPROM.** После установки снова зайдите в Breed зажатием Reset или через [BreedEnter](/wiki/helpful/breedBootloader#breedenter) и восстановите EEPROM (снятый из Breed или полученный из онлайн-сервиса).

   ![Восстановление EEPROM в Breed](/assets/images/wiki/guides/Mercusys/eeprom.png)

После перезагрузки устройство запустится в KeeneticOS.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1`<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

## Скриншоты

![Система KeeneticOS на Xiaomi 4C](/assets/images/wiki/guides/Xiaomi/system1-4c.png)

![Система KeeneticOS на Xiaomi 4C](/assets/images/wiki/guides/Xiaomi/system2-4c.jpg)

## Установленные компоненты

![Установленные компоненты, часть 1](/assets/images/wiki/guides/Xiaomi/components-4c1.png)

![Установленные компоненты, часть 2](/assets/images/wiki/guides/Xiaomi/components-4c2.png)

![Установленные компоненты, часть 3](/assets/images/wiki/guides/Xiaomi/components-4c3.png)
