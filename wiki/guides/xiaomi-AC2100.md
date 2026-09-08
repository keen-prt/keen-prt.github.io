# Xiaomi Redmi AC2100 <YezBadge type="keenetic" text="5.1.6" url="/assets/files/firmware/Xiaomi_AC2100.7z" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![Xiaomi Redmi AC2100](/assets/images/wiki/guides/Xiaomi/ac2100.png){width=400px height=100px}

## Характеристики

| Особенность       | Описание                            |
| ----------------- | ----------------------------------- |
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz    |
| **Flash MB**      | 128NAND                             |
| **RAM MB**        | 128/DDR3                            |
| **Ethernet**      | 3x1G LAN port + 1x1G WAN port       |
| **WLAN Hardware** | MediaTek MT7603EN, MediaTek MT7615N |
| **WLAN 5.0GHz**   | AC, 160MHz, 4x4, 1733MB/s           |
| **WLAN 2.4GHz**   | 40MHz, 2x2, 300MB/s                 |

## Особенности сборки

| Особенность              | Описание                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------ |
| **Работоспособность**    | ✅ Кроме: <br/> ❌ Облачных сервисов <br/> 🧩 [Компоненты](/wiki/helpful/components.md) |
| **Сброс настроек**       | ✅ Через кнопку Reset                                                                 |
| **Светодиоды**           | ✅                                                                                    |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами                                             |
| **Встроенное хранилище** | ✅ 55.2МБ, можно установить Entware                                                   |

## Обновление прошивки

Для обновления воспользуйтесь любым способом для [NAND-памяти](/wiki/helpful/updateFirmware#для-nand-памяти-от-128mb).

## Подготовка со стоковой прошивки

1. Установите [OpenWrt](https://openwrt.org/toh/xiaomi/xiaomi_redmi_router_ac2100#installation).
::: warning Если уже установлен загрузчик Breed:
1. Выполните бэкап раздела Full
2. Через [инструмент](/wiki/helpful/tools#cutter) извлеките EEPROM из Full, и выполните 3 шаг для внесения MAC-адреса
3. [Смените загрузчик](/wiki/helpful/keenboot#переход-с-загрузчика-breed) на KeenBOOT и продолжайте с 8 шага
:::
2. Сохраните из LuCI (вкладка `System - Backup / Flash firmware`) раздел `factory` (он же `eeprom`).
3. Откройте [инструмент «Внести MAC»](/wiki/helpful/tools#converter), загрузите EEPROM из предыдущего шага и укажите MAC-адрес с наклейки. Скачайте созданный `eeprom.bin`.
4. Добавьте в папку подготовленный EEPROM.
5. Установите пакет `kmod-mtd-rw`
6. Откройте `KeenBOOT-Xiaomi-Redmi-AC2100.bin` для своей модели из архива в `HFS.exe` или добавьте через SSH на накопитель роутера
7. Выполните по SSH:

   ```shell
   cd /tmp
   wget http://192.168.1.2/KeenBOOT-Xiaomi-Redmi-AC2100.bin
   insmod mtd-rw i_want_a_brick=1
   mtd unlock /dev/mtd0
   mtd write /tmp/KeenBOOT-Xiaomi-Redmi-AC2100.bin Bootloader
   reboot
   ```

8. Зайдите в загрузчик KeenBOOT, зажав кнопку Reset.
9.  Загрузите `Firmware`, `EEPROM`, `U-Config` из архива по очереди через веб-интерфейс по [инструкции](/wiki/helpful/keenboot#установка-прошивки).
10.   Перезагрузитесь в систему.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::