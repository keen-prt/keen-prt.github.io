# Linksys EA7XXX <YezBadge type="keenetic" text="4.1.7" url="/assets/files/firmware/Linksys-EA7xxx.zip" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![альтернативный текст](/assets/images/wiki/guides/Linksys/main.png){width=400px height=100px}

## Характеристики

| Особенность       | Описание                             |
|-------------------|--------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz     |
| **Flash MB**      | 128NAND                              |
| **RAM MB**        | 256                                  |
| **Ethernet**      | 10/100/1000 Mbps x5 (1x WAN, 4x LAN) |
| **USB**           | 1x 2.0, 1x 3.0                       |
| **WLAN Hardware** | 2x MediaTek MT7615N                  |
| **WLAN 5.0GHz**   | AX, 160MHz, 2x2, 2402MB/s, 256QAM    |
| **WLAN 2.4GHz**   | N, 40MHz, 4x4, 800MB/s, 256QAM       |

## Особенности сборки

| Особенность              | Описание                                       |
|--------------------------|------------------------------------------------|
| **Совместимость**        | EA7500v2, EA8100 и возможно аналогичные модели |
| **Работоспособность**    | ✅ кроме Мобильного приложения и KeenDNS        |
| **Сброс настроек**       | ✅ через кнопку Reset                           |
| **Светодиоды**           | ✅                                              |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами       |
| **Встроенное хранилище** | ✅ 55.2МБ, можно установить Entware             |

## Установка Breed

1. Установите OpenWRT для вашего девайса согласно информации на официальном сайте
2. Сохраните `EEPROM/factory/mtd2` с вашего устройства
3. Обеспечьте роутер интернетом, и установите пакет `kmod-mtd-rw`
4. Откройте консоль, подключитесь к роутеру по SSH. В `HFS` разверните `breed.bin`

````shell
cd /tmp
wget http://192.168.1.2/breed.bin
insmod mtd-rw i_want_a_brick=1
mtd unlock /dev/mtd0
mtd write /tmp/breed.bin boot
reboot
````

5. Перейдите в Breed по адресу 192.168.1.1. и сделайте `Full` бэкап на случай отката на сток
   ![альтернативный текст](/assets/images/wiki/guides/Xiaomi/breed.jpg)

## Установка Keenetic

1. Запускаем `HFS`, положив все файлы из архива в него. А также ваши калибровки (EEPROM/factory/mtd2). В них предварительно должны быть записаны правильные мак-адреса с помощью [онлайн-сервиса](https://yeezyio.github.io/)
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
2. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
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

