# Xiaomi Router AC1200 (R4Av2/RB02) <YezBadge type="keenetic" text="4.2.1" url="/assets/files/firmware/Xiaomi-4Av2.zip" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

::: danger ВНИМАНИЕ
**Прошивка подходит только для версии с креплением на стену**<br/>
[Автор порта](https://4pda.to/forum/index.php?showuser=2155384)
:::

![альтернативный текст](/public/assets/images/wiki/guides/Xiaomi/4AGv2.png){width=500px height=100px}

## Характеристики

| Особенность       | Описание                              |
|-------------------|---------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz      |
| **Flash MB**      | 16 SPI                                |
| **RAM MB**        | 128                                   |
| **Ethernet**      | 10/100/1000 Mbps x3 (1x WAN, 2x LAN)  |
| **USB**           | -                                     |
| **WLAN Hardware** | MediaTek MT7603EN, MediaTek MT7613BEN |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM       |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM         |

## Особенности сборки

| Особенность              | Описание                                 |
|--------------------------|------------------------------------------|
| **Работоспособность**    | ✅ Кроме Мобильного приложения, KeenDNS   |
| **Сброс настроек**       | ✅ Через кнопку Reset                     |
| **Светодиоды**           | ✅                                        |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами |
| **Встроенное хранилище** | ❌ Установка Entware невозможна           |

## Установка

1. Сбросить настройки роутера, пройти первоначальную настройку и установить пароль `12345678`
2. Запустите `!Start.exe`, выберите пункт `11`. Следуйте указаниям в окне.
   ![альтернативный текст](/public/assets/images/wiki/guides/Xiaomi/install_4agv2.png)
3. Выберите пункт `55`, создастся бэкап и установится система

   После перезагрузки устройство запустится в Keenetic
   ::: tip 192.168.1.1<br/>SSID: Keenetic_R4AV2<br/>Password: 12344321
   :::

## Скриншоты

![альтернативный текст](/public/assets/images/wiki/guides/Xiaomi/system1-4ag.jpg)

![альтернативный текст](/public/assets/images/wiki/guides/Xiaomi/system2-4ag.jpg)
