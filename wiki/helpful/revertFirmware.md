# Откат прошивки

## MediaTek MT7981 <Badge type="keenetic" text="SPI NAND Flash" />

1. Если у вас нет полной резервной копии размером 128 МБ, объедините заводские разделы с помощью [Merger](https://osvault.keeneticported.dev/files/Merger.exe) или выполните команду в терминале:

```` shell
copy /b mtd0.bin+mtd1.bin+mtd2.bin+mtd8.bin+mtd5.bin+mtd6.bin+mtd7.bin full_dump.bin
````
> ⚠️ Для Xiaomi AX3000T размер файла составит 5,6 МБ: он содержит все разделы, необходимые до прошивки.

2. Войдите в загрузчик [KeenBOOT](/wiki/helpful/keenboot).
3. В разделе `Обновление` загрузите файл резервной копии как `Полный образ (Single Image)`.

![альтернативный текст](/assets/images/wiki/guides/Cudy/revert.png)

::: warning
На `Xiaomi AX3000T` после перезапуска восстановите устройство через MiWiFi Repair Tool
:::

## MediaTek MT7622 <Badge type="keenetic" text="SPI NAND Flash" />

1. Используя файлы и шаги из [инструкции по восстановлению](/wiki/guides/ax6s#восстановление-обновление), поместите в папку образ OpenWrt, предварительно переименовав файлы в `AX6S_recovery.bin` и `KN-1811_recovery.bin`.
2. После запуска OpenWrt загрузите и запишите заводские резервные копии во флеш-память.

::: details Команды
```shell
opkg update
opkg install kmod-mtd-rw
insmod mtd-rw i_want_a_brick=1
cd /tmp/


mtd unlock /dev/mtd2
mtd write /tmp/mtd3_uboot.bin u-boot

mtd unlock /dev/mtd3
mtd write /tmp/mtd4_Nvram.bin u-boot-env

mtd unlock /dev/mtd4
mtd write /tmp/mtd5_Bdata.bin bdata

mtd unlock /dev/mtd5
mtd write /tmp/mtd6_Factory.bin factory
```
:::
3. После перезагрузки устройства используйте `MIWIFIRepairTool` для установки заводской прошивки.

## MediaTek MT7628/MT7621

### Способ #1  <Badge type="keenetic" text="NAND Flash" />
1. Установите [KeenBOOT](/wiki/helpful/keenboot) версии 1.4 или новее.
2. В разделе `Обновление` загрузите файл резервной копии как `Полный образ (Single Image)`.

![альтернативный текст](/assets/images/wiki/helpful/keenboot/full.png)

3. Загрузите резервную копию устройства.
::: danger
Размер полной резервной копии устройства должен составлять **128 МБ (134 217 728 байт)**.
:::
::: tip 
Если после восстановления роутер загрузился в Breed, установите заводской загрузчик для вашей модели (см. пункт 7 ниже).
[Архив стоковых загрузчиков MT7621](https://osvault.keeneticported.dev/files/uboot_stock_backups.7z)
:::

### Способ #2 <Badge type="keenetic" text="NAND Flash" />
1. Откройте резервную копию в [HxD](https://mh-nexus.de/en/hxd/).
2. Выделите первый фрагмент, содержащий загрузчик Breed, и удалите его.

![альтернативный текст](/assets/images/wiki/guides/NetisN6/revert.png)

![альтернативный текст](/assets/images/wiki/guides/NetisN6/revert-2.png)

3. Сохраните полученный файл. Его размер должен составлять **127 МБ (133 693 440 байт)**.
4. Войдите в загрузчик Breed ([как?](/wiki/helpful/breedBootloader#как-заити-в-загрузчик-breed)) по адресу `192.168.1.1`.
5. Добавьте резервную копию в HFS.
6. В PuTTY выполните команды для очистки и записи резервной копии.

````shell
wget http://192.168.1.2/full.bin
````
````shell
flash erase 0x80000 0x7f00000
````
````shell
flash write 0x80000 0x80001000 0x7f80000
````

7. Перейдите в раздел `Upgrade`, выберите файл заводского загрузчика в поле `Bootloader` и нажмите `Upload`.
   ![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)

### Способ #3 <Badge type="keenetic" text="SPI NOR" />

1. Войдите в загрузчик Breed ([как?](/wiki/helpful/breedBootloader#как-заити-в-загрузчик-breed)) по адресу `192.168.1.1`.
2. Загрузите резервную копию размером 16 или 32 МБ — в зависимости от объёма памяти устройства.
![альтернативный текст](/assets/images/wiki/guides/Mercusys/install.png){width=600px height=100px}<br/>
3. Перейдите в раздел `Upgrade`, выберите файл заводского загрузчика в поле `Bootloader` и нажмите `Upload`.
   ![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)
