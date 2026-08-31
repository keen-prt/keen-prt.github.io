# CMCC XR30 <BoostyBadge type="keenetic" text="5.1.4"/> <OTABadge type="keenetic" text="5.1.3 (OTA)"/> <YezBadge type="keenetic" text="5.1.2" url="/assets/files/firmware/CMCC-XR30.7z"/>

::: tip **Статус устройства: Active**
**Active** — ведётся портирование новых версий
:::

![CMCC XR30](/assets/images/wiki/guides/xr30/main.png){width=500px}

## Характеристики

| Особенность       | Описание                            |
| ----------------- | ----------------------------------- |
| **CPU**           | MediaTek MT7981B, aarch64, 1300 MHz |
| **Flash MB**      | 128NAND                             |
| **RAM MB**        | 512/DDR4                            |
| **Ethernet**      | 3x1G LAN port + 1x1G WAN port       |
| **USB**           | 1x 3.0                              |
| **WLAN Hardware** | MediaTek MT7976CN                   |
| **WLAN 5.0GHz**   | AX, 160MHz, 2x2, 2402MB/s, 1024QAM  |
| **WLAN 2.4GHz**   | AX, 40MHz, 2x2, 574MB/s, 256QAM     |

## Установка с OpenWrt

1. **Загрузка образа.** В веб-интерфейсе OpenWrt загрузите `rax3000m-me-openwrt.itb` как обновление (sysupgrade).
2. **Прошивка.** После перезагрузки запустите `CMCC_XR30_flasher.exe`, нажмите «Установить» и дождитесь завершения.
3. **Загрузка системы.** Устройство запустится в KeeneticOS примерно через 3 минуты.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::
