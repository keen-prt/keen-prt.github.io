# Netis N6 AX1800 <YezBadge type="keenetic" text="4.2.3" url="/assets/files/firmware/Netis-N6-4.2.3.7z" />

::: tip **Статус устройства: Active**
**Active** — ведётся портирование новых версий
:::

![альтернативный текст](/assets/images/wiki/guides/NetisN6/netisn6.png){width=500px height=100px}

## Характеристики

| Особенность       | Описание                               |
|-------------------|----------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz       |
| **Flash MB**      | 128NAND                                |
| **RAM MB**        | 256                                    |
| **Ethernet**      | 10/100/1000 Mbps x5 (1x WAN, 4x LAN)   |
| **USB**           | 1x 3.0                                 |
| **WLAN Hardware** | MediaTek MT7905DAN + MediaTek MT7975DN |
| **WLAN 5.0GHz**   | AX, 80MHz, 2x2, 1201MB/s, 256QAM       |
| **WLAN 2.4GHz**   | AX, 40MHz, 2x2, 574MB/s, 256QAM        |

## Особенности сборки

| Особенность              | Описание                                              |
|--------------------------|-------------------------------------------------------|
| **Работоспособность**    | ✅ Кроме: <br/> • Облачных сервисов                    |
| **Сброс настроек**       | ✅ Через кнопку Reset                                  |
| **Кнопка WPS**           | ✅ Настроена как FN на любые действия в рамках системы |
| **Светодиоды**           | ✅                                                     |
| **Совместимость в mesh** | ✅ С оригинальными устройствами и клонами              |
| **Встроенное хранилище** | ✅ 46.5МБ, можно установить Entware                    |
| **USB-Мод**              | ✅                                                     |
| **Компоненты**           | [Максимальный набор](/wiki/helpful/components.md)     |

## Установка

::: tip ИНФОРМАЦИЯ
**• При возникновении проблем с установкой можно воспользоваться удалённой установкой через AnyDesk на Windows 10/11, стоимость – `400₽`. Связаться со [@spatiumstas](https://t.me/spatiumstas)**<br/>
• Роутер должен быть подключен LAN-LAN в компьютер/ноутбук. Интернет отдельно получен через Wi-Fi/LAN (раздать с телефона или другого роутера)
:::

## Установка со стоковой прошивки

1. Установить `FACTORY_N6_OpenWRT.bin` из папки `Установка Breed` поверх стоковой прошивки простым обновлением. 

      Если OpenWRT стоял ранее, выполните сброс настроек

   ![альтернативный текст](/assets/images/wiki/guides/NetisN6/OpenWRT_install.png)

   ::: warning Если после установки открывается Recovery, установите из него же `2_FACTORY_N6_OpenWRT.bin`
   :::

2. После запуска OpenWRT запускаем `!Start.bat` **из под Windows 10/11**.

   Скрипт сделает бэкап EEPROM в папку `Keenetic`. Установит и выполнит перезагрузку в загрузчик Breed.

   ![альтернативный текст](/assets/images/wiki/guides/NetisN6/script.png)

3. Зайти в загрузчик Breed по адресу **[192.168.1.1](http://192.168.1.1)** и сделать `Full dump` бэкап на случай отката прошивки.

   ![альтернативный текст](/assets/images/wiki/guides/NetisN6/breed1.jpg)

4. В папке с `Keenetic` перетягиваем все `bin` файлы на `HFS.exe`
   ![альтернативный текст](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)
5. Запускаем Putty, заходим по TelNet (192.168.1.1 port 23) и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
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
::: details Как убедиться что всё прошилось корректно
В разделе `Settings` будут указаны сервисные данные устройства (их наличия достаточно, некоторые поля могут быть с другими значениями)
![альтернативный текст](/assets/images/wiki/guides/Xiaomi/breed-env.png)
В разделе `MAC address` будет ваш MAC-адрес с этикетки устройства, или тот, который вы указывали в конвертере (разница может быть в +- 1 символ в конце)
![альтернативный текст](/assets/images/wiki/guides/Xiaomi/breed-mac.png)
:::
После перезагрузки устройство запустится в Keenetic
::: tip 192.168.1.1<br/>SSID: Keenetic<br/>Password: 12345678
:::

## Скриншоты

![альтернативный текст](/assets/images/wiki/guides/NetisN6/system1.png){width=600px height=100px}

![альтернативный текст](/assets/images/wiki/guides/NetisN6/system2.png){width=600px height=100px}