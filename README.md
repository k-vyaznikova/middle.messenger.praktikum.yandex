### **О проекте**
Messenger - учебный проект Яндекс.Практикума


### **Ссылка на проект**
[Ссылка на проект в netlify](https://strong-faloodeh-9b85a6.netlify.app/)


### **Работа с проектом**
```npm run dev``` - запуск проекта в режиме разработки

```npm run start``` - сборка и запуск проекта

```npm run eslint``` - проерка ts-файлов при помощи eslint

```npm run eslint-fix``` - проверка ts-файлов при помощи eslint и возможное исправление ошибок

```npm run stylelint``` - проверка стилей при помощи stylelint

```npm run stylelint-fix``` - проверка стилей при помощи stylelint и возможное исправление ошибок


### **Дизайн проекта**
[Дизайн в Figma](https://www.figma.com/file/ALQ7CC5h4Zg3Ciow2FfPew/Untitled?type=design&node-id=0%3A1&mode=design&t=Zwu1RzkfLrN4Prfm-1)


### **Структура проекта**
/src/components - компоненты

/src/layouts - лэйауты

/src/pages - шаблоны страниц

/src/utils - утилиты

/src/img - изображения

### **Взаимодейтсвие с бэкендом
Все страницы запрашивают информацию у бекэнда при помощи http-протокола.

Обмен сообщениями - через механизм web-сокетов.

### **Возможности сервиса:
- регистрация / авторизация с предварительной валидацией форм
- смена персональных данных
- создание / удаление / редактирование чата
- обмен текстовыми сообщениями

### **UNIT-тестирование:
- настроен pre-commit (перед коммитов необходимо тестироваие всех файлов)
- для тестирования использовались библиоекм mocha, chai, sinon
- файлы с тестами имеют постфикс .test.ts
- тестирование напсиано для классов:
- - Router [файл с тестами /src/utils/routing/router.test.ts], 
- - HTTPTransport [файл с тестами /src/utils/http_transport.test.ts],
- - Компонент Input [файл с тестами /src/components/input/script.test.ts]

