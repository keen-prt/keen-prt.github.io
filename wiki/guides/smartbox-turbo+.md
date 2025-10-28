# SmartBox Turbo+ <YezBadge type="keenetic" text="4.1.7" url="/assets/files/firmware/SmartBox-Turbo+.zip" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![альтернативный текст](/assets/images/wiki/guides/SmartBox/turbo+.png){width=300px height=100px}

## Характеристики

| Особенность       | Описание                                                                      |
|-------------------|-------------------------------------------------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz                                              |
| **Flash MB**      | 128NAND                                                                       |
| **RAM MB**        | 128/DDR3                                                                      |
| **Ethernet**      | 10/100/1000 Mbps x5 (1x WAN, 4x LAN)                                          |
| **USB**           | 1x 3.0                                                                        |
| **WLAN Hardware** | MediaTek MT7603EN, MediaTek MT7615N                                           |
| **WLAN 5.0GHz**   | Keenetic: AC, 80MHz, 2x2, 867MB/s, 256QAM<br>Stock: AC, 160MHz, 4x4, 1733MB/s |
| **WLAN 2.4GHz**   | Stock: N, 40MHz, 2x2, 300MB/s                                                 |

## Особенности сборки

| Особенность                                                                               | Описание                                                    |
|-------------------------------------------------------------------------------------------|-------------------------------------------------------------|
| **Работоспособность**                                                                     | ✅ Кроме: <br/> • Облачных сервисов <br/> • 2.4Ghz диапазона |
| **Сброс настроек**                                                                        | ✅ Через кнопку Reset                                        |
| **Светодиоды**                                                                            | ✅                                                           |
| **[USB-Мод](https://4pda.to/forum/index.php?showtopic=943587&view=findpost&p=107596325)** | ✅                                                           |
| **Совместимость в Mesh**                                                                  | ✅ С оригинальными устройствами и клонами                    |
| **Встроенное хранилище**                                                                  | ✅ 55.2МБ, можно установить Entware                          |

## Обновление прошивки

Для обновления воспользуйтесь любым способом для [NAND памяти](/wiki/helpful/updateFirmware#для-nand-памяти-от-128mb)

## Подготовка

1. Устанавливаем [OpenWRT](https://openwrt.org/toh/beeline/smartbox_turbo_plus#oem_easy_installation)
2. Сохраняем из LuCi (вкладка System - Backup / Flash firmware) раздел `factory`
3. Полученный файл сконвертировать в валидный EEPROM для Keenetic. [Перемещаем калибровку](https://yeezyio.github.io/EepromMover.html), в полученном файле [меняем мак-адрес](https://yeezyio.github.io/EepromConverter.html)
4. Добавить в папку патченный EEPROM
5. `breed_turbo+.bin` из архива открываем в HFS.exe
6. По SSH выполняем команды предварительно подключив роутер к интернету:

```shell
cat /proc/mtd
```

Выводом будет:

````shell
dev:    size   erasesize  name
mtd0: 10000000 00020000 "u-boot"
````

Запоминаем название `mtd0` раздела, он будет `u-boot`, `Bootloader` или `bootloader` <br/> Используем его в последней команде вместо u-boot

```shell
opkg update
opkg install kmod-mtd-rw
cd /tmp
wget http://192.168.1.2/breed_turbo+.bin
insmod mtd-rw i_want_a_brick=1
mtd unlock /dev/mtd0
mtd write /tmp/breed_turbo+.bin u-boot
reboot
```

### Способ #1 <Badge type="keenetic" text="Новый, рекомендуемый" />

1. Сменить загрузчик на [KeenBOOT](/wiki/helpful/keenboot.md)
2. Загрузить `Firmware, EEPROM, U-Config` из архива по очереди через веб-интерфейс по [инструкции](/wiki/helpful/keenboot#установка-прошивки)
3. Перезагрузиться в систему

::: tip URL: 192.168.1.1 `admin:12345678`<br/>SSID: Keenetic<br/>Password: 12345678
:::

### Способ #2 <Badge type="keenetic" text="Старый" />
1. В папке перетягиваем все `bin` файлы на `HFS.exe`
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
   ::: tip Для минимизации проблем с установкой, рекомендуется выставить на сетевой карте IP адрес для роутера 192.168.1.2
   ![альтернативный текст](/assets/images/wiki/helpful/breed/networkStatic.png)
   :::
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
После перезагрузки устройство запустится в KeeneticOS
::: tip URL: 192.168.1.1<br/>SSID: Keenetic<br/>Password: 12345678
:::
