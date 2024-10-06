# SmartBox Giga <YezBadge type="keenetic" text="4.1.7" url="/assets/files/firmware/SmartBox-Giga.7z" />

::: tip **Статус устройства: Active**
**Active** — ведётся портирование новых версий
:::

![альтернативный текст](/assets/images/wiki/guides/SmartBox/giga.png){width=500px height=100px}

## Характеристики

| Особенность       | Описание                            |
|-------------------|-------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz    |
| **Flash MB**      | 128NAND                             |
| **RAM MB**        | 256                                 |
| **Ethernet**      | 10/100 Mbps x1, 10/100/1000 Mbps x2 |
| **USB**           | 1x 3.0                              |
| **WLAN Hardware** | MediaTek MT7603, MediaTek MT7613    |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM     |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM       |

## Особенности сборки

| Особенность              | Описание                                                                                                                                                                                                                                 |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Работоспособность**    | ✅ кроме Мобильного приложения, KeenDNS                                                                                                                                                                                                   |
| **Сброс настроек**       | ✅ через кнопку Reset                                                                                                                                                                                                                     |
| **Светодиоды**           | ✅                                                                                                                                                                                                                                        |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами                                                                                                                                                                                                 |
| **USB-Мод**              | ✅                                                                                                                                                                                                                                        |
| **Компоненты**           | [Максимальный набор](https://help.keenetic.com/hc/ru/articles/360009294539-%D0%9E%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%BE%D0%B2-KeeneticOS) без фирменных онлайн-сервисов |


## Обновление прошивки

Для обновления воспользуйтесь любым из [способов](/wiki/helpful/updateFirmware.md)

## Установка

1. [Установить Breed через сток простым обновлением](https://4pda.to/forum/index.php?showtopic=943587&st=16660#entry126244599)
2. В веб-интерфейсе Breed сохранить `Backup` -> `Full dump` размером 128МБ
   ![альтернативный текст](/assets/images/wiki/guides/NetisN6/breed1.jpg)
3. [В онлайн-сервисе](https://yeezyio.github.io/EepromCutter.html) загружаем наш `Full.bin` из шага выше. На выходе получим вырезанный EEPROM
4. Сконвертировать полученный EEPROM из шага выше в валидный для Keenetic через [онлайн-сервис](https://yeezyio.github.io/EepromConverter.html) указав MAC с этикетки
5. Скачать архив, распаковать, добавить в папку полученный EEPROM из предыдущего шага.
6. В папке перетягиваем все `bin` файлы на `HFS.exe`
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
7. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
   выполнения предыдущей команды.
   ::: warning
   • Предварительно отключите Брандмауэр и Антивирус вашей ОС
   <br/>• Сообщения **skipped bad blocks** и **Flash erasure failed with -5** после ввода команд являются нормой
   :::
   ::: danger ВНИМАНИЕ
   •Каждая строка это **отдельная команда**. Если она не выполнилась, повторить снова.
   <br/>•Cравните IP в командах wget ниже с IP указанным в HFS, в загрузчике Breed он всегда начинается на
   192.168.1.xxx
   :::

```shell
flash erase 0x80000 0x7f00000

wget http://192.168.1.2/u-config.bin
flash write 0x80000 0x80001000 0x80000
flash write 0x4040000 0x80001000 0x80000

wget http://192.168.1.2/eeprom.bin
flash write 0x100000 0x80001000 0x40000
flash write 0x40c0000 0x80001000 0x40000

wget http://192.168.1.2/firmware.bin
flash write 0x180000 0x80001000 0x1AB3F00
flash write 0x4140000 0x80001000 0x1AB3F00

wget http://192.168.1.2/u-state.bin
flash write 0x3fc0000 0x80001000 0x80000

env set autoboot.command "boot flash 0x4140000"
env save

reset
```

::: details Примерный вывод консоли
![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/breedlog.png)
:::
После перезагрузки устройство запустится в Keenetic
::: tip 192.168.1.1<br/>SSID: Keenetic<br/>Password: 12345678
:::

## USB-Mod

::: tip Убираем R153, от U12 подпаять проводок до пятака R43.
:::
![альтернативный текст](/assets/images/wiki/helpful/usb-mod/giga-usb1.png){width=400px height=100px}

![альтернативный текст](/assets/images/wiki/helpful/usb-mod/giga.jpg){width=400px height=100px}

## Добавление конденсатора для решения проблемы зависания Fibocom L860-GL при высокой загрузке

::: tip Припаяйте конденсатор C1840 в цепь питания USB 5 В. Место для него уже есть. Соблюдайте полярность конденсатора! Номинал 100-330 мкФ x 16 В
:::
![альтернативный текст](/assets/images/wiki/helpful/usb-mod/giga-capacitor.jpeg){width=400px height=100px}