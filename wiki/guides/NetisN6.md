# Netis N6 v1 AX1800 <BoostyBadge type="keenetic" text="5.1.2"/> <OTABadge type="keenetic" text="5.1.1 (OTA)"/> <YezBadge type="keenetic" text="5.1.1" url="/assets/files/firmware/Netis-N6.7z"/>

::: tip **Статус устройства: Active**
**Active** — ведётся портирование новых версий
:::

![Netis N6 AX1800](/assets/images/wiki/guides/NetisN6/netisn6.png){width=500px height=100px}

## Характеристики

| Особенность       | Описание                               |
| ----------------- | -------------------------------------- |
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz       |
| **Flash MB**      | 128NAND                                |
| **RAM MB**        | 256/DDR3                               |
| **Ethernet**      | 4x1G LAN port + 1x1G WAN port          |
| **USB**           | 1x 3.0                                 |
| **WLAN Hardware** | MediaTek MT7905DAN + MediaTek MT7975DN |
| **WLAN 5.0GHz**   | AX, 80MHz, 2x2, 1201MB/s, 1024QAM      |
| **WLAN 2.4GHz**   | AX, 40MHz, 2x2, 574MB/s, 256QAM        |

## Особенности сборки

| Особенность                         | Описание                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| **Работоспособность**               | ✅ Кроме: <br/> ❌ Облачных сервисов <br/> 🧩 [Компоненты](/wiki/helpful/components.md) |
| **Сброс настроек**                  | ✅ Через кнопку Reset                                                                 |
| **Кнопка WPS**                      | ✅ Настроена как FN на любые действия в рамках системы                                |
| **Светодиоды**                      | ✅ Power, Internet, USB                                                               |
| **Совместимость в mesh**            | ✅ С оригинальными устройствами и клонами                                             |
| **Встроенное хранилище**            | ✅ 46.5МБ, можно установить Entware                                                   |
| **[Перезагрузка модема](#usb-mod)** | ✅ Требует доработок                                                                  |

## Установка

Сначала установите загрузчик Breed (шаги ниже), затем выберите один из двух способов прошивки — **Способ #1** (через KeenBOOT, рекомендуется) или **Способ #2** (через Breed и TelNet).

### Установка загрузчика Breed

1. **Установка OpenWRT.** Установите `FACTORY_N6_OpenWRT.bin` из папки `Установка Breed` поверх стоковой прошивки обычным обновлением. Если OpenWRT стоял ранее — выполните сброс настроек.

   ![Установка OpenWRT через веб-интерфейс](/assets/images/wiki/guides/NetisN6/OpenWRT_install.png)

   ::: warning
   Если после установки открывается Recovery — установите из-под него `2_FACTORY_N6_OpenWRT.bin`.
   :::

2. **Запуск скрипта.** После запуска OpenWRT запустите `!Start.bat` **из-под Windows 10/11**. Скрипт сделает бэкап EEPROM в папку `Keenetic`, установит загрузчик и перезагрузится в Breed.

   ![Работа скрипта !Start.bat](/assets/images/wiki/guides/NetisN6/script.png)

3. **Резервная копия.** Зайдите в загрузчик Breed по адресу **[192.168.1.1](http://192.168.1.1)** и сделайте `Full dump` — резервную копию на случай отката прошивки.

   ![Резервная копия Full dump в Breed](/assets/images/wiki/guides/NetisN6/breed1.jpg)

### Способ #1 <Badge type="keenetic" text="Новый, рекомендуемый" />

1. Смените загрузчик на [KeenBOOT](/wiki/helpful/keenboot.md).
2. Загрузите `Firmware`, `EEPROM`, `U-Config` из архива по очереди через веб-интерфейс по [инструкции](/wiki/helpful/keenboot#установка-прошивки).
3. Перезагрузитесь в систему.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

### Способ #2 <Badge type="keenetic" text="Старый" />

1. **Раздача файлов.** В папке `Keenetic` перетащите все `bin`-файлы на `HFS.exe`.

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

wget http://192.168.1.2/EEPROM_XXX.bin
flash write 0x100000 0x80001000 0x80000
flash write 0x40c0000 0x80001000 0x80000

wget http://192.168.1.2/Firmware_N6_4.2.6.bin
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

::: details Как убедиться, что всё прошилось корректно
В разделе `Settings` будут указаны сервисные данные устройства (их наличия достаточно, некоторые поля могут отличаться).
![Сервисные данные в Breed](/assets/images/wiki/guides/Xiaomi/breed-env.png)
В разделе `MAC address` будет ваш MAC-адрес с этикетки устройства или тот, который вы указывали в конвертере (разница может быть в ±1 символ в конце).
![MAC-адрес в Breed](/assets/images/wiki/guides/Xiaomi/breed-mac.png)
:::

После перезагрузки устройство запустится в KeeneticOS.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

## Перезагрузка USB-модема (USB-Mod) {#usb-mod}

::: info
Мод нужен для перезагрузки USB-модема по питанию — [подробнее](https://help.keenetic.com/hc/ru/articles/115000041605-%D0%9C%D0%BE%D0%B6%D0%BD%D0%BE-%D0%BB%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%B8%D1%82%D1%8C-%D0%BF%D0%BE-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8E-USB-%D0%BC%D0%BE%D0%B4%D0%B5%D0%BC-%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BA-Keenetic-%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2%D0%B0%D0%BC%D0%B8-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0)
:::

![USB-Mod Netis N6, фото 1](/assets/images/wiki/helpful/usb-mod/netis-1.jpg){width=400px height=100px}

![USB-Mod Netis N6, фото 2](/assets/images/wiki/helpful/usb-mod/netis-2.jpg){width=400px height=100px}

![USB-Mod Netis N6, фото 3](/assets/images/wiki/helpful/usb-mod/netis-3.jpg){width=400px height=100px}

![USB-Mod Netis N6, фото 4](/assets/images/wiki/helpful/usb-mod/netis-4.jpg){width=400px height=100px}

![USB-Mod Netis N6, фото 5](/assets/images/wiki/helpful/usb-mod/netis-5.jpg){width=400px height=100px}

## Скриншоты

![Система KeeneticOS на Netis N6](/assets/images/wiki/guides/NetisN6/system1.png){width=600px height=100px}

![Система KeeneticOS на Netis N6](/assets/images/wiki/guides/NetisN6/system2.png){width=600px height=100px}
