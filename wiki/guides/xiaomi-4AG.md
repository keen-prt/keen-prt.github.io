# Xiaomi Router 4A Gigabit Edition v1 <YezBadgeWithDropdown type="keenetic" text="4.2.5" url="/assets/files/firmware/Xiaomi-4AGv1-4.2.5.7z" :versions="[{ text: '4.1.7', url: '/assets/files/firmware/Xiaomi-4AGv1-4.1.7.7z' }]"/>

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/4AG.png)

## Характеристики

| Особенность       | Описание                             |
|-------------------|--------------------------------------|
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
|--------------------------|------------------------------------------|
| **Работоспособность**    | ✅ Кроме: <br/> • Облачных сервисов       |
| **Сброс настроек**       | ✅ Через кнопку Reset                     |
| **Светодиоды**           | ✅                                        |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами |
| **Встроенное хранилище** | ❌ Установка Entware невозможна           |

## Обновление прошивки

Для обновления воспользуйтесь способом для [SPI памяти](/wiki/helpful/updateFirmware#%D0%B4%D0%BB%D1%8F-spi-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D0%B4%D0%BE-32mb)

## Установка со стоковой прошивки

1. Сбросить настройки роутера, пройти первоначальную настройку и установить пароль `12345678`
2. Запустите `!Start.bat` и поочерёдно выбираете пункты от 1 до 4. В папке `data` будет бэкап текущей прошивки и eeprom.
   ![альтернативный текст](/assets/images/wiki/guides/Xiaomi/install-4ag.png)
3. Полученный `eeprom.bin` модифицируем через [онлайн-сервис](https://yeezyio.github.io/) указав ваш мак-адрес с этикетки. На выходе получим патченный eeprom для работы в Keenetic
4. Если уже стоял Keenetic, снимите в Breed бэкап вашего EEPROM
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/backup.png)
5. Во втором пункте во второй вкладке выбираем прошивку сняв последние 2 галочки и подтвердить загрузку
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/install.png)
6. После установки снова заходим в Breed зажатием Reset и восстанавливаем EEPROM снятый в 1 пункте или полученный из онлайн-сервиса.
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/eeprom.png)

   После перезагрузки устройство запустится в KeeneticOS
   ::: tip URL: 192.168.1.1<br/>SSID: Keenetic<br/>Password: 12345678
   :::

## Скриншоты

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/system1-4ag.jpg)

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/system2-4ag.jpg)

## Установленные компоненты

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/components-4AG-1.png)

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/components-4AG-2.png)