# Ответы на вопросы

## 1. Как выполнить сброс к заводским?

- [Удерживайте кнопку Reset 10–15 секунд при запущенной системе, либо выполните сброс через веб-интерфейс](https://help.keenetic.com/hc/ru/articles/360000501620-%D0%A1%D0%B1%D1%80%D0%BE%D1%81-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BA-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0-%D0%B8-%D0%BF%D0%B0%D1%80%D0%BE%D0%BB%D1%8F-%D0%B0%D0%B4%D0%BC%D0%B8%D0%BD%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%82%D0%BE%D1%80%D0%B0).

## 2. Как добавить/удалить компоненты?

- Никак: все сборки уже содержат [максимально доступный набор](/wiki/helpful/components.md). Разметка памяти различается между моделями, поэтому добавить все компоненты невозможно. Просмотр установленных компонентов из системы недоступен.

## 3. Нет переключателя скорости USB порта

- На моделях с USB 3.0 переключатель может отсутствовать в веб-интерфейсе. Для смены режима порта выполните команду в [CLI](http://192.168.1.1/a):

Для переключения на USB 2.0:
```shell 
system set dev.usb.force_usb2 1
system configuration save
````
Для переключения на USB 3.0:
```shell 
system set dev.usb.force_usb2 0
system configuration save
````

## 4. Как захватить в Mesh?

- Переведите устройство в режим ретранслятора по [официальной инструкции, затем выполните захват](https://help.keenetic.com/hc/ru/articles/360016059839-%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F-Wi-Fi-%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D1%8B-%D0%BD%D0%B0-%D0%B1%D0%B0%D0%B7%D0%B5-%D0%B4%D0%B2%D1%83%D1%85-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%BE%D0%B2-Keenetic).

::: tip
• Mesh можно настроить как с оригинальными роутерами, так и с клонами.

• Убедитесь, что сервисные данные устройств различаются — это необходимо для захвата в Mesh.

• Для захвата прошитых устройств лучше использовать кабель. После успешного захвата его можно отключить: соединение переключится на Wi-Fi.
:::
При возникновении проблем ознакомьтесь с [разделом решения проблем](/wiki/helpful/mesh#решение-проблем).

## 5. Можно обновлять официальной прошивкой?

- Нет. После самостоятельного обновления прошивка может перезаписать загрузчик, и устройство больше не запустится. Для восстановления понадобятся UART или программатор.

## 6. Установлен официальный загрузчик
::: info
Если установлен официальный загрузчик и нет возможности заменить его обычным способом:
:::
1. Скачайте файл [NAND Breed rewrite](/wiki/helpful/files).
2. В запущенной системе загрузите его как [обновление](/wiki/helpful/updateFirmware#способ-2).
3. После перезагрузки войдите в [Breed](/wiki/helpful/keenboot#вход-в-загрузчик) и загрузите необходимые файлы по инструкции для своей модели.

::: tip
Если на роутере не хватает места для Entware или он не запускается, подключитесь по TFTPD64/UART и замените загрузчик.
:::
::: tip
На SmartBox Flash родной загрузчик требует имя файла `KN-1810_recovery.bin` для TFTPD64
:::

## 7. Система не загружается дальше Breed

Введите в Telnet команду:

````shell
abstatus
````

а) `Autoboot command has been successfully executed / Firmware boot failed.`<br/>
Прошивка загружена некорректно. На устройствах с NAND-памятью используйте [способ № 3](/wiki/helpful/updateFirmware#способ-3).<br/>

б) `Autoboot was interrupted by button press.`<br/>
Кнопка Reset была зажата при включении. Если кнопку не нажимали, откатитесь на другую версию Breed или используйте версию для другого устройства.

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
в) Если все разделы прошиты корректно, но есть bad-блоки, попробуйте загрузить систему с другого слота.

Для переключения в первый слот введите команды в Telnet:

````shell
env set autoboot.command "boot flash 0x180000"
````
````shell
env save
````
Для переключения во второй слот введите команды в Telnet:
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

## 8. При запуске установщика ошибка WebView2

Запустите PowerShell от имени администратора и выполните команду:
````shell
Invoke-WebRequest -Uri "https://msedge.sf.dl.delivery.mp.microsoft.com/filestreamingservice/files/cd85e594-6b6d-4efb-ae8c-3563a0a78bfc/MicrosoftEdgeWebview2Setup.exe" -OutFile "$env:TEMP\WebView2Installer.exe" ; Start-Process -FilePath "$env:TEMP\WebView2Installer.exe" -ArgumentList "/silent /install" -Wait ; Remove-Item "$env:TEMP\WebView2Installer.exe"
````
