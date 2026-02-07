# Breed Bootloader

Альтернативный загрузчик для маршрутизаторов на базе процессоров, таких как Broadcom и MediaTek.

Все версии загрузчика доступны на ресурсе его автора, [HackPascal](https://breed.hackpascal.net/)

![альтернативный текст](/assets/images/wiki/helpful/breed/main.png)

## Какую версию выбрать

Для устройств с флэш-накопителем NAND и CPU MT7621 `breed-mt7621-xiaomi-r3g.bin`

Для SPI/MT7621 `breed-mt7621-jd-cloud-1.bin`

Для SPI/MT7628 `breed-mt7628-hiwifi-hc5661a.bin`

::: danger ВНИМАНИЕ
Подходите внимательно к выбору загрузчика, при выборе неподходящего загрузчика роутер не включится, восстановление только через программатор
:::

Так же есть модифицированные версии загрузчика, предназначенные для конкретных устройств:

| Роутер                          | Ссылка на загрузчик                                            |
|---------------------------------|----------------------------------------------------------------|
| **Netis N6**                    | [Скачать](/assets/files/breed/Breed(r1416)-Netis-N6.bin)       |
| **SmartBox Giga**               | [Скачать](/assets/files/breed/Breed(r1416)-Giga.bin)           |
| **SmartBox Flash/MTS WG430223** | [Скачать](/assets/files/breed/Breed(r1416)-Flash-WG430223.bin) |
| **SmartBox Pro/WiFire S1500**   | [Скачать](/assets/files/breed/Breed(r1416)-SBPro-S1500.bin)    |
| **SmartBox Turbo+**             | [Скачать](/assets/files/breed/Breed(r1416)-Turbo+.bin)         |
| **Xiaomi Mi Router 3P/3G/4**    | [Скачать](/assets/files/breed/Breed(r1416)-Xiaomi-3P-3G-4.bin) |
| **TP-Link EC330-G5u**           | [Скачать](/assets/files/breed/Breed(r1416)-EC330.bin)          |

В наших модифицированных загрузчиках выполненных в содружестве со [zbancam](https://4pda.to/forum/index.php?showuser=9098171), сделаны следующие патчи:<br/>
• Кнопка Reset настроена на вход в загрузчик удержанием при включении<br/>
• Смещения корректно настроены для бэкапа EEPROM из веб-интерфейса загрузчика уже прошитого Keenetic<br/>
• Прописаны необходимые autoboot команды для каждой модели<br/>

::: tip Обратите внимание
Модифицированные загрузчики уже содержатся в архивах с прошивками
:::

## Как зайти в загрузчик

### Способ #1

- Зажать Reset и подать питание на роутер. Спустя 5-8 секунд зайти на `192.168.1.1` с устройства, подключённого в LAN порт роутера

### Способ #2

- Использовать [BreedEnter](/wiki/helpful/breedBootloader#breedenter)

## Как обновить загрузчик

::: danger ВНИМАНИЕ
**Не обновляйте загрузчик если у вас всё работает**
:::

### Способ #1 <Badge type="keenetic" text="Автоматический, рекомендуемый"></Badge><br/>

Перейти в раздел `Upgrade`, выбрать файл загрузчика в `Bootloader` и нажать `Upload`
![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)

### Способ #2 <Badge type="keenetic" text="Ручной" /><br/>

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

## BreedEnter <YezBadge type="keenetic" text="" url="/assets/files/breed/BreedEnter.rar" />

#### Программа для прерывания запуска системы

1. Установить `WinPcap` из архива<br/>

2. Запустить `BreedEnter.exe` от имени администратора и нажать в нём единственную кнопку
   ![альтернативный текст](/assets/images/wiki/helpful/faq/breed.png)

3. Подключить роутер проводом к ПК

4. Включить роутер в розетку

::: tip Дождитесь уведомления в программе. Если его нет, попробуйте снова
:::
![альтернативный текст](/assets/images/wiki/helpful/faq/breedsuccess.png)

5. Открыть в браузере [192.168.1.1](http://192.168.1.1)

![альтернативный текст](/assets/images/wiki/helpful/breed/main.png)