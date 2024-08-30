# SmartBox Flash <YezBadgeWithDropdown type="keenetic" text="4.1.7" url="/assets/files/firmware/SmartBox-Flash-4.1.7.7z" :versions="[{ text: '4.0.7', url: '/assets/files/firmware/SmartBox-Flash-4.0.7.zip' }]"/>

![альтернативный текст](/assets/images/wiki/guides/SmartBox/flash.png)

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

## Установка с нуля

1. Скачать архив, запустить `Start_Flash.bat`
2. Если текущая прошивка выше 1.00.16, скрипт об этом скажет, в папке data есть `SmartBoxFlash_1.00.13_sign.trx` для отката обычным обновлением через веб-интерфейс. Скрипт так же запишет ваш eeprom в папку /firmware
3. В папке с прошивкой перетягиваем все bin файлы на HFS.exe.
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
4. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
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
flash write 0x180000 0x80001000 0x192b02e
flash write 0x4140000 0x80001000 0x192b02e

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

::: tip Правый контакт R85 (не снимая резистор) можно использовать с пятаком около маркировки R1389 (сняв резистор)
Вместо резистора R85 можно использовать свободную площадку R82, однако следует учесть, что на некоторых партиях плата может быть некачественной, и площадка может легко оторваться. Рекомендуем использовать R85. Также, вместо резистора 1389, средний вывод конвертера является не менее актуальной альтернативой.
:::
![альтернативный текст](/assets/images/wiki/helpful/usb-mod/flash-1.jpg){width=300px height=100px}
<br/>![альтернативный текст](/assets/images/wiki/helpful/usb-mod/flash-2.jpg){width=300px height=100px}
<br/>![альтернативный текст](/assets/images/wiki/helpful/usb-mod/flash-3.jpg){width=300px height=100px}