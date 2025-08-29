# KeenBOOT

#### Фирменный загрузчик для KeeneticOS на базе процессора MediaTek 7621

![альтернативный текст](/assets/images/wiki/helpful/keenboot/main.png)

## Скачать

::: danger
**Устанавливайте загрузчик только для своей модели!**
:::

| Модель             | Цвет диода                                                                   | [Список изменений](https://t.me/KeeneticPorted/7905)                      |
|--------------------|------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **SmartBox Giga**  | Системный - 🟢<br/>В загрузчике - 🔵 (мигает) <br/>Обновление - 🔴           | [Скачать](/assets/files/keenboot/v1.3.3/KeenBOOT-SB_Giga_v1.3.3.bin)    |
| **SmartBox Flash** | Системный - 🟢<br/>В загрузчике - 🔵 (мигает) <br/>Обновление - 🔴           | [Скачать](/assets/files/keenboot/v1.3.3/KeenBOOT-SB_Flash_v1.3.3.bin)     |
| **SmartBox Pro**   | Системный - 🔵<br/>В загрузчике - ⚪ (мигает) <br/>Обновление - 🔵            | [Скачать](/assets/files/keenboot/v1.3.3/KeenBOOT-SB_Pro_v1.3.3.bin)       |
| **MTS WG430223**   | Системный - 🟢<br/>В загрузчике - 🔴 (мигает) <br/>Обновление - 🔴           | [Скачать](/assets/files/keenboot/v1.3.3/KeenBOOT-MTS_WG430223_v1.3.3.bin) |
| **Netis N6**       | Системный - Power<br/>В загрузчике - Internet (мигает) <br/>Обновление - WPS | [Скачать](/assets/files/keenboot/v1.3.3/KeenBOOT-Netis_N6_v1.3.3.bin)     |
| **WiFire S1500**   | Системный - 🔵<br/>В загрузчике - ⚪ (мигает) <br/>Обновление - 🔵            | [Скачать](/assets/files/keenboot/v1.3.3/KeenBOOT-WiFire-S1500_v1.3.3.bin) |
| **Xiaomi R3G**     | Системный - 🔵<br/>В загрузчике - 🟠 (мигает) <br/>Обновление - 🔴           | [Скачать](/assets/files/keenboot/v1.3.3/KeenBOOT-Xiaomi_3G_v1.3.3.bin)    |
| **Xiaomi R3P**     | Системный - 🔵<br/>В загрузчике - 🟠 (мигает) <br/>Обновление - 🔴           | [Скачать](/assets/files/keenboot/v1.3.3/KeenBOOT-Xiaomi_3P_v1.3.3.bin)    |
| **Xiaomi 4**       | Системный - 🔵<br/>В загрузчике - 🟠 (мигает) <br/>Обновление - 🔴           | [Скачать](/assets/files/keenboot/v1.3.3/KeenBOOT-Xiaomi_4_v1.3.3.bin)     |

## Переход на загрузчик

Перейдите в раздел `Upgrade` загрузчика Breed, выберите файл в `Bootloader` и нажмите `Upload`
![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)

## Вход в загрузчик

Осуществляется при зажатии кнопки RESET во время включения. Дождаться цвета диода загрузчика из таблицы выше и отпустить кнопку. В настройках сетевой карты выставить IP-адрес `192.168.1.5`.
В браузере перейти по адресу `192.168.1.1`

![альтернативный текст](/assets/images/wiki/helpful/keenboot/network.png)

## Установка прошивки

::: warning **Внимание!**
**Не используйте браузер Firefox!**

**По возможности используйте `инкогнито`!**
:::

1. Выполнить форматирование флеш-накопителя, если переход с другой прошивки (стоковая, кастомная и тд) или необходима чистая установка

   ![альтернативный текст](/assets/images/wiki/helpful/keenboot/erase.png)
2. Поочерёдно загрузить `Firmware`, `EEPROM`, `U-Config` от своей модели в соответствующие разделы
3. Выполнить перезагрузку

## Функционал загрузчика

• Выбранный файл записывается в оба раздела.

• `Форматировать` стирает весь флеш-накопитель, кроме загрузчика. Рекомендуется использовать при чистой установке или переходе с других модифицированных прошивок.

• Если `U-State` не загружен, загрузчик создаст его автоматически.

## Обновление/Смена загрузчика

Перейдите в раздел `Bootloader`, выберите файл нужного вам загрузчика и нажмите `Обновить`
![альтернативный текст](/assets/images/wiki/helpful/keenboot/update.png)

## Архив версий

::: details SmartBox Giga
[v1.2](/assets/files/keenboot/v1.2/KeenBOOT-SB_Giga_v1.2.bin), [v1.3.2](/assets/files/keenboot/v1.3.2/KeenBOOT-SB_Giga_v1.3.2.bin)
:::
::: details SmartBox Flash
[v1.2](/assets/files/keenboot/v1.2/KeenBOOT-SB_Flash_v1.2.bin), [v1.3.2](/assets/files/keenboot/v1.3.2/KeenBOOT-SB_Flash_v1.3.2.bin)
:::
::: details MTS WG430223
[v1.2](/assets/files/keenboot/v1.2/KeenBOOT-MTS_WG430223_v1.2.bin), [v1.3.2](/assets/files/keenboot/v1.3.2/KeenBOOT-MTS_WG430223_v1.3.2.bin)
:::
::: details Netis N6
[v1.2](/assets/files/keenboot/v1.2/KeenBOOT-Netis_N6_v1.2.bin), [v1.3.2](/assets/files/keenboot/v1.3.2/KeenBOOT-Netis_N6_v1.3.2.bin)
:::
::: details Xiaomi R3G
[v1.2](/assets/files/keenboot/v1.2/KeenBOOT-Xiaomi_3G_v1.2.bin), [v1.3.2](/assets/files/keenboot/v1.3.2/KeenBOOT-Xiaomi_3G_v1.3.2.bin)
:::
::: details Xiaomi R3P
[v1.2](/assets/files/keenboot/v1.2/KeenBOOT-Xiaomi_3P_v1.2.bin), [v1.3.2](/assets/files/keenboot/v1.3.2/KeenBOOT-Xiaomi_3P_v1.3.2.bin)
:::
::: details Xiaomi 4
[v1.2](/assets/files/keenboot/v1.2/KeenBOOT-Xiaomi_4_v1.2.bin), [v1.3.2](/assets/files/keenboot/v1.3.2/KeenBOOT-Xiaomi_4_v1.3.2.bin)
:::
