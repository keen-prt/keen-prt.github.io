# Откат прошивки

## Для NAND Flash памяти

### Способ #1
1. Установить [KeenBOOT](/wiki/helpful/keenboot) версии 1.4 и выше
2. В загрузчике перейти во вкладку `Full`

![альтернативный текст](/assets/images/wiki/helpful/keenboot/full.jpg)

3. Загрузить бэкап устройства
::: tip 
Если после восстановления роутер загрузился в Breed - выполните установку родного загрузчика от вашей модели (см. п7)
:::

### Способ #2 <Badge type="keenetic" text="При отсутствии Bad-блоков" />
1. Открыть свой бэкап в [HxD](https://mh-nexus.de/en/hxd/)
2. Выделить первый кусок в котором содержится загрузчик Breed и стереть

![альтернативный текст](/assets/images/wiki/guides/NetisN6/revert.png)

![альтернативный текст](/assets/images/wiki/guides/NetisN6/revert-2.png)

3. Сохранить полученный файл. Его вес будет составлять **127 МБ (133 693 440 байт)**
4. Перейти в загрузчик Breed ([`как?`](/wiki/helpful/breedBootloader#как-заити-в-загрузчик-breed)) по адресу 192.168.1.1
5. Добавить бэкап в HFS
6. В Putty ввести команды на стирание и запись бэкапа

````shell
wget http://192.168.1.2/full.bin
````
````shell
flash erase 0x80000 0x7f00000
````
````shell
flash write 0x80000 0x80001000 0x7f80000
````

7. Перейти в раздел `Upgrade`, выбрать файл вашего стокового загрузчика в `Bootloader` и нажать `Upload`
   ![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)


## Для SPI NOR памяти

1. Перейти в загрузчик Breed ([`как?`](/wiki/helpful/breedBootloader#как-заити-в-загрузчик-breed)) по адресу 192.168.1.1
2. Выполнить загрузку вашего бэкапа весом 16MB или 32MB в зависимости от объёма памяти
![альтернативный текст](/assets/images/wiki/guides/Mercusys/install.png){width=600px height=100px}<br/>
3. Перейти в раздел `Upgrade`, выбрать файл вашего стокового загрузчика в `Bootloader` и нажать `Upload`
   ![альтернативный текст](/assets/images/wiki/helpful/breed/upgrade.png)