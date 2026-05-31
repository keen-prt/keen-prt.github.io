# SmartBox Turbo (Plus) <YezBadge type="keenetic" text="4.3.6.3" url="/assets/files/firmware/SmartBox_Turbo.7z" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![SmartBox Turbo (Plus)](/assets/images/wiki/guides/SmartBox/turbo+.png){width=300px height=100px}

## Характеристики

| Особенность       | Описание                            |
| ----------------- | ----------------------------------- |
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz    |
| **Flash MB**      | 128NAND / 256NAND                   |
| **RAM MB**        | 128/DDR3 / 256/DDR3                 |
| **Ethernet**      | 4x1G LAN port + 1x1G WAN port       |
| **USB**           | 1x 3.0                              |
| **WLAN Hardware** | MediaTek MT7603EN, MediaTek MT7615N |
| **WLAN 5.0GHz**   | AC, 160MHz, 4x4, 1733MB/s           |
| **WLAN 2.4GHz**   | 40MHz, 2x2, 300MB/s                 |

## Особенности сборки

| Особенность                                                                                           | Описание                                                                                                      |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Работоспособность**                                                                                 | ✅ Кроме: <br/> • Облачных сервисов <br/> • 2.4Ghz диапазона <br/> • [Компоненты](/wiki/helpful/components.md) |
| **Сброс настроек**                                                                                    | ✅ Через кнопку Reset                                                                                          |
| **Светодиоды**                                                                                        | ✅                                                                                                             |
| **Совместимость в Mesh**                                                                              | ✅ С оригинальными устройствами и клонами                                                                      |
| **Встроенное хранилище**                                                                              | ✅ 55.2МБ, можно установить Entware                                                                            |
| **[Перезагрузка модема](https://4pda.to/forum/index.php?showtopic=943587&view=findpost&p=107596325)** | ✅ Требует доработок                                                                                           |

## Обновление прошивки

Для обновления воспользуйтесь любым способом для [NAND-памяти](/wiki/helpful/updateFirmware#для-nand-памяти-от-128mb).

## Установка

Сначала установите загрузчик KeenBOOT и подготовьте EEPROM (шаги ниже), затем выберите один из двух способов прошивки — **Способ #1** (через KeenBOOT, рекомендуется) или **Способ #2** (через Breed и TelNet).

### Установка загрузчика KeenBOOT и подготовка EEPROM

1. **Установка OpenWRT.** Установите [OpenWRT](https://openwrt.org/toh/beeline/smartbox_turbo_plus#oem_easy_installation).
2. **Сохранение калибровок.** Сохраните из LuCI (вкладка `System - Backup / Flash firmware`) раздел `factory`.
3. **Конвертация EEPROM.** Сконвертируйте полученный файл в валидный EEPROM для Keenetic: [переместите калибровку](https://yeezyio.github.io/EepromMover.html), затем в полученном файле [смените MAC-адрес](https://yeezyio.github.io/EepromConverter.html).
4. **Подготовка архива.** Добавьте в папку патченный EEPROM.
5. **Установка пакета.** Установите пакет `kmod-mtd-rw` или выполните обновление файлом `openwrt-sysupgrade.bin` — в нём пакет уже содержится.
6. **Раздача загрузчика.** Откройте `KeenBOOT-SB_Turbo_v1.5.bin` из архива в `HFS.exe`.
7. **Определение раздела.** По SSH выполните команду:

   ```shell
   cat /proc/mtd
   ```

   Пример вывода:

   ```text
   dev:    size   erasesize  name
   mtd0: 10000000 00020000 "u-boot"
   ```

   Запомните название раздела `mtd0` — оно будет `u-boot`, `Bootloader` или `bootloader`. Используйте его в последней команде вместо `u-boot`.

8. **Запись загрузчика.** Выполните по SSH:

   ```shell
   cd /tmp
   wget http://192.168.1.2/KeenBOOT-SB_Turbo_v1.5.bin
   insmod mtd-rw i_want_a_brick=1
   mtd unlock /dev/mtd0
   mtd write /tmp/KeenBOOT-SB_Turbo_v1.5.bin u-boot
   reboot
   ```

### Способ #1 <Badge type="keenetic" text="Новый, рекомендуемый" />

1. Зайдите в загрузчик KeenBOOT, зажав кнопку Reset.
2. Загрузите `Firmware`, `EEPROM`, `U-Config` из архива по очереди через веб-интерфейс для модели Turbo или Turbo Plus по [инструкции](/wiki/helpful/keenboot#установка-прошивки).
3. Перезагрузитесь в систему.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1`<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

### Способ #2 <Badge type="keenetic" text="Старый" />

1. **Раздача файлов.** В папке перетащите все `bin`-файлы на `HFS.exe`.

   ![Файлы прошивки в HFS](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)

   ::: tip
   Для минимизации проблем с установкой рекомендуется выставить на сетевой карте IP-адрес `192.168.1.2`.

   ![Статический IP на сетевой карте](/assets/images/wiki/helpful/breed/networkStatic.png)
   :::

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
