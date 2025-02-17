# SmartBox Flash <BoostyBadge type="keenetic" text="4.2.6" url="/wiki/helpful/boosty"/> <YezBadgeWithDropdown type="keenetic" text="4.2.3" url="/assets/files/firmware/SmartBox-Flash-4.2.3.7z" :versions="[{ text: '4.1.7', url: '/assets/files/firmware/SmartBox-Flash-4.1.7.7z' }]"/>

::: tip **Статус устройства: Active**
**Active** — ведётся портирование новых версий
:::

![альтернативный текст](/assets/images/wiki/guides/SmartBox/flash.png)

## Характеристики

| Особенность       | Описание                             |
|-------------------|--------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz     |
| **Flash MB**      | 128NAND                              |
| **RAM MB**        | 256                                  |
| **Ethernet**      | 10/100/1000 Mbps x3 (1x WAN, 2x LAN) |
| **USB**           | 1x 3.0                               |
| **WLAN Hardware** | MediaTek MT7615DN                    |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM      |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM        |

## Особенности сборки

| Особенность              | Описание                                          |
|--------------------------|---------------------------------------------------|
| **Работоспособность**    | ✅ Кроме Мобильного приложения, KeenDNS            |
| **Сброс настроек**       | ✅ Через кнопку Reset                              |
| **Светодиод**            | 🟢 - Системный <br/>🔵 - Есть интернет            |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами          |
| **USB-Мод**              | ✅                                                 |
| **Встроенное хранилище** | ✅ 55.2МБ, можно установить Entware                |
| **Компоненты**           | [Максимальный набор](/wiki/helpful/components.md) |

## Обновление прошивки

Для обновления воспользуйтесь любым способом для [NAND памяти](/wiki/helpful/updateFirmware#для-nand-памяти-от-128mb)

## Установка со стоковой прошивки

1. Скачать архив, запустить `Start_Flash.bat`
2. Если текущая прошивка выше 1.00.16, скрипт об этом скажет, в папке data есть `SmartBoxFlash_1.00.13_sign.trx` для отката обычным обновлением через веб-интерфейс. Скрипт так же запишет ваш eeprom в папку `firmware`
3. В папке с прошивкой перетягиваем все `bin` файлы на `HFS.exe`
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
   ::: tip Для минимизации проблем с установкой, рекомендуется выставить на сетевой карте IP адрес для роутера 192.168.1.2
   ![альтернативный текст](/assets/images/wiki/helpful/breed/networkStatic.png)
   :::
4. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
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
::: details Как убедиться что всё прошилось корректно
В разделе `Settings` будут указаны сервисные данные устройства (их наличия достаточно, некоторые поля могут быть с другими значениями)
![альтернативный текст](/assets/images/wiki/guides/Xiaomi/breed-env.png)
В разделе `MAC address` будет ваш MAC-адрес с этикетки устройства, или тот, который вы указывали в конвертере (разница может быть в +- 1 символ в конце)
![альтернативный текст](/assets/images/wiki/guides/Xiaomi/breed-mac.png)
:::
После перезагрузки устройство запустится в Keenetic
::: tip URL: 192.168.1.1<br/>SSID: Keenetic<br/>Password: 12345678
:::

## USB-Mod
::: info
Mod нужен для перезагрузки USB-модема по питанию, [подробнее](https://help.keenetic.com/hc/ru/articles/115000041605-%D0%9C%D0%BE%D0%B6%D0%BD%D0%BE-%D0%BB%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%B8%D1%82%D1%8C-%D0%BF%D0%BE-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8E-USB-%D0%BC%D0%BE%D0%B4%D0%B5%D0%BC-%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BA-Keenetic-%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2%D0%B0%D0%BC%D0%B8-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0)
:::
::: tip Правый контакт R85 (не снимая резистор) можно использовать с пятаком около маркировки R1389 (сняв резистор)
Вместо резистора R85 можно использовать свободную площадку R82, однако следует учесть, что на некоторых партиях плата может быть некачественной, и площадка может легко оторваться. Рекомендуем использовать R85. Также, вместо резистора 1389, средний вывод конвертера является не менее актуальной
альтернативой.
:::
![альтернативный текст](/assets/images/wiki/helpful/usb-mod/flash-1.jpg){width=300px height=100px}

![альтернативный текст](/assets/images/wiki/helpful/usb-mod/flash-2.jpg){width=300px height=100px}

![альтернативный текст](/assets/images/wiki/helpful/usb-mod/flash-3.jpg){width=300px height=100px}
