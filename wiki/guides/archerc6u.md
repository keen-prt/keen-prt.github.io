# TP-Link Archer C6U v1 <YezBadge type="keenetic" text="4.2.2" url="/assets/files/firmware/TP-Link-C6U.7z" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![альтернативный текст](/assets/images/wiki/guides/TP-Link-C6U/main.png){width=550px height=100px}

## Характеристики

| Особенность       | Описание                            |
|-------------------|-------------------------------------|
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz    |
| **Flash MB**      | 16 SPI                              |
| **RAM MB**        | 128                                 |
| **Ethernet**      | 4x1G LAN port + 1x1G WAN port       |
| **USB**           | 1x 2.0                              |
| **WLAN Hardware** | MediaTek MT7603E, MediaTek MT7613BE |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM     |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM       |

## Особенности сборки

| Особенность              | Описание                                                        |
|--------------------------|-----------------------------------------------------------------|
| **Работоспособность**    | ✅ Кроме: <br/> • Облачных сервисов                              |
| **Сброс настроек**       | ✅ Через кнопку Reset                                            |
| **Светодиоды**           | ✅                                                               |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами                        |
| **Кнопка WPS**           | Настроена как FN1, можно задать любое действие в рамках системы |
| **Перезагрузка модема**  | ✅ Не требует доработок                                          |
| **Встроенное хранилище** | ❌ Установка Entware возможна только на USB                      |

## Обновление прошивки

Для обновления воспользуйтесь способом для [SPI памяти](/wiki/helpful/updateFirmware#%D0%B4%D0%BB%D1%8F-spi-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D0%B4%D0%BE-32mb)

## Установка со стоковой прошивки

1. Установить OpenWRT из папки `Breed -> Data -> openwrt-23.05.4-tplink_archer-c6u-v1-squashfs-factory.bin`
2. Запустить `BreedEnter.exe` от имени администратора по пути `Keenetic/BreedEnter` (при получении ошибки установить WinPcap.exe). В китайском интерфейсе нажать всего одну кнопку. Это необходимо для последующего входа в загрузчик
   ![альтернативный текст](/assets/images/wiki/helpful/faq/breed.png)<br/>
3. Запустить скрипт `!Start.bat` из папки `Breed`. Скрипт установит загрузчик Breed, сделает бэкап стокового загрузчика и EEPROM в папку Data, создаст полный образ прошивки содержащий ваш EEPROM и индивидуальные сервисные данные и поместит в папку Keenetic
4. Заходим в загрузчик Breed по адресу 192.168.1.1 и обязательно делаем Full бэкап. В последующем его можно использовать для отката на OpenWRT, процесс отката такой же как установка шагом ниже. `BreedEnter на этом этапе закрываем`
   ![альтернативный текст](/assets/images/wiki/guides/NetisN6/breed1.jpg){width=600px height=100px}
5. Во втором пункте второй вкладки выбираем полученный файл `Keenetic-C6U-XXX.bin` из скрипта, сняв последние 2 галочки и подтвердить загрузку
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/install.png){width=600px height=100px}

   После перезагрузки устройство запустится в KeeneticOS
   ::: tip URL: 192.168.1.1<br/>SSID: Keenetic<br/>Password: 12345678
   :::

## Скриншоты системы

![альтернативный текст](/assets/images/wiki/guides/TP-Link-C6U/system1.png)

![альтернативный текст](/assets/images/wiki/guides/TP-Link-C6U/system2.png)

![альтернативный текст](/assets/images/wiki/guides/TP-Link-C6U/system3.png)

![альтернативный текст](/assets/images/wiki/guides/TP-Link-C6U/system4.png)

## Установленные компоненты

![альтернативный текст](/assets/images/wiki/guides/TP-Link-C6U/components1.png)

![альтернативный текст](/assets/images/wiki/guides/TP-Link-C6U/components2.png)

## Откат на OpenWRT

• Зайти в Breed, выполнить загрузку `full.bin` снятого в 4 шаге по картинке из 5 шага.
![альтернативный текст](/assets/images/wiki/guides/Mercusys/install.png){width=600px height=100px}<br/>
• Для возврата стокового загрузчика используйте Breed -> Upgrade -> Generic -> Bootloader указав загрузчик, бэкап которого сделал скрипт
