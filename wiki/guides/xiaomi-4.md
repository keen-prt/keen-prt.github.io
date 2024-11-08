# Xiaomi Mi Router 4 <YezBadgeWithDropdown type="keenetic" text="4.2.1" url="/assets/files/firmware/Xiaomi-4-4.2.1.7z" :versions="[{ text: '4.1.7', url: '/assets/files/firmware/Xiaomi-4-4.1.7.7z' }]"/>

::: tip **Статус устройства: Active**
**Active** — ведётся портирование новых версий
:::

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/xiaomi4.jpg)

## Характеристики

| Особенность       | Описание                             |
| ----------------- | ------------------------------------ |
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz     |
| **Flash MB**      | 128NAND                              |
| **RAM MB**        | 128                                  |
| **Ethernet**      | 10/100/1000 Mbps x3 (1x WAN, 2x LAN) |
| **USB**           | -                                    |
| **WLAN Hardware** | MediaTek MT7603EN, MediaTek MT7612EN |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM      |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM        |

## Особенности сборки

| Особенность              | Описание                                          |
| ------------------------ | ------------------------------------------------- |
| **Работоспособность**    | ✅ кроме Мобильного приложения, KeenDNS           |
| **Сброс настроек**       | ✅ через кнопку Reset                             |
| **Кнопка MiNet**         | ✅ Управляет светодиодом                          |
| **Светодиоды**           | ✅                                                |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами         |
| **Компоненты**           | [Максимальный набор](/wiki/helpful/components.md) |

## Обновление прошивки

Для обновления воспользуйтесь любым из [способов](/wiki/helpful/updateFirmware.md)

## Установка

1. В архиве запускаем !Start.bat в папке `Установка Breed`
2. Поочерёдно выбираете пункты от 1 до 4. <br/>В папке data будет бэкап в файле factory, его конвертируем в валидный eeprom для Keenetic через [онлайн-сервис](https://yeezyio.github.io/) выбрав `Вырезанный eeprom` с указанием вашего MAC с этикетки. Полученный файл поместите в папку с прошивкой
   ![альтернативный текст](/assets/images/wiki/guides/Xiaomi/install.png)
3. Перейдите в Breed по адресу 192.168.1.1. и сделайте `Full` бэкап на случай отката на сток
   ![альтернативный текст](/assets/images/wiki/guides/Xiaomi/breed.jpg)
4. В папке с прошивкой перетягиваем все `bin` файлы на `HFS.exe`
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
5. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
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
