# KeenKit

Многофункциональный скрипт, упрощающий обслуживание роутера.
![альтернативный текст](/assets/images/wiki/helpful/keenkit/main.png){width=700px height=100px}

::: details Возможности скрипта
• **Обновить прошивку из файла** <br/>Находит файл `.bin` на встроенном или внешнем накопителе и устанавливает его в разделы Firmware.

<br/>• **Резервная копия разделов** <br/>Сохраняет выбранные разделы на указанный накопитель.

<br/>• **Резервная копия Entware** <br/>Создаёт полную резервную копию накопителя, с которого запущен скрипт. Её можно использовать при [новой установке](/wiki/helpful/entware.md).

<br/>• **Заменить раздел** <br/>Заменяет раздел системы выбранным пользователем файлом.

<br/>• **OTA Update** <br/>Онлайн-обновление или понижение версии прошивки.

<br/>• **Обновить сервисные данные** <br/>Создаёт новый U-Config с обновлёнными сервисными данными и заменяет текущий.

<br/>• **KeenBOOT OTA Update** <br/>Онлайн-обновление или понижение версии загрузчика.
:::

## Установка

1. Установите [Entware](/wiki/helpful/entware.md).
2. Подключитесь к роутеру по [SSH](/wiki/helpful/entware.md#ssh).
3. Выполните команду:

```shell
opkg update && opkg install curl && curl -L -s "https://raw.githubusercontent.com/spatiumstas/KeenKit/main/install.sh" > /tmp/install.sh && sh /tmp/install.sh
```
> Альтернативный источник:
```shell
opkg update && opkg install curl && curl -L -s "https://osvault.keeneticported.dev/scripts/install.sh" > /tmp/install.sh && sh /tmp/install.sh
```
## Запуск скрипта

Выполните команду `keenkit` или `/opt/keenkit.sh`.
