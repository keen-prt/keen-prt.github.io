# TP-Link Archer C6U v1 <YezBadge type="keenetic" text="4.2.2" url="/assets/files/firmware/TP-Link-C6U.7z" />

::: warning **Статус устройства: EoL**
**End of Life** — прекращение портирования операционной системы для этой модели, последняя релизная версия
:::

![TP-Link Archer C6U v1](/assets/images/wiki/guides/TP-Link-C6U/main.png){width=550px height=100px}

## Характеристики

| Особенность       | Описание                            |
| ----------------- | ----------------------------------- |
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
| ------------------------ | --------------------------------------------------------------- |
| **Работоспособность**    | ✅ Кроме: <br/> ❌ Облачных сервисов                              |
| **Сброс настроек**       | ✅ Через кнопку Reset                                            |
| **Светодиоды**           | ✅                                                               |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами                        |
| **Кнопка WPS**           | Настроена как FN1, можно задать любое действие в рамках системы |
| **Перезагрузка модема**  | ✅ Не требует доработок                                          |
| **Встроенное хранилище** | ❌ Установка Entware возможна только на USB                      |

## Обновление прошивки

Для обновления воспользуйтесь способом для [SPI-памяти](/wiki/helpful/updateFirmware#%D0%B4%D0%BB%D1%8F-spi-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D0%B8-%D0%B4%D0%BE-32mb).

## Установка со стоковой прошивки

1. **Установка OpenWRT.** Установите OpenWRT из папки `Breed -> Data -> openwrt-23.05.4-tplink_archer-c6u-v1-squashfs-factory.bin`.
2. **Подготовка ко входу в загрузчик.** Запустите `BreedEnter.exe` от имени администратора по пути `Keenetic/BreedEnter` (при ошибке установите `WinPcap.exe`). В китайском интерфейсе нажмите единственную кнопку — это необходимо для последующего входа в загрузчик.

   ![Вход в загрузчик через BreedEnter](/assets/images/wiki/helpful/faq/breed.png)

3. **Запуск скрипта.** Запустите `!Start.bat` из папки `Breed`. Скрипт установит загрузчик Breed, сделает бэкап стокового загрузчика и EEPROM в папку `Data`, создаст полный образ прошивки с вашим EEPROM и индивидуальными сервисными данными и поместит его в папку `Keenetic`.
4. **Резервная копия.** Зайдите в загрузчик Breed по адресу `192.168.1.1` и обязательно сделайте `Full`-бэкап. В дальнейшем его можно использовать для отката на OpenWRT — процесс такой же, как установка в следующем шаге. `BreedEnter` на этом этапе закройте.

   ![Резервная копия Full в Breed](/assets/images/wiki/guides/NetisN6/breed1.jpg){width=600px height=100px}

5. **Прошивка.** Во втором пункте второй вкладки выберите полученный скриптом файл `Keenetic-C6U-XXX.bin`, снимите последние 2 галочки и подтвердите загрузку.

   ![Загрузка прошивки в Breed](/assets/images/wiki/guides/Mercusys/install.png){width=600px height=100px}

После перезагрузки устройство запустится в KeeneticOS.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1`<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

## Скриншоты системы

![Система KeeneticOS на Archer C6U](/assets/images/wiki/guides/TP-Link-C6U/system1.png)

![Система KeeneticOS на Archer C6U](/assets/images/wiki/guides/TP-Link-C6U/system2.png)

![Система KeeneticOS на Archer C6U](/assets/images/wiki/guides/TP-Link-C6U/system3.png)

![Система KeeneticOS на Archer C6U](/assets/images/wiki/guides/TP-Link-C6U/system4.png)

## Установленные компоненты

![Установленные компоненты, часть 1](/assets/images/wiki/guides/TP-Link-C6U/components1.png)

![Установленные компоненты, часть 2](/assets/images/wiki/guides/TP-Link-C6U/components2.png)

## Откат на OpenWRT

- Зайдите в Breed и выполните загрузку `full.bin`, снятого в шаге 4, по картинке из шага 5.

  ![Откат прошивки через Breed](/assets/images/wiki/guides/Mercusys/install.png){width=600px height=100px}

- Для возврата стокового загрузчика используйте `Breed -> Upgrade -> Generic -> Bootloader`, указав загрузчик, бэкап которого сделал скрипт.
