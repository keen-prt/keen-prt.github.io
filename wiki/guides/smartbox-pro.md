# SmartBox Pro <YezBadgeWithDropdown type="keenetic" text="4.1.7" url="/assets/files/firmware/SmartBox-Pro-4.1.7.7z" :versions="[{ text: '4.0.7', url: '/assets/files/firmware/SmartBox-Pro-4.0.7.7z' }]"/>

![альтернативный текст](/assets/images/wiki/guides/SmartBox/pro.png)

## Особенности сборки

| Особенность              | Описание                                                     |
|--------------------------|--------------------------------------------------------------|
| **Работоспособность**    | ✅ кроме Мобильного приложения, KeenDNS и <br/>❗ LAN4 порта ❗ |
| **Сброс настроек**       | ✅ через кнопку Reset                                         |
| **Светодиоды**           | ✅                                                            |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами                     |
| **USB-Мод**              | ✅                                                            |

## Обновление прошивки

Для обновления воспользуйтесь любым из [способов](/wiki/helpful/updateFirmware.md)

## Установка

1. [Установить Breed](https://4pda.to/forum/index.php?showtopic=943587&st=220#Spoil-87251265-1), сохранить все файлы бекапа
2. Файл `factory (он же mtd2)` сконвертировать в валидный eeprom для Keenetic через [онлайн-сервис](https://yeezyio.github.io/) с указанием вашего MAC с этикетки.
3. Распаковать архив, добавить в папку полученный eeprom из 2 шага.
4. Переводим физический переключатель с ROUT на REP
5. Обязательно обновляем Breed (bootloader.bin) на тот что лежит в архиве. Upgrade -> bootloader -> automatic reboot. В дальнейшем попасть в него можно с зажатой Reset при включении или программой BreedEnter
6. В папке перетягиваем все.bin файлы на hfs.exe.
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
7. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
   выполнения предыдущей команды.
   ::: warning
   • Предварительно отключите Брандмауэр и Антивирус вашей ОС
   <br/>• Сообщения **skipped bad blocks** после ввода команд являются нормой
   :::
   ::: danger ВНИМАНИЕ
   •Каждая строка это **отдельная команда**. Если она не выполнилась, повторить снова.
   <br/>•Cравните IP в командах wget ниже с IP указанным в HFS, в загрузчике Breed он всегда начинается на
   192.168.1.xxx
   :::

```shell
flash erase 0x80000 0xff80000

wget http://192.168.1.2/u-config.bin
flash write 0x80000 0x80001000 0x80000
flash write 0x8040000 0x80001000 0x80000

wget http://192.168.1.2/eeprom.bin
flash write 0x100000 0x80001000 0x40000
flash write 0x80c0000 0x80001000 0x40000

wget http://192.168.1.2/firmware.bin
flash write 0x180000 0x80001000 0x19DE13E
flash write 0x8140000 0x80001000 0x19DE13E

wget http://192.168.1.2/u-state.bin
flash write 0x7fc0000 0x80001000 0x80000

env set autoboot.command "boot flash 0x8140000"
env save
reset
```

::: details Примерный вывод консоли
![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/breedlog.png)
:::
После перезагрузки устройство запустится в Keenetic
::: tip 192.168.1.1<br/>SSID: Keenetic<br/>Password: 12345678
:::
