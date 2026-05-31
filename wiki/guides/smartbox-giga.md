# SmartBox Giga <BoostyBadge type="keenetic" text="5.1"/> <OTABadge type="keenetic" text="5.0.11 (OTA)"/> <YezBadge type="keenetic" text="5.0.7" url="/assets/files/firmware/SmartBox-Giga.7z"/>

::: tip **Статус устройства: Active**
**Active** — ведётся портирование новых версий
:::

![SmartBox Giga](/assets/images/wiki/guides/SmartBox/giga.png){width=500px height=100px}

## Характеристики

| Особенность       | Описание                            |
| ----------------- | ----------------------------------- |
| **CPU**           | MediaTek MT7621AT, MIPS, 880 MHz    |
| **Flash MB**      | 128NAND                             |
| **RAM MB**        | 256/DDR3                            |
| **Ethernet**      | 10/100 Mbps x1, 10/100/1000 Mbps x2 |
| **USB**           | 1x 3.0                              |
| **WLAN Hardware** | MediaTek MT7603, MediaTek MT7613    |
| **WLAN 5.0GHz**   | AC, 80MHz, 2x2, 867MB/s, 256QAM     |
| **WLAN 2.4GHz**   | N, 40MHz, 2x2, 300MB/s, 64QAM       |

## Особенности сборки

