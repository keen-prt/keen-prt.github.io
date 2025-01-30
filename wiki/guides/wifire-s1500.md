# WiFire S1500.NBN <YezBadge type="keenetic" text="4.1.8" url="/assets/files/firmware/WiFire-S1500.zip" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![альтернативный текст](/assets/images/wiki/guides/SmartBox/s1500.png)

## Характеристики

| Особенность       | Описание                             |
|-------------------|--------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz     |
| **Flash MB**      | 128NAND                              |
| **RAM MB**        | 128                                  |
| **Ethernet**      | 10/100/1000 Mbps x5 (1x WAN, 4x LAN) |
| **USB**           | 1x 2.0                               |
| **WLAN Hardware** | MediaTek MT7602EN, MediaTek MT7612EN |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM      |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM        |

## Особенности сборки

| Особенность              | Описание                                                     |
|--------------------------|--------------------------------------------------------------|
| **Работоспособность**    | ✅ кроме Мобильного приложения, KeenDNS и <br/>❗ LAN4 порта ❗ |
| **Сброс настроек**       | ✅ через кнопку Reset                                         |
| **Светодиоды**           | ✅                                                            |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами                     |
| **USB-Мод**              | ✅                                                            |
| **Встроенное хранилище** | ✅ 55.2МБ, можно установить Entware                           |

## Обновление прошивки

Для обновления воспользуйтесь любым способом для [NAND памяти](/wiki/helpful/updateFirmware#для-nand-памяти-от-128mb)

## Установка

1. Из установленного OpenWRT ставим пакет `kmod-mtd-rw` предварительно подав доступ к сети
2. Сохраняем из люси-морды (вкладка System - Backup / Flash firmware) раздел `factory`
3. Полученный файл сконвертировать в валидный eeprom для Keenetic через [онлайн-сервис](https://yeezyio.github.io/) с указанием вашего MAC с этикетки. Добавить в папку полученный eeprom.bin
4. `Bootloader.bin` или `Breed.bin` из архива открываем в HFS.exe
5. По SSH выполняем команды предварительно подключив роутер к интернету:

```shell
cat /proc/mtd

вывод:
dev:    size   erasesize  name
mtd0: 10000000 00020000 "u-boot"
```

Запоминаем название `mtd0`` раздела, он будет `u-boot` или `Bootloader` <br/> Используем его в последней команде

```shell
opkg update
opkg install kmod-mtd-rw
cd /tmp
wget http://192.168.1.2/bootloader.bin
insmod mtd-rw i_want_a_brick=1
mtd unlock /dev/mtd1
mtd write /tmp/bootloader.bin Bootloader
reboot
```

6. Обновляем Breed (bootloader.bin) на тот что лежит в архиве. Upgrade -> bootloader -> automatic reboot. В дальнейшем попасть в него можно с зажатой Reset при включении или программой BreedEnter
7. В папке перетягиваем все.bin файлы на hfs.exe.
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
8. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
   выполнения предыдущей команды.
   ::: warning
   • Предварительно отключите Брандмауэр и Антивирус вашей ОС
   <br/>• Сообщения **skipped bad blocks** и **Flash erasure failed with -5** после ввода команд являются нормой
   :::
   ::: danger ВНИМАНИЕ
   • Каждая строка это **отдельная команда**. Если она не выполнилась, повторить снова.
   <br/>• Cравните IP в командах wget ниже с IP указанным в HFS, в загрузчике Breed он всегда начинается на
   192.168.1.xxx
   :::

```shell
flash erase 0x80000 0x7f00000

wget http://192.168.1.2/u-config.bin
flash write 0x80000 0x80001000 0x80000
flash write 0x4040000 0x80001000 0x80000

wget http://192.168.1.2/eeprom.bin
flash write 0x100000 0x80001000 0x80000
flash write 0x40c0000 0x80001000 0x80000

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
