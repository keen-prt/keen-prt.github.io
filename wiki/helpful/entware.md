# Установка Entware <YezBadge type="keenetic" text="Mipsel" url="/assets/files/entware/Mipsel_Offline_2025.tar.gz" /> <YezBadge type="keenetic" text="Arch" url="/assets/files/entware/Arch_Offline_2025.tar.gz" />
[Официальная инструкция Keenetic](https://help.keenetic.com/hc/ru/articles/360021888880-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-OPKG-Entware-%D0%BD%D0%B0-%D0%B2%D1%81%D1%82%D1%80%D0%BE%D0%B5%D0%BD%D0%BD%D1%83%D1%8E-%D0%BF%D0%B0%D0%BC%D1%8F%D1%82%D1%8C-%D1%80%D0%BE%D1%83%D1%82%D0%B5%D1%80%D0%B0)
::: warning ВНИМАНИЕ
**Mipsel - устройства на MT7628/MT7621**

**Arch - устройства на MT7622/MT7981**
:::
## Установка
### Способ #1 <Badge type="keenetic" text="Автоматический, online" />
:::: tip
Начиная с KeeneticOS 4.2 появилась возможность установки в одну команду через CLI [`192.168.1.1/a`](http://192.168.1.1/a)
::::
![альтернативный текст](/assets/images/wiki/helpful/entware/rci.png)
1. Ввести команду для установки:

Для архитектуры `Mipsel`

```shell
opkg disk storage:/ https://bin.entware.net/mipselsf-k3.4/installer/mipsel-installer.tar.gz
````

Для архитектуры `Arch`

```shell
opkg disk storage:/ https://bin.entware.net/aarch64-k3.10/installer/aarch64-installer.tar.gz
````

2. Дождаться окончания установки в Журнале

![альтернативный текст](/assets/images/wiki/helpful/entware/done_install.png)

### Способ #2 <Badge type="keenetic" text="Ручной, offline" />
1. В разделе `Приложения` раскрыть `Встроенное хранилище`

   ![альтернативный текст](/assets/images/wiki/helpful/entware/1.png)

2. Создать папку с названием `install`

   ![альтернативный текст](/assets/images/wiki/helpful/entware/2.png)

3. Внутрь папки поместить нужный архив

   ![альтернативный текст](/assets/images/wiki/helpful/entware/3.png)

4. В разделе `OPKG` в накопителе выбрать `Встроенное хранилище` и сохранить

   ![альтернативный текст](/assets/images/wiki/helpful/entware/4.png)

5. На накопителе развернётся `Entware`

   ![альтернативный текст](/assets/images/wiki/helpful/entware/5.png)

## SSH

**Логин**: `root`

**Пароль**: `keenetic`

**Порт**: `222`

**Смена пароля** -

```shell
passwd
```

## Не пускает по SSH

1. Подключитесь по CLI (Например `192.168.1.1/a`)
2. Выполните команды

````shell
exec sh
````
```shell
exec /opt/etc/init.d/S51dropbear restart
````

## Telnet

**Логин**: `admin`

**Пароль**: `ваш пароль от веб-интерфейса`

**Порт**: `23`

**Вход в Entware** -

```shell
exec sh
```

![альтернативный текст](/assets/images/wiki/helpful/entware/7.png)

## Обновление
Репозиториев
```shell
opkg update
```
Пакетов
```shell
opkg upgrade
```

![альтернативный текст](/assets/images/wiki/helpful/entware/8.png)

## Форматирование накопителя

1. Открыть [`http://192.168.1.1/a`](http://192.168.1.1/a)
2. Закрыть все имеющиеся соединения если они активны `(Telnet/SSH)`
3. Ввести поочерёдно команды

```shell
opkg no disk
```
```shell
no system mount storage:
```
```shell
erase storage:
```
```shell
system mount storage:
```

![альтернативный текст](/assets/images/wiki/helpful/entware/6.png)