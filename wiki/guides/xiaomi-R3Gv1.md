# Xiaomi Mi Router 3G v1 <YezBadge type="keenetic" text="4.2.2" url="/assets/files/firmware/Xiaomi-R3Gv1-4.2.2.7z" />

::: tip **Статус устройства: Active**
**Active** — ведётся портирование новых версий
:::

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/R3Gv1.jpg)

## Характеристики

| Особенность       | Описание                             |
|-------------------|--------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz     |
| **Flash MB**      | 128NAND                              |
| **RAM MB**        | 256                                  |
| **Ethernet**      | 10/100/1000 Mbps x3 (1x WAN, 2x LAN) |
| **USB**           | 1x 3.0                               |
| **WLAN Hardware** | MediaTek MT7603EN, MediaTek MT7612EN |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM      |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM        |

## Особенности сборки

| Особенность              | Описание                                          |
|--------------------------|---------------------------------------------------|
| **Работоспособность**    | ✅ кроме Мобильного приложения, KeenDNS            |
| **Сброс настроек**       | ✅ через кнопку Reset                              |
| **Светодиоды**           | ✅                                                 |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами          |
| **Перезагрузка модема**  | ✅                                                 |
| **Компоненты**           | [Максимальный набор](/wiki/helpful/components.md) |

## Обновление прошивки
::: warning • Если у вас уже был установлен Keenetic не нашей модификации, пожалуйста, выполните установку начисто с 4 шага в блоке [Установка](/wiki/guides/xiaomi-R3Gv1#установка-со-стоковои-прошивки). Полученный EEPROM после бэкапа поместите в папку с пришивкой 
**• Восстановление из предыдущего файла конфигурации (startup-config) не рекомендуется!**
:::
Для обновления воспользуйтесь любым способом для [NAND памяти](/wiki/helpful/updateFirmware#для-nand-памяти-от-128mb)

## Установка со стоковой прошивки

1. В архиве запускаем !Start.bat в папке `Установка Breed`
2. Поочерёдно выбираете пункты от 1 до 4.

   ![альтернативный текст](/assets/images/wiki/guides/Xiaomi/install.png)

3. В папке `data` будет бэкап в файле `factory`, его конвертируем для Keenetic через [онлайн-сервис](https://yeezyio.github.io/) выбрав `Вырезанный EEPROM` с указанием вашего MAC с этикетки. Полученный файл поместите в папку с прошивкой

4. Перейдите в Breed по адресу 192.168.1.1. и сделайте `EEPROM` и `Full` бэкап на случай отката на сток. 
   ![альтернативный текст](/assets/images/wiki/guides/Xiaomi/breed.jpg)
5. В папке с прошивкой перетягиваем все `bin` файлы (U-Config, U-State, EEPROM, Xiaomi-R3G_xxx) на `!HFS.exe`
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
6. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
   выполнения предыдущей команды.
   ::: warning
   • Предварительно отключите Брандмауэр и Антивирус вашей ОС
   <br/>• Сообщения **skipped bad blocks** и **Flash erasure failed with -5** после ввода команд являются нормой
   :::
   ::: danger ВНИМАНИЕ
   •Каждая строка это **отдельная команда**. Если она не выполнилась, повторить снова.
   <br/>•Cравните IP в командах wget ниже с IP указанным в HFS, в загрузчике Breed он всегда начинается на
   192.168.1.xxx
   :::

```shell
flash erase 0x80000 0x7f00000

wget http://192.168.1.2/u-config.bin
flash write 0x80000 0x80001000 0x80000
flash write 0x4040000 0x80001000 0x80000

wget http://192.168.1.2/eeprom.bin
flash write 0x100000 0x80001000 0x40000
flash write 0x40c0000 0x80001000 0x40000

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
