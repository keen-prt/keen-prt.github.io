# Ответы на вопросы

## 1. Как выполнить сброс к заводским?

- [Зажать кнопку Reset из системы на 10-15 секунд или через веб-интерфейс](https://help.keenetic.com/hc/ru/articles/360000501620-%D0%A1%D0%B1%D1%80%D0%BE%D1%81-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BA-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0-%D0%B8-%D0%BF%D0%B0%D1%80%D0%BE%D0%BB%D1%8F-%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0)

## 2. Как добавить/удалить компоненты?

- Никак, все сборки уже идут с [максимальным набором](/wiki/helpful/components.md) компонентов. Просмотр установленных компонентов из под системы недоступен

## 3. Нет переключателя скорости USB порта

- На моделях с USB 3.0 может отсутствовать переключатель в веб-интерфейсе, для переключения порта воспользуйтесь командой в [CLI](http://192.168.1.1/a):

Для перевода в USB 2.0
```shell 
system set dev.usb.force_usb2 1
system configuration save
````
Для перевода в USB 3.0
```shell 
system set dev.usb.force_usb2 0
system configuration save
````

## 4. Как захватить в Mesh?

- Для захвата переведите устройство в режим ретранслятора
  по [официальной инструкции и выполните связку](https://help.keenetic.com/hc/ru/articles/360016059839-%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F-Wi-Fi-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B-%D0%BD%D0%B0-%D0%B1%D0%B0%D0%B7%D0%B5-%D0%B4%D0%B2%D1%83%D1%85-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%BE%D0%B2-Keenetic)

::: tip • Реализовать Mesh подключение можно как с оригинальными роутерами, так и клонами

• Убедитесь что устройства имеют разные сервисные данные, необходимые для захвата Mesh

• Для захвата прошитых устройств лучше использовать кабель. После успешного захвата кабель можно отключить, соединение переключится на Wi-FI
:::
При возникновении проблем ознакомьтесь со [статьёй](/wiki/helpful/mesh#решение-проблем)

## 5. Можно обновлять официальной прошивкой?

- Нет, после самостоятельного обновления прошивка может перезаписать загрузчик и больше не запустится. Для восстановления понадобится UART или программатор

## 6. Система не загружается дальше загрузчика Breed

Через `TelNet` ввести команду

````shell
abstatus
````

а) `Autoboot command has been successfully executed / Firmware boot failed.`<br/>
Прошивка загружена некорректно, для решения воспользуйтесь [3 способом](/wiki/helpful/updateFirmware#способ-3) если у вас NAND память<br/>

б) `Autoboot was interrupted by button press.`<br/>
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
в) Если вы уверены, что все разделы прошиты корректно, но у вас есть Bad-блоки, попробуйте загрузить систему с другого слота 

Для переключения в первый слот введите команды в `TelNet`:

````shell
env set autoboot.command "boot flash 0x180000"
````
````shell
env save
````
Для переключения во второй слот введите команды в `TelNet`:
````shell
env set autoboot.command "boot flash 0x4140000"
````
````shell
env save
````
::: danger
::: details Для устройств с Flash накопителем 256MB (SmartBox Pro, Xiaomi R3P)
````shell
env set autoboot.command "boot flash 0x8140000"
````
````shell
env save
````
:::