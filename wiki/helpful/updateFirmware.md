# Обновление прошивки
::: info
Файл обновления можно скачать [вручную](https://osvault.keeneticported.dev/osvault).
:::
## Официальный <Badge type="keenetic" text="Mipsel" />

> ⚠️ Для KeeneticOS 5.0.7 и выше

1. Откройте `Настройки системы`.

   ![альтернативный текст](/assets/images/wiki/helpful/updateFirmware/fw.png)
2. Загрузите файл обновления в поле `firmware`.
3. Подтвердите обновление. Устройство перезагрузится.

## NAND Flash память (от 128MB)

### Способ #1 <Badge type="keenetic" text="Рекомендуемый" />

1. [Войдите в загрузчик KeenBOOT](/wiki/helpful/keenboot#%D0%B2%D1%85%D0%BE%D0%B4-%D0%B2-%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D1%87%D0%B8%D0%BA).
2. Загрузите файл обновления через веб-интерфейс.

![альтернативный текст](/assets/images/wiki/helpful/keenboot/main.png)

### Способ #2 <Badge type="keenetic" text="Автоматический" />

- Используйте [KeenKit](/wiki/helpful/keenkit.md) с функцией `Обновить прошивку из файла` или `OTA Update`.

![альтернативный текст](/assets/images/wiki/helpful/keenkit/update-firmware.png){width=500px height=100px}


### Способ #3 <Badge type="keenetic" text="Через Breed" />

::: danger ВНИМАНИЕ
Ошибка в командах может привести к неработоспособности роутера. Внимательно следуйте инструкции.
:::

1. Войдите в Breed.
2. Запустите PuTTY и подключитесь по Telnet к `192.168.1.1` на порту `23`. Вставляйте команды правой кнопкой мыши по одной, дожидаясь завершения каждой.
3. Разместите файл прошивки в `HFS.exe`, например под именем `firmware.bin`.

::: details Команды для устройств с Flash накопителем 256MB (SmartBox Pro, Xiaomi R3P)
Выполняйте команды поочерёдно, дожидаясь завершения предыдущей.
```shell
flash erase 0x180000 0x1AB3F00
```
```shell
flash erase 0x8140000 0x1AB3F00
```
```shell
wget http://192.168.1.2/firmware.bin
```
```shell
flash write 0x180000 0x80001000 0x1AB3F00
```
```shell
flash write 0x8140000 0x80001000 0x1AB3F00
```
```shell
reset
```
:::
::: details Команды для остальных устройств
Выполняйте команды поочерёдно, дожидаясь завершения предыдущей.
```shell
flash erase 0x180000 0x1AB3F00
```
```shell
flash erase 0x4140000 0x1AB3F00
```
```shell
wget http://192.168.1.2/firmware.bin
```
```shell
flash write 0x180000 0x80001000 0x1AB3F00
```
```shell
flash write 0x4140000 0x80001000 0x1AB3F00
```
```shell
reset
```
:::

![альтернативный текст](/assets/images/wiki/helpful/updateFirmware/breedInstall.png){width=500px height=100px}

## SPI NOR память (до 32MB)

1. Войдите в Breed.
2. Откройте `Upgrade → Generic → Firmware`, выберите файл прошивки и загрузите его. Названия разделов могут отличаться в зависимости от версии Breed.
   ::: tip Внимание
   Этот раздел предназначен только для файла прошивки. Не загружайте в него полный дамп.
   :::
![альтернативный текст](/assets/images/wiki/helpful/updateFirmware/breedSPI.png)

3. После успешной загрузки роутер перезагрузится в систему.
