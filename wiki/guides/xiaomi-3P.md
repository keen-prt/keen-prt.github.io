# Xiaomi Router 3P <BoostyBadge type="keenetic" text="5.1"/> <OTABadge type="keenetic" text="5.0.12 (OTA)"/> <YezBadge type="keenetic" text="5.0.12" url="/assets/files/firmware/Xiaomi-R3P.7z"/>

::: warning **Статус устройства: EoD**
**End of Development** — обновление системы возможно только при наличии свободного времени и желания
:::

![Xiaomi Router 3P](/assets/images/wiki/guides/Xiaomi/3P.png){width=500px height=100px}

## Характеристики

| Особенность     | Описание                           |
| --------------- | ---------------------------------- |
| **CPU**         | MediaTek MT7621AT, MIPS, 880 MHz   |
| **Flash MB**    | 256NAND                            |
| **RAM MB**      | 512/DDR3                           |
| **Ethernet**    | 3x1G LAN port + 1x1G WAN port      |
| **USB**         | 1x 3.0                             |
| **WLAN 5.0GHz** | Mediatek 7615N 4×4:4, a/n/ac 5GHz  |
| **WLAN 2.4GHz** | Mediatek 7615N 4×4:4, b/g/n 2.4GHz |

## Особенности сборки

| Особенность              | Описание                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------ |
| **Работоспособность**    | ✅ Кроме: <br/> • Облачных сервисов <br/> • [Компоненты](/wiki/helpful/components.md) |
| **Сброс настроек**       | ✅ Через кнопку Reset                                                                 |
| **Светодиод**            | 🔵 - Системный / Нет интернета <br/>⚪ - Есть интернет                                 |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами                                             |
| **Встроенное хранилище** | ✅ 167МБ, можно установить Entware                                                    |
| **Перезагрузка модема**  | ✅ Не требует доработок                                                               |

## Обновление прошивки

Для обновления воспользуйтесь любым способом для [NAND-памяти](/wiki/helpful/updateFirmware.md#для-nand-памяти-от-128mb).

::: danger ВНИМАНИЕ!
• Если сейчас установлен KeeneticOS **не нашей** модификации — выполните установку начисто, начиная с **шага 4** в блоке [Подготовка со стоковой прошивки](/wiki/guides/xiaomi-3P#подготовка-со-стоковои-прошивки).

• Восстановление из предыдущего файла конфигурации (`startup-config`) не рекомендуется!
:::

## Подготовка со стоковой прошивки

> ⚠️ **Перед началом:** сбросьте настройки роутера, пройдите первоначальную настройку и установите пароль `12345678`.

1. **Запуск скрипта.** В архиве запустите `!Start.bat` в папке `Установка Breed`.
2. **Выбор пунктов.** Поочерёдно выберите пункты `1 → 2 → 3 → 4`.

   ![Меню установщика Breed](/assets/images/wiki/guides/Xiaomi/install.png)

3. **Бэкап и переход в Breed.** Скрипт сделает бэкап `factory` (он же EEPROM) в папку `installer/data` и перезагрузится в загрузчик Breed.
4. **Вход в Breed.** Перейдите в загрузчик Breed ([как?](/wiki/helpful/breedBootloader.md#как-заити-в-загрузчик-breed)) по адресу `192.168.1.1`.
5. **Резервная копия.** Сделайте `Full`-бэкап на случай отката прошивки.

   ::: warning
   Не сохраняйте EEPROM из Breed на NAND — из-за динамической разметки внутри не будет настоящих калибровок.
   :::

   ![Резервная копия Full в Breed](/assets/images/wiki/guides/NetisN6/breed1.jpg)

6. **Конвертация EEPROM.** EEPROM, полученный из скрипта (если установка была со стоковой прошивки) или снятый из Breed (если Keenetic был установлен ранее), сконвертируйте для Keenetic через [онлайн-сервис](https://yeezyio.github.io/), выбрав `Вырезанный EEPROM` и указав ваш MAC с этикетки. Полученный файл поместите в папку с прошивкой.

### Способ #1 <Badge type="keenetic" text="Новый, рекомендуемый" />

::: danger
Если сейчас установлен KeeneticOS не нашей модификации, перед сменой загрузчика выполните команду через TelNet в Breed:
```shell
flash erase 0x80000 0xff80000
```
:::

1. Смените загрузчик на [KeenBOOT](/wiki/helpful/keenboot.md).
2. Загрузите `Firmware`, `EEPROM`, `U-Config` из архива по очереди через веб-интерфейс по [инструкции](/wiki/helpful/keenboot#установка-прошивки).
3. Перезагрузитесь в систему.

::: tip Готово! Доступ к роутеру
URL: `192.168.1.1` (`admin` / `12345678`)<br/>SSID: `Keenetic`<br/>Пароль Wi-Fi: `12345678`
:::

### Способ #2 <Badge type="keenetic" text="Старый" />

1. **Раздача файлов.** В папке с прошивкой перетащите все `bin`-файлы (`U-Config`, `U-State`, `EEPROM`, `firmware_Xiaomi-R3P_xxx`) на `!HFS.exe`.

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
   <br/>• Сравните IP в командах `wget` ниже с IP, указанным в **HFS**. В загрузчике **Breed** он всегда начинается на **192.168.1.xxx**.
   :::

```shell
flash erase 0x80000 0xff80000

wget http://192.168.1.2/u-config.bin
flash write 0x80000 0x80001000 0x80000
flash write 0x8040000 0x80001000 0x80000

wget http://192.168.1.2/eeprom.bin
flash write 0x100000 0x80001000 0x80000
flash write 0x80c0000 0x80001000 0x80000

wget http://192.168.1.2/firmware.bin
flash write 0x180000 0x80001000 0x1AB3F00
flash write 0x8140000 0x80001000 0x1AB3F00

wget http://192.168.1.2/u-state.bin
flash write 0x7fc0000 0x80001000 0x80000

env set autoboot.command "boot flash 0x8140000"
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

## Скриншоты

![Система KeeneticOS на Xiaomi Router 3P](/assets/images/wiki/guides/Xiaomi/3P-1.png){width=600px height=100px}

![Система KeeneticOS на Xiaomi Router 3P](/assets/images/wiki/guides/Xiaomi/3P-2.png){width=600px height=100px}
