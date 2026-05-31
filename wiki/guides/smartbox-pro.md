# SmartBox Pro <YezBadge type="keenetic" text="4.3.6.3" url="/assets/files/firmware/SmartBox-Pro.zip" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![SmartBox Pro](/assets/images/wiki/guides/SmartBox/pro.png)

## Характеристики

| Особенность       | Описание                             |
| ----------------- | ------------------------------------ |
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz     |
| **Flash MB**      | 256NAND                              |
| **RAM MB**        | 256/DDR3                             |
| **Ethernet**      | 4x1G LAN port + 1x1G WAN port        |
| **USB**           | 2x 2.0                               |
| **WLAN Hardware** | MediaTek MT7602EN, MediaTek MT7612EN |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM      |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM        |

## Особенности сборки

| Особенность                                                                                           | Описание                                                                                                                   |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Работоспособность**                                                                                 | ✅ Кроме: <br/> • Облачных сервисов <br/> • LAN4 порта <br/> • Светодиоды <br/> • [Компоненты](/wiki/helpful/components.md) |
| **Сброс настроек**                                                                                    | ✅ Через кнопку Reset                                                                                                       |
| **Кнопка WPS**                                                                                        | ✅ Настроена как FN1                                                                                                        |
| **Переключатель ROUT - REP**                                                                          | ✅ Настроен как FN2                                                                                                         |
| **Совместимость в Mesh**                                                                              | ✅ С оригинальными устройствами и клонами                                                                                   |
| **Встроенное хранилище**                                                                              | ✅ 167МБ, можно установить Entware                                                                                          |
| **[Перезагрузка модема](https://4pda.to/forum/index.php?showtopic=943587&view=findpost&p=117545863)** | ✅ Требует доработок                                                                                                        |

## Обновление прошивки

Для обновления воспользуйтесь любым способом для [NAND-памяти](/wiki/helpful/updateFirmware#для-nand-памяти-от-128mb).

## Установка

Сначала установите загрузчик Breed и подготовьте EEPROM (шаги ниже), затем выберите один из двух способов прошивки — **Способ #1** (через KeenBOOT, рекомендуется) или **Способ #2** (через Breed и TelNet).

### Установка загрузчика Breed и подготовка EEPROM

1. **Установка пакета.** Из установленного OpenWRT поставьте пакет `kmod-mtd-rw`, предварительно открыв доступ к сети.
2. **Сохранение калибровок.** Сохраните из LuCI (вкладка `System - Backup / Flash firmware`) раздел `factory`.
3. **Конвертация EEPROM.** Полученный файл сконвертируйте в валидный EEPROM для Keenetic через [онлайн-сервис](https://yeezyio.github.io/), указав ваш MAC с этикетки. Добавьте в папку полученный `eeprom.bin`.
4. **Раздача загрузчика.** Откройте `breed.bin` из архива в `HFS.exe`.
5. **Определение раздела.** Подключите роутер к интернету и по SSH выполните команду:

   ```shell
   cat /proc/mtd
   ```

   Пример вывода:

   ```text
   dev:    size   erasesize  name
   mtd0: 10000000 00020000 "Bootloader"
   ```

   Запомните название раздела `mtd0` — оно будет `u-boot` или `Bootloader`. Используйте его в последней команде.

6. **Запись загрузчика.** Выполните по SSH:

   ```shell
   opkg update
   opkg install kmod-mtd-rw
   cd /tmp
   wget http://192.168.1.2/breed.bin
   insmod mtd-rw i_want_a_brick=1
   mtd unlock /dev/mtd1
   mtd write /tmp/breed.bin Bootloader
   reboot
   ```

### Способ #1 <Badge type="keenetic" text="Новый, рекомендуемый" />

1. Смените загрузчик на [KeenBOOT](/wiki/helpful/keenboot.md).
2. Загрузите `Firmware`, `EEPROM`, `U-Config` из архива по очереди через веб-интерфейс по [инструкции](/wiki/helpful/keenboot#установка-прошивки).
3. Перезагрузитесь в систему.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
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
flash erase 0x80000 0xff80000

wget http://192.168.1.2/u-config.bin
flash write 0x80000 0x80001000 0x80000
flash write 0x8040000 0x80001000 0x80000

wget http://192.168.1.2/eeprom.bin
flash write 0x100000 0x80001000 0x80000
flash write 0x80c0000 0x80001000 0x80000

wget http://192.168.1.2/firmware.bin
flash write 0x180000 0x80001000 0x1AB3F00
flash write 0x8140000 0x80001000 0x1AB3F00

wget http://192.168.1.2/u-state.bin
flash write 0x7fc0000 0x80001000 0x80000

env set autoboot.command "boot flash 0x180000"
env save
reset
```

::: details Примерный вывод консоли
![Вывод консоли Breed](/assets/images/wiki/guides/TP-Link-EC330/breedlog.png)
:::

После перезагрузки устройство запустится в KeeneticOS.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::
