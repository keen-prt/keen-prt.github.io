# Xiaomi Mi Router 4A Gigabit Edition v1 <Badge type="keenetic" text="4.1.7" />

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/4AG.png)

## Особенности сборки

| Особенность              | Описание                                 |
|--------------------------|------------------------------------------|
| **Работоспособность**    | ✅ кроме Мобильного приложения, KeenDNS   |
| **Сброс настроек**       | ✅ через кнопку Reset                     |
| **Светодиоды**           | ✅                                        |
| **Совместимость в Mesh** | ✅ С оригинальными устройствами и клонами |

## Установка

1. Сбросить настройки роутера, пройти первоначальную настройку и установить пароль (для дальнейшего удобства ставьте 12345678). Отключите всё лишнее от роутера и от ПК, WiFi на ПК тоже отключите.
2. Запустите !Start.bat и поочерёдно выбираете пункты от 1 до 4. В папке data будет бекап текущей прошивки и eeprom. Сохраните их в надёжном месте.
   ![альтернативный текст](/assets/images/wiki/guides/Xiaomi/install-4ag.png)
3. Полученный eeprom.bin модифицируем через [онлайн-сервис](https://yeezyio.github.io/) указав ваш мак-адрес с этикетки. На выходе получим патченный eeprom для работы в Keenetic
4. Если уже стоял Keenetic, снимите в Breed бэкап вашего EEPROM
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/backup.png)
5. Во втором пункте во второй вкладке выбираем прошивку сняв последние 2 галочки и подтвердить загрузку
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/install.png)
6. После установки снова заходим в Breed зажатием Reset и восстанавливаем EEPROM снятый в 1 пункте или полученный из онлайн-сервиса.
   ![альтернативный текст](/assets/images/wiki/guides/Mercusys/eeprom.png)


   После перезагрузки устройство запустится в Keenetic
   ::: tip 192.168.1.1<br/>SSID: Keenetic<br/>Password: 12345678
   :::

## Скриншоты

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/system1-4ag.jpg)

![альтернативный текст](/assets/images/wiki/guides/Xiaomi/system2-4ag.jpg)
