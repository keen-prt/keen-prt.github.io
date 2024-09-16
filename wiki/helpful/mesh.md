# Настройка Mesh системы

<br/>

## Захват

<br/>

1. В меню `"Параметры системы" (Общие настройки)` нажмите `"Изменить режим работы"` и установите режим дополнительного интернет-центра `"Усилитель/Ретранслятор"`.
   ![альтернативный текст](/assets/images/wiki/helpful/mesh/repeater01.png){width=500px height=100px}

   ![альтернативный текст](/assets/images/wiki/helpful/mesh/repeater03.png){width=500px height=100px}
2. Подключите роутер проводом к контроллеру
3. Выполните захват  
   ![альтернативный текст](/assets/images/wiki/helpful/mesh/mesh05.png){width=800px height=100px}
   ::: tip При успешном захвате роутер отобразится в списке, в названии будет его серийный номер, напр. `Keenetic Giga 123***456`
   :::
   ![альтернативный текст](/assets/images/wiki/helpful/mesh/mesh06.png){width=800px height=100px}

## Решение проблем

• Не захватывается

Убедитесь что у захватываемых устройств разный серийный номер, он отображается на главной странице в блоке `О системе`
![альтернативный текст](/assets/images/wiki/helpful/mesh/servicenumber.png){width=800px height=100px}

Если он одинаковый, используйте [**`ServiceDataGenerator`**](/assets/files/ServiceDataGenerator.zip) или [KeenKit](/wiki/helpful/keenkit.md) с использованием функционала `Заменить сервисные данные`
::: tip

1. Положите в корень папки со скриптом `U-Config` из архива прошивки которую прошиваете
2. Наведите `U-Config.bin` на `generate.bat`
3. Получим новый файл, его шьем или заменяем через [KeenKit](/wiki/helpful/keenkit.md)

На SPI памяти можно загрузить в скрипт весь FULL снятый из Breed и восстановиться
:::
<br/>

• Если после успешного захвата по проводу не подключается по воздуху, включите `Беспроводную транспортную сеть`
   <br/>

   ![альтернативный текст](/assets/images/wiki/helpful/mesh/wireless.png){width=800px height=100px}
   <br/>

• Ошибка `Mws::Controller::Candidate: "xx:xx:xx:xx:xx:xx": invalid CSR response` появляется после захвата устройства с одинаковым сервисным номером и/или мак-адресом устройства. Для решения воспользуйтесь 1 пунктом


