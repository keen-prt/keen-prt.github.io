# Breed Bootloader
![альтернативный текст](/assets/images/wiki/helpful/breed/main.png)

Альтернативный загрузчик для маршрутизаторов на базе процессоров, таких как Broadcom и MediaTek. Его основная функция — управление загрузкой операционной системы маршрутизатора, а также предоставление дополнительных возможностей для управления устройством на низком уровне.

Все версии загрузчика доступны на ресурсе его автора, [HackPascal](https://breed.hackpascal.net/)

## Какую версию выбрать

Для устройств с флэш-накопителем NAND и CPU MT7621 `breed-mt7621-xiaomi-r3g.bin`

Для SPI/MT7621 `breed-mt7621-jd-cloud-1.bin`

Для SPI/MT7628 `breed-mt7628-hiwifi-hc5661a.bin`

::: danger ВНИМАНИЕ
Подходите внимательно к выбору загрузчика, при выборе неподходящего загрузчика роутер не включится, восстановление только через программатор
:::

Так же есть модифицированные версии загрузчика, предназначенные для конкретных устройств:

| Роутер                          | Ссылка на загрузчик             |
|---------------------------------|---------------------------------|
| **SmartBox Giga**               | [Скачать](https://vk.cc/czhVZL) |
| **SmartBox Flash/MTS WG430223** | [Скачать](https://vk.cc/czhVXy) |
| **SmartBox Pro/WiFire S1500**   | [Скачать](https://vk.cc/czhW31) |
| **SmartBox Turbo+**             | [Скачать](https://vk.cc/czhW5P) |
| **Xiaomi Mi Router 4**          | [Скачать](https://vk.cc/czhW8Z) |
| **TP-Link EC330-G5u**           | [Скачать](https://vk.cc/czhVz4) |

В наших модифицированных загрузчиках выполненных в содружестве со [zbancam](https://4pda.to/forum/index.php?showuser=9098171), сделаны следующие патчи:<br/>
• Кнопка Reset настроена на вход в загрузчик удержанием при включении<br/>
• Смещения корректно настроены для бэкапа EEPROM из веб-интерфейса загрузчика уже прошитого Keenetic<br/>
• Прописаны необходимые autoboot команды для каждой модели<br/>

::: tip Обратите внимание
Модифицированные загрузчики уже содержаться в архивах с портированными прошивками
:::

## Как обновить загрузчик

::: danger ВНИМАНИЕ
**Не обновляйте загрузчик если у вас всё работает**
:::

<br/>
Способ #1 <Badge type="keenetic" text="Автоматический, рекомендуемый"></Badge><br/>

Перейти в раздел `Upgrade`, выбрать файл загрузчика в `Bootloader` и нажать `Upload`
![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)

Способ #2 <Badge type="keenetic" text="Ручной" /><br/>
::: danger **Все действия на свой страх и риск**
Ручная перезапись загрузчика может завершиться неудачно, дальнейшее восстановление возможно только через программатор и [дамп](/wiki/helpful/files). Используйте этот способ в крайнем случае
:::

````shell
wget http://192.168.1.2/bootloader.bin
````
````shell
flash erase 0x0 0x80000
````
````shell
flash write 0x0 0x80001000 0x80000
````
````shell
reset
````

## Как зайти в загрузчик Breed?

### Способ #1

- Зажать Reset и подать питание на роутер. Спустя 5-8 секунд зайти на `192.168.1.1` с устройства, подключённого в LAN порт роутера

### Способ #2

- Запустить BreedEnter.exe -> нажать одну единственную кнопку -> включить роутер в розетку предварительно подключив LAN в ПК -> программа выдаст сообщение -> открыть `192.168.1.1`


## Система не загружается дальше загрузчика Breed

Через `TelNet` введите команду

````shell
abstatus
````

• `Autoboot command has been successfully executed / Firmware boot failed.`<br/>
Прошивка загружена некорректно, для решения воспользуйтесь [3 способом](/wiki/helpful/updateFirmware#способ-3) если у вас NAND память<br/>

• `Autoboot was interrupted by button press.`<br/>
Кнопка Reset была зажата при включении. Если кнопка не нажималась, выполните откат на другую версию Breed, или версию для другого устройства

````shell
Boot and Recovery Environment for Embedded Devices
Copyright (C) 2021 HackPascal <hackpascal@gmail.com>
Build date 2021-12-16 [git-839fb85]
Version 1.1 (r1338)

Starting breed built-in shell

breed> abstatus
abstatus
Autoboot command has been successfully executed / Firmware boot failed.
````