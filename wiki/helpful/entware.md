# Установка Entware

[Официальная инструкция Keenetic](https://help.keenetic.com/hc/ru/articles/360021888880-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-OPKG-Entware-%D0%BD%D0%B0-%D0%B2%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%BD%D1%83%D1%8E-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D1%8C-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80%D0%B0)

## Установка

1. В разделе `Приложения` раскрыть встроенный накопитель

   ![альтернативный текст](/assets/images/wiki/helpful/entware/1.png)

2. Создать папку с названием `install`

   ![альтернативный текст](/assets/images/wiki/helpful/entware/2.png)

   ::: warning ВНИМАНИЕ
   Вам нужно скачать файл, подходящий для архитектуры процессора вашего роутера.<br>
   Если у вас роутер с WIFI 5, или WIFI 6 до AX1800, [**`то используем Mipsel файл`**](/mipsel).<br>
   Если же ваш роутер WIFI 6 начиная с AX3000, [**`то используем Arch файл`**](/arch).
   :::

3. Внутрь папки поместить нужный архив

   ![альтернативный текст](/assets/images/wiki/helpful/entware/3.png)

4. В разделе `OPKG` в накопителе выбрать Встроенное хранилище и сохранить

   ![альтернативный текст](/assets/images/wiki/helpful/entware/4.png)

5. На накопителе развернётся `Entware`

   ![альтернативный текст](/assets/images/wiki/helpful/entware/5.png)

## Форматирование накопителя

1. Открыть [`http://192.168.1.1/a`](http://192.168.1.1/a)
2. Закрыть все имеющиеся соединения если они активны (Telnet/SSH)
3. Ввести поочерёдно команды

```shell
opkg no disk # отключит накопитель для Entware
```

```shell
no system mount storage: # размонтирует накопитель
```

```shell
erase storage: # стирает накопитель
```

```shell
system mount storage: # монтирует накопитель
```

![альтернативный текст](/assets/images/wiki/helpful/entware/6.png)

## SSH

**Логин** - `root`

**Пароль** - `keenetic`

**Порт** - `222`

**Смена пароля** - `passwd`

## Telnet

**Логин** - `root`

**Пароль** - `ваш пароль от веб-морды`

**Порт** - `23`

**Вход в Entware** -

```shell
exec sh
```

![альтернативный текст](/assets/images/wiki/helpful/entware/7.png)

## Обновление модулей

```shell
opkg update # обновление репозиториев
```

```shell
opkg upgrade # обновление пакетов
```

![альтернативный текст](/assets/images/wiki/helpful/entware/8.png)
