# Linksys EA7XXX <YezBadge type="keenetic" text="4.1.7" url="/assets/files/firmware/Linksys-EA7xxx.zip" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![Linksys EA7XXX](/assets/images/wiki/guides/Linksys/main.png){width=400px height=100px}

## Характеристики

| Особенность       | Описание                         |
| ----------------- | -------------------------------- |
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz |
| **Flash MB**      | 128NAND                          |
| **RAM MB**        | 256/DDR3                         |
| **Ethernet**      | 4x1G LAN port + 1x1G WAN port    |
| **USB**           | 1x 2.0, 1x 3.0                   |
| **WLAN Hardware** | 2x MediaTek MT7615N              |
| **WLAN 5.0GHz**   | AC, 80MHz, 4x4, 1733MB/s, 256QAM |
| **WLAN 2.4GHz**   | N, 40MHz, 4x4, 800MB/s, 256QAM   |

## Особенности сборки

| Особенность              | Описание                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------ |
| **Совместимость**        | EA7500v2, EA8100 и, возможно, аналогичные модели                                     |
| **Работоспособность**    | ✅ Кроме: <br/> ❌ Облачных сервисов <br/> 🧩 [Компоненты](/wiki/helpful/components.md) |
| **Сброс настроек**       | ✅ Через кнопку Reset                                                                 |
| **Светодиоды**           | ✅                                                                                    |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами                                             |
| **Перезагрузка модема**  | ❌                                                                                    |
| **Встроенное хранилище** | ✅ 55.2МБ, можно установить Entware                                                   |

## Установка Breed

1. **Установка OpenWRT.** Установите OpenWRT для вашего устройства согласно информации на официальном сайте.
2. **Сохранение калибровок.** Сохраните `EEPROM/factory/mtd2` с вашего устройства.
3. **Установка пакета.** Обеспечьте роутер интернетом и установите пакет `kmod-mtd-rw`.
4. **Запись загрузчика.** Откройте консоль, подключитесь к роутеру по SSH. В `HFS` разверните `breed.bin` и выполните команды:

```shell
cd /tmp
wget http://192.168.1.2/breed.bin
insmod mtd-rw i_want_a_brick=1
mtd unlock /dev/mtd0
mtd write /tmp/breed.bin boot
reboot
```

5. **Резервная копия.** Перейдите в Breed по адресу `192.168.1.1` и сделайте `Full`-бэкап на случай отката на сток.

   ![Резервная копия Full в Breed](/assets/images/wiki/guides/Xiaomi/breed.jpg)

## Установка Keenetic

1. **Раздача файлов.** Запустите `HFS`, поместив в него все файлы из архива, а также ваши калибровки (`EEPROM/factory/mtd2`). В калибровки предварительно должны быть записаны правильные MAC-адреса с помощью [онлайн-сервиса](https://yeezyio.github.io/).

   ![Файлы прошивки в HFS](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)

2. **Прошивка через TelNet.** Запустите Putty, зайдите по TelNet (`192.168.1.1` port `23`) и вставляйте (ПКМ) команды по очереди, дожидаясь выполнения предыдущей.

   ::: warning
   • Предварительно отключите брандмауэр и антивирус вашей ОС.
   <br/>• Сообщения **skipped bad blocks** и **Flash erasure failed with -5** после ввода команд являются нормой.
   :::

   ::: danger ВНИМАНИЕ
   • Каждая строка — это **отдельная команда**. Если она не выполнилась, повторите снова.
   <br/>• Сравните IP в командах `wget` ниже с IP, указанным в HFS. В загрузчике Breed он всегда начинается на `192.168.1.xxx`.
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
![Вывод консоли Breed](/assets/images/wiki/guides/TP-Link-EC330/breedlog.png)
:::

После перезагрузки устройство запустится в KeeneticOS.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1`<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::
