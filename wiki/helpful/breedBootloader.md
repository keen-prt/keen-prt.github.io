# Breed Bootloader

Альтернативный загрузчик для маршрутизаторов на базе процессоров Broadcom и MediaTek.

Все версии загрузчика доступны на сайте автора — [HackPascal](https://breed.hackpascal.net/).

![альтернативный текст](/assets/images/wiki/helpful/breed/main.png)

## Какую версию выбрать

- Для устройств с NAND-флеш-памятью и процессором MT7621: `breed-mt7621-xiaomi-r3g.bin`.
- Для SPI/MT7621: `breed-mt7621-jd-cloud-1.bin`.
- Для SPI/MT7628: `breed-mt7628-hiwifi-hc5661a.bin`.

::: danger ВНИМАНИЕ
Внимательно выбирайте загрузчик: неподходящая версия может привести к неработоспособности роутера. Восстановление в таком случае возможно только через программатор.
:::

Также доступны модифицированные версии загрузчика для конкретных устройств:

| Роутер                          | Ссылка на загрузчик                                            |
| ------------------------------- | -------------------------------------------------------------- |
| **Netis N6**                    | [Скачать](/assets/files/breed/Breed(r1416)-Netis-N6.bin)       |
| **SmartBox Giga**               | [Скачать](/assets/files/breed/Breed(r1416)-Giga.bin)           |
| **SmartBox Flash/MTS WG430223** | [Скачать](/assets/files/breed/Breed(r1416)-Flash-WG430223.bin) |
| **SmartBox Pro/WiFire S1500**   | [Скачать](/assets/files/breed/Breed(r1416)-SBPro-S1500.bin)    |
| **SmartBox Turbo+**             | [Скачать](/assets/files/breed/Breed(r1416)-Turbo+.bin)         |
| **Xiaomi Mi Router 3P/3G/4**    | [Скачать](/assets/files/breed/Breed(r1416)-Xiaomi-3P-3G-4.bin) |
| **TP-Link EC330-G5u**           | [Скачать](/assets/files/breed/Breed(r1416)-EC330.bin)          |

В модифицированных загрузчиках, подготовленных совместно со [zbancam](https://4pda.to/forum/index.php?showuser=9098171), внесены следующие изменения:

- Кнопка Reset настроена на вход в загрузчик при удержании во время включения.
- Смещения настроены для сохранения резервной копии EEPROM из веб-интерфейса загрузчика на уже прошитом Keenetic.
- Для каждой модели заданы необходимые команды автозагрузки.

::: tip Обратите внимание
Модифицированные загрузчики уже содержатся в архивах с прошивками
:::

## Как зайти в загрузчик

### Способ #1

- Зажмите Reset и подайте питание на роутер. Через 5–8 секунд откройте `192.168.1.1` с устройства, подключённого к LAN-порту роутера.

### Способ #2

- Используйте [BreedEnter](/wiki/helpful/breedBootloader#breedenter).

## Как обновить загрузчик

::: danger ВНИМАНИЕ
**Не обновляйте загрузчик, если всё работает.**
:::

### Способ #1 <Badge type="keenetic" text="Автоматический, рекомендуемый"></Badge><br/>

Перейдите в раздел `Upgrade`, выберите файл загрузчика в поле `Bootloader` и нажмите `Upload`.
![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)

### Способ #2 <Badge type="keenetic" text="Ручной" /><br/>

::: danger **Все действия на свой страх и риск**
Ручная перезапись загрузчика может завершиться неудачно. Дальнейшее восстановление будет возможно только через программатор и [дамп](/wiki/helpful/files). Используйте этот способ лишь в крайнем случае.
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

#### Прерывание запуска системы

1. Установите `WinPcap` из архива.

2. Запустите `BreedEnter.exe` от имени администратора и нажмите в нём единственную кнопку.
   ![альтернативный текст](/assets/images/wiki/helpful/faq/breed.png)

3. Подключите роутер к ПК кабелем.

4. Подайте питание на роутер.

::: tip Дождитесь уведомления в программе. Если его нет, попробуйте снова
:::
![альтернативный текст](/assets/images/wiki/helpful/faq/breedsuccess.png)

5. Откройте в браузере [192.168.1.1](http://192.168.1.1).

![альтернативный текст](/assets/images/wiki/helpful/breed/main.png)