| Особенность                         | Описание                                                                             |
| ----------------------------------- | ------------------------------------------------------------------------------------ |
| **Работоспособность**               | ✅ Кроме: <br/> • Облачных сервисов <br/> • [Компоненты](/wiki/helpful/components.md) |
| **Сброс настроек**                  | ✅ Через кнопку Reset                                                                 |
| **Светодиод**                       | 🟢 - Системный <br/>🔵 - Есть интернет                                                 |
| **Совместимость в Mesh**            | ✅ С оригинальными устройствами и клонами                                             |
| **Встроенное хранилище**            | ✅ 55.2МБ, можно установить Entware                                                   |
| **[Перезагрузка модема](#usb-mod)** | ✅ Требует доработок                                                                  |

## Обновление прошивки

Для обновления воспользуйтесь любым способом для [NAND-памяти](/wiki/helpful/updateFirmware#для-nand-памяти-от-128mb).

## Установка со стоковой прошивки

Сначала установите загрузчик Breed и подготовьте EEPROM (шаги ниже), затем выберите один из двух способов прошивки — **Способ #1** (через KeenBOOT, рекомендуется) или **Способ #2** (через Breed и TelNet).

### Установка загрузчика Breed и подготовка EEPROM

1. **Установка Breed.** Из стоковой прошивки загрузите файл `BreedInstaller_from_stock.img` как обновление.
2. **Вход в Breed.** После перезагрузки загрузчик Breed будет доступен по адресу `192.168.1.1`.
3. **Резервная копия.** В веб-интерфейсе Breed сохраните `Backup` → `Full dump` размером 128МБ.

   ![Резервная копия Full dump в Breed](/assets/images/wiki/guides/NetisN6/breed1.jpg)

4. **Вырезание EEPROM.** [В онлайн-сервисе](https://yeezyio.github.io/EepromCutter.html) загрузите ваш `Full.bin` из предыдущего шага — на выходе получите вырезанный EEPROM.
5. **Конвертация EEPROM.** Сконвертируйте полученный EEPROM в валидный для Keenetic через [онлайн-сервис](https://yeezyio.github.io/EepromConverter.html), указав MAC с этикетки.
6. **Подготовка архива.** Скачайте архив, распакуйте и добавьте в папку полученный EEPROM из предыдущего шага.

### Способ #1 <Badge type="keenetic" text="Новый, рекомендуемый" />

1. Смените загрузчик на [KeenBOOT](/wiki/helpful/keenboot.md).
2. Загрузите `Firmware`, `EEPROM`, `U-Config` из архива по очереди через веб-интерфейс по [инструкции](/wiki/helpful/keenboot#установка-прошивки).
3. Перезагрузитесь в систему.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

### Способ #2 <Badge type="keenetic" text="Старый" />

1. **Раздача файлов.** В папке перетащите все `bin`-файлы на `HFS.exe`.

   ![Файлы прошивки в HFS](/assets/images/wiki/guides/TP-Link-EC330/openhfs.png)

   ::: tip
   Для минимизации проблем с установкой рекомендуется выставить на сетевой карте IP-адрес `192.168.1.2`.

   ![Статический IP на сетевой карте](/assets/images/wiki/helpful/breed/networkStatic.png)
   :::

2. **Прошивка через TelNet.** Запустите Putty, зайдите по TelNet (`192.168.1.1` port `23`) и вставляйте (ПКМ) команды по очереди, дожидаясь выполнения предыдущей.

   ::: warning
   • Предварительно отключите брандмауэр и антивирус вашей ОС.
   <br/>• Сообщения **skipped bad blocks** и **Flash erasure failed with -5** после ввода команд являются нормой.
   :::

   ::: danger ВНИМАНИЕ
   • Каждая строка — это **отдельная команда**. Если она не выполнилась, повторите снова.
   <br/>• Сравните IP в командах `wget` ниже с IP, указанным в HFS. В загрузчике Breed он всегда начинается на `192.168.1.xxx`.
   :::

```shell
flash erase 0x80000 0x7f00000

wget http://192.168.1.2/u-config.bin
flash write 0x80000 0x80001000 0x80000
flash write 0x4040000 0x80001000 0x80000

wget http://192.168.1.2/eeprom.bin
flash write 0x100000 0x80001000 0x80000
flash write 0x40c0000 0x80001000 0x80000

wget http://192.168.1.2/firmware.bin
flash write 0x180000 0x80001000 0x1AB3F00
flash write 0x4140000 0x80001000 0x1AB3F00

wget http://192.168.1.2/u-state.bin
flash write 0x3fc0000 0x80001000 0x80000

env set autoboot.command "boot flash 0x4140000"
env save

reset
```

::: details Примерный вывод консоли
![Вывод консоли Breed](/assets/images/wiki/guides/TP-Link-EC330/breedlog.png)
:::

::: details Как убедиться, что всё прошилось корректно
В разделе `Settings` будут указаны сервисные данные устройства (их наличия достаточно, некоторые поля могут отличаться).
![Сервисные данные в Breed](/assets/images/wiki/guides/Xiaomi/breed-env.png)
В разделе `MAC address` будет ваш MAC-адрес с этикетки устройства или тот, который вы указывали в конвертере (разница может быть в ±1 символ в конце).
![MAC-адрес в Breed](/assets/images/wiki/guides/Xiaomi/breed-mac.png)
:::

После перезагрузки устройство запустится в KeeneticOS.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

## Перезагрузка USB-модема (USB-Mod) {#usb-mod}

::: info
Мод нужен для перезагрузки USB-модема по питанию — [подробнее](https://help.keenetic.com/hc/ru/articles/115000041605-%D0%9C%D0%BE%D0%B6%D0%BD%D0%BE-%D0%BB%D0%B8-%D0%BF%D0%B5%D1%80%D0%B5%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%B8%D1%82%D1%8C-%D0%BF%D0%BE-%D0%BF%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8E-USB-%D0%BC%D0%BE%D0%B4%D0%B5%D0%BC-%D0%BF%D0%BE%D0%B4%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D0%BA-Keenetic-%D1%81%D1%80%D0%B5%D0%B4%D1%81%D1%82%D0%B2%D0%B0%D0%BC%D0%B8-%D0%B8%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0)
:::

::: tip
Уберите резистор `R153`, от `U12` подпаяйте проводок до пятака `R43`.
:::

![USB-Mod SmartBox Giga, фото 1](/assets/images/wiki/helpful/usb-mod/giga-usb1.png){width=400px height=100px}

![USB-Mod SmartBox Giga, фото 2](/assets/images/wiki/helpful/usb-mod/giga.jpg){width=400px height=100px}

## Конденсатор против зависания Fibocom L860-GL

::: tip
Для решения проблемы зависания модема Fibocom L860-GL при высокой загрузке припаяйте конденсатор `C1840` в цепь питания USB 5 В. Место для него уже есть. Соблюдайте полярность! Номинал — 100–330 мкФ × 16 В.
:::

![Конденсатор C1840 на SmartBox Giga](/assets/images/wiki/helpful/usb-mod/giga-capacitor.jpeg){width=400px height=100px}
