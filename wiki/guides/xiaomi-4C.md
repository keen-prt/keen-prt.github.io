# Xiaomi Router 4C <YezBadge type="keenetic" text="4.1.7" url="/assets/files/firmware/Xiaomi-4C.7z" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/4C.png){width=400px height=100px}

## Характеристики

| Особенность       | Описание                          |
|-------------------|-----------------------------------|
| **CPU**           | MediaTek MT7628DAN, MIPS, 580 MHz |
| **Flash MB**      | 16 SPI                            |
| **RAM MB**        | 64                                |
| **Ethernet**      | 2x100M LAN port + 1x100M WAN port |
| **USB**           | -                                 |
| **WLAN Hardware** | MediaTek MT7628DAN                |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM     |

## Особенности сборки

| Особенность                                                                                           | Описание                                 |
|-------------------------------------------------------------------------------------------------------|------------------------------------------|
| **Работоспособность**                                                                                 | ✅ Кроме: <br/> • Облачных сервисов       |
| **Сброс настроек**                                                                                    | ✅ Через кнопку Reset                     |
| **Светодиоды**                                                                                        | ✅                                        |
| **Совместимость в Mesh**                                                                              | ✅ С оригинальными устройствами и клонами |
| **[Перезагрузка модема](https://openwrt.org/toh/xiaomi/xiaomi_mi_router_4c#hardware_mod_-_usb_port)** | ✅ Могут поддерживаться не все модемы     |
| **Встроенное хранилище**                                                                              | ❌ Установка Entware невозможна           |

## Обновление прошивки

Для обновления воспользуйтесь способом для [SPI памяти](/wiki/helpful/updateFirmware#%D0%B4%D0%BB%D1%8F-spi-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D0%B4%D0%BE-32mb)

## Установка со стоковой прошивки

1. Сбросить настройки роутера, пройти первоначальную настройку и установить пароль `12345678`
2. Запустите `!Start.bat` и поочерёдно выбираете пункты от 1 до 4. В папке `data` будет бэкап текущей прошивки и eeprom.
   ![альтернативный текст](/assets/images/wiki/guides/Xiaomi/install-4ag.png)
3. Если уже стоял Keenetic, снимите в Breed бэкап вашего `EEPROM`
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/backup.png)
4. Во втором пункте второй вкладки выбираем прошивку из архива `Xiaomi4C_4.1.7.bin` сняв последние 2 галочки и подтвердить загрузку
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/install.png)
5. После установки снова заходим в Breed зажатием Reset или [BreedEnter](/wiki/helpful/breedBootloader#breedenter), и восстанавливаем EEPROM снятый в 1 пункте или полученный из онлайн-сервиса.
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/eeprom.png)

После перезагрузки устройство запустится в KeeneticOS
::: tip URL: 192.168.1.1<br/>SSID: Keenetic<br/>Password: 12345678
:::

## Скриншоты

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/system1-4c.png)

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/system2-4c.jpg)

## Установленные компоненты

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/components-4c1.png)

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/components-4c2.png)

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/components-4c3.png)