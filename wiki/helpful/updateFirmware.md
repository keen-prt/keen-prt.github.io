# Обновление прошивки Keenetic

## Способ #1 <Badge type="keenetic" text="Автоматический, рекомендуемый" />

• Используем [KeenKit](/wiki/helpful/keenkit.md) с функцией `OTA Update`

## Способ #2 <Badge type="keenetic" text="Ручной" />

1. Поместите файл обновления на встроенный/внешний накопитель с установленной [Entware](/wiki/helpful/entware)
2. Через `Telnet/SSH` попасть в Entware
3. Введите команду для получения информации о разделах Firmware_1/Firmware_2
```shell
cat /proc/mtd
```
4. Перезаписываем разделы и перезагружаемся
```shell
dd if=/opt/firmware.bin of=/dev/mtdblock3
dd if=/opt/firmware.bin of=/dev/mtdblock13
reboot
```
   ::: info Где 3/13 разделы `Firmware_1/Firmware_2` полученные в 3 шаге, а `/opt/firmware.sh` путь до файла помещённого в 1 шаге
   :::
   ![альтернативный текст](/assets/images/wiki/helpful/updateFirmware/manualUpdate.png)

## Способ #3 <Badge type="keenetic" text="Через Breed" />

::: danger ВНИМАНИЕ
Данный способ может окирпичить роутер, используйте его в самом крайнем случае
:::

1. Загрузиться в Breed
2. Запускаем Putty, заходим по TelNet `192.168.1.1 port 23` и дальнейшие команды вставляем(ПКМ) поочередно, ожидая
   выполнения предыдущей команды.
::: danger ВНИМАНИЕ
   Если ваш роутер имеет Flash накопитель на 256MB (не путайте с оперативной), <br>вместо `0x4140000` используйте `0x40c0000`
:::

```shell
flash erase 0x180000 0x1AB3F00 # Выполняет стирание флешки со смещения 0X180000 длиной 28МБ 0x1AB3F00
flash erase 0x4140000 0x1AB3F00 # Выполняет стирание флешки со смещения 0x4140000 длиной 28МБ 0x1AB3F00

wget http://192.168.1.2/firmware.bin # Перемещаем прошивку на роутер, предварительно развернув её в HFS
flash write 0x180000 0x80001000 0x1AB3F00 # Запись файла на флешку со смещения 0x180000 длиной 0x1AB3F00 
flash write 0x4140000 0x80001000 0x1AB3F00 # Запись файла на флешку со смещения 0x4140000 длиной 0x1AB3F00 

reset # Перезапуск роутера
   ```

![альтернативный текст](/assets/images/wiki/helpful/updateFirmware/breedInstall.png)