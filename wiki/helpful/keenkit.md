# KeenKit - обновление прошивок
![альтернативный текст](/assets/images/wiki/helpful/keenkit/1.jpg)
**Это многофункциональный скрипт,** позволяющий обновить прошивку из файла или `OTA`, забекапить разделы или `Entware`, заменить разделы, а также заменить сервисные данные

## Установка

1. Установить [**`Entware`**](/wiki/helpful/entware)
2. Через `Telnet/SSH` попасть в Entware
3. Прописать следущие команды:

```shell
exec sh
```

```shell
opkg update && opkg install curl && curl -L -s "https://raw.githubusercontent.com/spatiumstas/KeenKit/main/install.sh" > /tmp/install.sh && sh /tmp/install.sh
```

## Запуск
Запускать через ввод `keenkit, KeenKit или /opt/keenkit.sh`
