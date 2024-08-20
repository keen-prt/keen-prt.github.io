# SmartBox Giga <YezBadgeWithDropdown type="keenetic" text="4.1.7" url="/assets/files/firmware/SmartBox-Giga-4.1.7.7z" :versions="[{ text: '4.0.7', url: '/assets/files/firmware/SmartBox-Giga-4.0.7.zip' }]"/>

![альтернативный текст](/assets/images/wiki/guides/SmartBox/giga.png){width=500px height=100px}

## Особенности сборки

| Особенность              | Описание                                 |
|--------------------------|------------------------------------------|
| **Работоспособность**    | ✅ кроме Мобильного приложения, KeenDNS   |
| **Сброс настроек**       | ✅ через кнопку Reset                     |
| **Светодиоды**           | ✅                                        |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами |
| **USB-Мод**              | ✅                                        |

## Обновление прошивки

Для обновления воспользуйтесь любым из [способов](/wiki/helpful/updateFirmware.md)

## Установка

1. [Установить Breed через сток простым обновлением](https://4pda.to/forum/index.php?showtopic=943587&st=16660#entry126244599)
2. В веб-интерфейсе Breed сохранить Backup -> FULL размером 128МБ
   ![альтернативный текст](/assets/images/wiki/guides/NetisN6/breed1.jpg)
3. [В онлайн-сервисе](https://yeezyio.github.io/) выбрать Полный дамп из Breed. На выходе получим вырезанный EEPROM
4. Сконвертировать полученный EEPROM в валидный для Keenetic через [онлайн-сервис](https://yeezyio.github.io/) выбрав Вырезанный EEPROM с указанием вашего MAC с этикетки
5. Скачать архив, распаковать, добавить в папку полученный EEPROM из предыдущего шага.
6. В папке перетягиваем все.bin файлы на hfs.exe.
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
7. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
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
flash write 0x180000 0x80001000 0x19769D2
flash write 0x4140000 0x80001000 0x19769D2

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

## USB-Mod

::: tip Убираем R153, ставим перемычку между нижней ногой 5ногой микрухи и дальним пятаком R43.
:::
![альтернативный текст](/assets/images/wiki/helpful/usb-mod/giga.jpg){width=400px height=100px}
