# SmartBox Turbo (Plus) <YezBadge type="keenetic" text="5.1.5" url="/assets/files/firmware/SmartBox_Turbo.7z" />

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
| **Работоспособность**                                                                                 | ✅ Кроме: <br/> ❌ Облачных сервисов <br/> 🧩 [Компоненты](/wiki/helpful/components.md) |
| **Сброс настроек**                                                                                    | ✅ Через кнопку Reset                                                                                          |
| **Светодиоды**                                                                                        | ✅                                                                                                             |
| **Совместимость в Mesh**                                                                              | ✅ С оригинальными устройствами и клонами                                                                      |
| **Встроенное хранилище**                                                                              | ✅ 55.2МБ, можно установить Entware                                                                            |
| **[Перезагрузка модема](https://4pda.to/forum/index.php?showtopic=943587&view=findpost&p=107596325)** | ✅ Требует доработок                                                                                           |

## Обновление прошивки

Для обновления воспользуйтесь любым способом для [NAND-памяти](/wiki/helpful/updateFirmware#для-nand-памяти-от-128mb).

### Установка загрузчика KeenBOOT и подготовка EEPROM

1. **Установка OpenWrt.** Установите [OpenWrt](https://openwrt.org/toh/beeline/smartbox_turbo_plus#oem_easy_installation).
2. **Сохранение калибровок.** Сохраните из LuCI (вкладка `System - Backup / Flash firmware`) раздел `factory` (он же `eeprom`).
3. **Подготовка EEPROM.** Откройте [инструмент «Внести MAC»](/wiki/helpful/tools#converter), загрузите EEPROM из предыдущего шага и укажите MAC-адрес с наклейки. Скачайте созданный `eeprom.bin`.
4. **Подготовка архива.** Добавьте в папку подготовленный EEPROM.
5. **Установка пакета.** Установите пакет `kmod-mtd-rw` или выполните обновление файлом `openwrt-sysupgrade.bin` — в нём пакет уже содержится.
6. **Установка загрузчика.** Откройте `KeenBOOT-SB_Turbo.bin` для своей модели из архива в `HFS.exe`.
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
   wget http://192.168.1.2/KeenBOOT-SB_Turbo.bin
   insmod mtd-rw i_want_a_brick=1
   mtd unlock /dev/mtd0
   mtd write /tmp/KeenBOOT-SB_Turbo.bin u-boot
   reboot
   ```

9. Зайдите в загрузчик KeenBOOT, зажав кнопку Reset.
10. Загрузите `Firmware`, `EEPROM`, `U-Config` из архива по очереди через веб-интерфейс для модели Turbo или Turbo Plus по [инструкции](/wiki/helpful/keenboot#установка-прошивки).
11. Перезагрузитесь в систему.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::