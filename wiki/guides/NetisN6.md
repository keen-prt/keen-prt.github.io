# Netis N6 AX1800 <Badge type="keenetic" text="4.2.3"/>

::: tip **Статус устройства: Active**
**Active** — ведётся портирование новых версий
:::

![альтернативный текст](/assets/images/wiki/guides/NetisN6/netisn6.png){width=500px height=100px}

## Характеристики

| Особенность       | Описание                               |
|-------------------|----------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz       |
| **Flash MB**      | 128NAND                                |
| **RAM MB**        | 256                                    |
| **Ethernet**      | 10/100/1000 Mbps x5 (1x WAN, 4x LAN)   |
| **USB**           | 1x 3.0                                 |
| **WLAN Hardware** | MediaTek MT7905DAN + MediaTek MT7975DN |
| **WLAN 5.0GHz**   | AX, 80MHz, 2x2, 1201MB/s, 256QAM       |
| **WLAN 2.4GHz**   | AX, 40MHz, 2x2, 574MB/s, 256QAM        |

## Особенности сборки

| Особенность              | Описание                                              |
|--------------------------|-------------------------------------------------------|
| **Работоспособность**    | ✅ Кроме: <br/> • Облачных сервисов                    |
| **Сброс настроек**       | ✅ Через кнопку Reset                                  |
| **Кнопка WPS**           | ✅ Настроена как FN на любые действия в рамках системы |
| **Светодиоды**           | ✅                                                     |
| **Совместимость в mesh** | ✅ С оригинальными устройствами и клонами              |
| **Встроенное хранилище** | ✅ 46.5МБ, можно установить Entware                    |
| **USB-Мод**              | ✅                                                     |
| **Компоненты**           | [Максимальный набор](/wiki/helpful/components.md)     |

## Установка

::: tip ИНФОРМАЦИЯ
**• Удалённая установка через AnyDesk на Windows 10/11, стоимость – `400₽`**<br/>
• Опт от 10шт - `350₽`<br/>
• Роутер должен быть подключен LAN-LAN в компьютер/ноутбук. Интернет отдельно получен через Wi-Fi/LAN (раздать с телефона или другого роутера)
:::
_Просьба не распространять файлы, эта небольшая плата мотивирует портировать новые прошивки и скрипты распространяющиеся на бесплатной основе._

## Подготовка со стоковой прошивки

[Скачать архив](/assets/files/firmware/Netis-N6-Breed.zip)

1. Установить `1. FACTORY_N6_OpenWRT.bin` из папки `Firmware` поверх стоковой прошивки простым обновлением. **Пароль на вход такой же, какой вы ставили на стоковой прошивке.**
   ::: warning Если OpenWRT ранее был установлен, [установите](https://openwrt.org/packages/start) пакет предварительно подав интернет.
   ````shell
   opkg update
   opkg install kmod-mtd-rw
   ````
   Или обновитесь поверх на `2. SYSUPGRADE_N6_OpenWRT.bin`, в ней пакет уже установлен
   :::

![альтернативный текст](/assets/images/wiki/guides/NetisN6/OpenWRT_install.png)

2. После запуска OpenWRT запускаем `!Start.bat` **из под Windows 10/11**.

Скрипт сделает бэкап стокового загрузчика, factory раздела (он же mtd2, он же eeprom) в папку `Data`. Установит и выполнит перезагрузку в Breed.
![альтернативный текст](/assets/images/wiki/guides/NetisN6/script.png)

3. Зайти в загрузчик Breed по адресу **[192.168.1.1](http://192.168.1.1)** и сделать `Full dump` бэкап на случай отката прошивки.

![альтернативный текст](/assets/images/wiki/guides/NetisN6/breed1.jpg)

4. Прислать [@spatiumstas](https://t.me/spatiumstas) файл `EEPROM_XXXXXX.bin` **полученный из скрипта** для дальнейшей удалённой установки.

## Скриншоты

![альтернативный текст](/assets/images/wiki/guides/NetisN6/system1.png){width=600px height=100px}

![альтернативный текст](/assets/images/wiki/guides/NetisN6/system2.png){width=600px height=100px}

![альтернативный текст](/assets/images/wiki/guides/NetisN6/system3.png){width=500px height=100px}

![альтернативный текст](/assets/images/wiki/guides/NetisN6/system4.png){width=500px height=100px}