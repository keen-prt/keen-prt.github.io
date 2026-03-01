# KeenBOOT

#### Фирменный загрузчик для KeeneticOS на базе MediaTek 7621/7981

![альтернативный текст](/assets/images/wiki/helpful/keenboot/main.png)

::: tip Преимущества
• Лучший обход бед-блоков

• Веб-интерфейс с загрузкой файлов

• Загрузка полного дампа устройства

• Поддержка DHCP без выставления статического IP адреса

• Остановка загрузки системы через BreedEnter

• Поддержка Dual-Image для `mipsel`

• Совместимость с KeeneticOS
:::

## Скачать

> ⚠️ Устанавливайте загрузчик только для своей модели!

::: details ARM
| Модель | [Список изменений](https://t.me/KeeneticPorted/7905)          |
|-------------------------|---------------------------------------------------------------|
| **Xiaomi AX3000T** | [Скачать](/assets/files/keenboot/ARM/KeenBOOT_AX3000T.bin) |
| **Netis NX31** | [Скачать](/assets/files/keenboot/ARM/KeenBOOT_NX31.bin) |
| **Netis NX32U** | [Скачать](/assets/files/keenboot/ARM/KeenBOOT_NX32U.bin) |
| **CMCC RAX3000M/ME** | [Скачать](/assets/files/keenboot/ARM/KeenBOOT_RAX3000M_ME.bin)|
| **Cudy WR3000P** | [Скачать](/assets/files/keenboot/ARM/KeenBOOT_WR3000P.bin ) |
| **Cudy WBR3000UAX** | [Скачать](/assets/files/keenboot/ARM/KeenBOOT_WBR3000UAX.bin ) |
:::

::: details Mipsel
| Модель | Цвет диода | [Список изменений](https://t.me/KeeneticPorted/7905)                       |
|---------------------------|------------------------------------------------------------------------------|----------------------------------------------------------------------------|
| **ASUS RT-AX53U**          | Системный - Power<br/>В загрузчике - Power (мигает) <br/>Обновление - USB | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-ASUS-RT-AX53U_1.7.1.bin)      |
| **MTS WG430223**          | Системный - 🟢<br/>В загрузчике - 🔴 (мигает) <br/>Обновление - 🔴 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-MTS-WG430223_1.7.1.bin)      |
| **Netis N6**              | Системный - Power<br/>В загрузчике - Internet (мигает) <br/>Обновление - WPS | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-Netis_N6_1.7.1.bin)          |
| **SmartBox Giga**         | Системный - 🟢<br/>В загрузчике - 🔵 (мигает) <br/>Обновление - 🔴 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-SmartBox_Giga_1.7.1.bin)           |
| **SmartBox Flash**        | Системный - 🟢<br/>В загрузчике - 🔵 (мигает) <br/>Обновление - 🔴 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-SmartBox_Flash_1.7.1.bin)          |
| **SmartBox Turbo (Plus)** | Системный - 🟢<br/>В загрузчике - 🔵 (мигает) <br/>Обновление - 🔴 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-SmartBox_Turbo_1.7.1.bin)          |
| **SmartBox Pro**          | Системный - 🔵<br/>В загрузчике - ⚪ (мигает) <br/>Обновление - 🔵 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-SmartBox_Pro_1.7.1.bin)            |
| **TP-Link EC330**         | Системный - 🔵<br/>В загрузчике - ⚪ (мигает) <br/>Обновление - 🔵 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-TP-Link_EC330_1.7.1.bin)     |
| **Vertell Street M2**     | Системный - Sys<br/>В загрузчике - Net (мигает) <br/>Обновление - Net | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-Vertell-Street-M2_1.7.1.bin) |
| **WiFire S1500**          | Системный - 🔵<br/>В загрузчике - ⚪ (мигает) <br/>Обновление - 🔵 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-WiFire-S1500_1.7.1.bin)      |
| **Xiaomi R3G**            | Системный - 🔵<br/>В загрузчике - 🟠 (мигает) <br/>Обновление - 🔴 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-Xiaomi_3G_1.7.1.bin)         |
| **Xiaomi R3P**            | Системный - 🔵<br/>В загрузчике - 🟠 (мигает) <br/>Обновление - 🔴 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-Xiaomi_3P_1.7.1.bin)         |
| **Xiaomi 4**              | Системный - 🔵<br/>В загрузчике - 🟠 (мигает) <br/>Обновление - 🔴 | [Скачать](/assets/files/keenboot/mipsel/1.7.1/KeenBOOT-Xiaomi_4_1.7.1.bin)          |
:::

## Вход в загрузчик

### Способ #1
> ⚠️ На старых версиях ARM загрузчика вход может быть через кнопку Mesh/WPS, и выставленную статику
- Зажать Reset и подать питание на роутер. Спустя 5-8 секунд зайти на `192.168.1.1` с устройства, подключённого в LAN порт роутера

### Способ #2

- Использовать [BreedEnter](/wiki/helpful/breedBootloader#breedenter)

## Переход с загрузчика Breed <Badge type="keenetic" text="MT7621"/>

Перейдите в раздел `Upgrade`, выберите файл в `Bootloader` и нажмите `Upload`
![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)

## Установка прошивки <Badge type="keenetic" text="MT7621" />

> **Используйте режим инкогнито в браузере.**

1. Выполнить форматирование флеш-накопителя, если переход с другой прошивки (стоковая, кастомная и тд) или необходима чистая установка

   ![альтернативный текст](/assets/images/wiki/helpful/keenboot/erase.png)
2. Поочерёдно загрузить `Firmware`, `EEPROM`, `U-Config` от своей модели в соответствующие разделы
3. Выполнить перезагрузку

## Обновление/Смена загрузчика

Перейдите в раздел `Bootloader`/`U-Boot`, выберите файл нужного вам загрузчика и нажмите `Обновить`
![альтернативный текст](/assets/images/wiki/helpful/keenboot/update.png)