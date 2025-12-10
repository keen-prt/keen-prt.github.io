# Cudy WBR3000UAX <YezBadge type="keenetic" text="5.0.2" url="/assets/files/firmware/Cudy-WBR3000UAX.7z" />

![альтернативный текст](/assets/images/wiki/guides/WBR3000UAX/main.png){width=500px height=100px}

## Характеристики

| Особенность       | Описание                            |
|-------------------|-------------------------------------|
| **CPU**           | MediaTek MT7981B, aarch64, 1300 MHz |
| **Flash MB**      | 128NAND                             |
| **RAM MB**        | 512/DDR3                            |
| **Ethernet**      | 10/100/1000 Mbps x5 (1x WAN, 4x LAN)|
| **USB**           | 1x 3.0                              |
| **WLAN Hardware** | MediaTek MT7976CN                   |
| **WLAN 5.0GHz**   | AX, 160MHz, 2x2, 2402MB/s, 1024QAM  |
| **WLAN 2.4GHz**   | AX, 40MHz, 2x2, 574MB/s, 256QAM     |

## Особенности сборки

| Особенность              | Описание                                               |
|--------------------------|--------------------------------------------------------|
| **Работоспособность**    | ✅ Кроме: <br/> • Облачных сервисов <br/>               |
| **Сброс настроек**       | ✅ Через кнопку Reset                                   |
| **Кнопка WPS**           | ✅                                                      |
| **Светодиоды**           | ✅                                                      |
| **Перезагрузка модема**  | ✅                                                      |
| **Совместимость в mesh** | ✅ С оригинальными устройствами и клонами               |
| **Встроенное хранилище** | ✅ 70.9МБ, можно установить Entware                     |

## Установка со стоковой прошивки

::: danger ВНИМАНИЕ
Крайне не рекомендуется использовать загрузчик OpenWRT.
:::

1. Установить OpenWRT.
2. В разделе `System - Backup / Flash firmware` сделать бэкапы всех разделов
3. Из под веб-интерфейса OpenWRT (или веб-интерфейса загрузчика) загрузить `Keenetic-Cudy_WBR3000UAX.bin` как
   обновление c галочкой `Force Upgrade`.
   ::: tip Внимание
   Файл пропатчит EEPROM, сгенерирует новые сервисные цифры и установит прошивку.
   :::
4. После перезагрузки устройство в течение 3-х минут запустится в KeeneticOS
	::: tip URL: 192.168.1.1 `admin:12345678`<br/>SSID: Keenetic<br/>Password: 12345678
	:::

## USB-Mod

::: info
Mod нужен для перезагрузки USB-модема по
питанию, [подробнее](https://help.keenetic.com/hc/ru/articles/115000041605-%D0%9C%D0%BE%D0%B6%D0%BD%D0%BE-%D0%BB%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%B8%D1%82%D1%8C-%D0%BF%D0%BE-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8E-USB-%D0%BC%D0%BE%D0%B4%D0%B5%D0%BC-%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BA-Keenetic-%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2%D0%B0%D0%BC%D0%B8-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0)
:::
Для Cudy WBR3000UAX есть два варианта USB-мода

### Простой
Удалить отмеченный резистор R302

![альтернативный текст](/assets/images/wiki/helpful/usb-mod/wbr3000uax-1.jpg){width=300px height=100px}
### Сложный
Заменить отмеченный резистор R305 новым с номиналом 3.3 кОм 

![альтернативный текст](/assets/images/wiki/helpful/usb-mod/wbr3000uax-2.jpg){width=300px height=100px}

### Поднятие тока на порту до 2А

Для этого меняем отмеченный резистор R304 на новый с номиналом 2.7 кОм

![альтернативный текст](/assets/images/wiki/helpful/usb-mod/wbr3000uax-3.jpg){width=300px height=100px}