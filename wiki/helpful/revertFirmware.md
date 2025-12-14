# Откат прошивки

## MediaTek MT7981 <Badge type="keenetic" text="SPI NAND Flash" />

1. Склеить файлы бэкапа через [Merger](https://osvault.keeneticported.dev/files/Merger.exe) или вручную через терминал, если нет цельного файла:

```` shell
copy /b mtd0.bin+mtd1.bin+mtd2.bin+mtd8.bin+mtd5.bin+mtd6.bin+mtd7.bin full_dump.bin
````

2. Зайти в загрузчик [KeenBOOT](/wiki/helpful/keenboot) зажатием кнопки Reset
3. В разделе `Обновление` загрузить файл бэкапа как `Полный образ (Full)`.

![альтернативный текст](/assets/images/wiki/guides/WBR3000UAX/revert.png)

::: warning
На `Xiaomi AX3000T` после перезапуска требуется восстановить устройство через MiWiFi Repair Tool
:::

## MediaTek MT7628/MT7621

### Способ #1  <Badge type="keenetic" text="NAND Flash" />
1. Установить [KeenBOOT](/wiki/helpful/keenboot) версии 1.4 и выше
2. В загрузчике перейти во вкладку `Full`

![альтернативный текст](/assets/images/wiki/helpful/keenboot/full.jpg)

3. Загрузить бэкап устройства
::: tip 
Если после восстановления роутер загрузился в Breed - выполните установку родного загрузчика от вашей модели (см. п7).
[Архив стоковых загрузчиков MT7621](https://osvault.keeneticported.dev/files/uboot_stock_backups.7z)
:::

### Способ #2 <Badge type="keenetic" text="NAND Flash" />
1. Открыть свой бэкап в [HxD](https://mh-nexus.de/en/hxd/)
2. Выделить первый кусок в котором содержится загрузчик Breed и стереть

![альтернативный текст](/assets/images/wiki/guides/NetisN6/revert.png)

![альтернативный текст](/assets/images/wiki/guides/NetisN6/revert-2.png)

3. Сохранить полученный файл. Его вес будет составлять **127 МБ (133 693 440 байт)**
4. Перейти в загрузчик Breed ([`как?`](/wiki/helpful/breedBootloader#как-заити-в-загрузчик-breed)) по адресу 192.168.1.1
5. Добавить бэкап в HFS
6. В Putty ввести команды на стирание и запись бэкапа

````shell
wget http://192.168.1.2/full.bin
````
````shell
flash erase 0x80000 0x7f00000
````
````shell
flash write 0x80000 0x80001000 0x7f80000
````

7. Перейти в раздел `Upgrade`, выбрать файл вашего стокового загрузчика в `Bootloader` и нажать `Upload`
   ![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)

### Способ #1 <Badge type="keenetic" text="SPI NOR" />

1. Перейти в загрузчик Breed ([`как?`](/wiki/helpful/breedBootloader#как-заити-в-загрузчик-breed)) по адресу 192.168.1.1
2. Выполнить загрузку вашего бэкапа весом 16MB или 32MB в зависимости от объёма памяти
![альтернативный текст](/assets/images/wiki/guides/Mercusys/install.png){width=600px height=100px}<br/>
3. Перейти в раздел `Upgrade`, выбрать файл вашего стокового загрузчика в `Bootloader` и нажать `Upload`
   ![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)
